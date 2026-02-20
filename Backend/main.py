import os
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import google.generativeai as genai
from dotenv import load_dotenv

# ✅ ROUTER IMPORTS
from routes import articles
from routes.preferences import router as preferences_router

# =======================
# Load environment variables
# =======================
load_dotenv()

# =======================
# Gemini setup
# =======================
api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    print("Warning: GOOGLE_API_KEY not found in environment variables.")
    genai_configured = False
else:
    genai.configure(api_key=api_key)
    genai_configured = True

# =======================
# Database imports
# =======================
from database.db import engine, SessionLocal, get_db
from database import models

# =======================
# FastAPI app
# =======================
app = FastAPI(title="Backend API", version="0.1.0")

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
# CORS configuration
# =======================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =======================
# Basic Routes
# =======================
@app.get("/")
def root():
    return {"message": "Hello from AI Interviewer Backend!"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


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
# TEMP DB TEST ENDPOINT
# =======================
@app.post("/api/test-create-article")
def create_test_article(db: Session = Depends(get_db)):
    article = models.Article(
        title="Test Article",
        content="This is a test article content",
        source_url="https://example.com",
        category="Technology",
        summary="This is a test summary",
        sentiment="Positive"
    )

    db.add(article)
    db.commit()
    db.refresh(article)

    return {
        "success": True,
        "message": "Test article created",
        "article_id": article.id
    }


# =======================
# Scraper Pipeline Endpoint
# =======================
from pydantic import BaseModel
from services.scraper import scrape_article
from services.llm_processor import process_article


class URLRequest(BaseModel):
    urls: list[str]


@app.post("/api/articles/scrape")
def scrape_articles(request: URLRequest, db: Session = Depends(get_db)):

    results = []

    for url in request.urls:
        try:
            # ---------- Scrape ----------
            scraped = scrape_article(url)

            # ---------- AI Processing ----------
            ai_result = process_article(scraped["content"])

            # ---------- Save to DB ----------
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
