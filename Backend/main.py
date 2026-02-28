from fastapi.middleware.cors import CORSMiddleware
import os
import requests
from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
import google.generativeai as genai
from dotenv import load_dotenv
from pydantic import BaseModel

# ✅ ROUTER IMPORTS
from routes import articles
from routes.preferences import router as preferences_router

# =======================
# Load environment variables
# =======================
load_dotenv()

# =======================
# Gemini setup (Google API)
# =======================
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    print("Warning: GOOGLE_API_KEY not found in environment variables.")
    genai_configured = False
else:
    genai.configure(api_key=GOOGLE_API_KEY)
    genai_configured = True

# =======================
# News API setup
# =======================
NEWS_API_KEY = os.getenv("NEWS_API_KEY")

if not NEWS_API_KEY:
    print("Warning: NEWS_API_KEY not found in environment variables.")

# =======================
# Database imports
# =======================
from database.db import engine, get_db
from database import models

# =======================
# FastAPI app
# =======================
app = FastAPI(title="Backend API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =======================
# REGISTER ROUTERS
# =======================
app.include_router(articles.router)
app.include_router(preferences_router)

# =======================
# Create DB tables
# =======================
models.Base.metadata.create_all(bind=engine)

# =======================
# Basic Routes
# =======================
@app.get("/")
def root():
    return {"message": "Hello from AI Interviewer Backend!"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


# =======================
# Gemini Quote Endpoint
# =======================
@app.get("/api/random-quote")
def get_random_quote():
    if not genai_configured:
        raise HTTPException(
            status_code=500,
            detail="Google API key not configured"
        )

    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(
            "Tell me a random inspirational quote"
        )

        return {
            "success": True,
            "quote": response.text
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# =======================
# REAL NEWS SEARCH ENDPOINT
# =======================
@app.get("/api/search")
def search_news(q: str):

    if not NEWS_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="NEWS_API_KEY not configured"
        )

    try:
        url = f"https://newsapi.org/v2/everything?q={q}&language=en&apiKey={NEWS_API_KEY}"
        response = requests.get(url)
        data = response.json()

        articles = []

        for item in data.get("articles", []):
            articles.append({
                "id": item.get("url"),  # temporary id
                "title": item.get("title"),
                "summary": item.get("description"),
                "content": item.get("content"),
                "category": "General",
                "source_url": item.get("url"),
                "sentiment": "Neutral"
            })

        return articles

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# =======================
# ⭐ SAVE SEARCH ARTICLE TO DATABASE (NEW)
# =======================
class SaveArticleRequest(BaseModel):
    title: str
    content: str | None = None
    summary: str | None = None
    source_url: str
    category: str | None = "General"
    sentiment: str | None = "Neutral"


@app.post("/api/articles/save")
def save_search_article(
    request: SaveArticleRequest,
    db: Session = Depends(get_db)
):
    # Check duplicate using source_url
    existing = db.query(models.Article).filter(
        models.Article.source_url == request.source_url
    ).first()

    if existing:
        return {
            "article_id": existing.id,
            "message": "Article already exists"
        }

    article = models.Article(
        title=request.title,
        content=request.content or "",
        summary=request.summary or "",
        source_url=request.source_url,
        category=request.category,
        sentiment=request.sentiment,
    )

    db.add(article)
    db.commit()
    db.refresh(article)

    return {
        "article_id": article.id,
        "message": "Article saved successfully"
    }


# =======================
# Scraper Pipeline Endpoint
# =======================
from services.scraper import scrape_article
from services.llm_processor import process_article


class URLRequest(BaseModel):
    urls: list[str]


@app.post("/api/articles/scrape")
def scrape_articles(request: URLRequest, db: Session = Depends(get_db)):

    results = []

    for url in request.urls:
        try:
            scraped = scrape_article(url)
            ai_result = process_article(scraped["content"])

            article = models.Article(
                title=scraped["title"],
                content=scraped["content"],
                source_url=url,
                category=ai_result.get("category"),
                summary=ai_result.get("summary"),
                sentiment=ai_result.get("sentiment"),
            )

            db.add(article)
            db.commit()
            db.refresh(article)

            results.append({
                "url": url,
                "status": "success",
                "article_id": article.id
            })

        except Exception as e:
            results.append({
                "url": url,
                "status": "error",
                "message": str(e)
            })

    return {
        "success": True,
        "processed": len(results),
        "results": results
    }