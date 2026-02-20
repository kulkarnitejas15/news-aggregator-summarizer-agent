from fastapi import APIRouter, Depends, HTTPException, Query, Header
from sqlalchemy.orm import Session
from database.models import Article, Favorite
from database.db import get_db

router = APIRouter(prefix="/api/articles", tags=["Articles"])


# ===============================
# Get all articles
# ===============================
@router.get("/")
def get_articles(db: Session = Depends(get_db)):
    articles = db.query(Article).order_by(Article.created_at.desc()).all()

    return [
        {
            "id": a.id,
            "title": a.title,
            "content": a.content,
            "source_url": a.source_url,
            "category": a.category,
            "summary": a.summary,
            "sentiment": a.sentiment,
            "created_at": a.created_at,
        }
        for a in articles
    ]


# ===============================
# 🔥 Trending Articles (NEW — ISSUE 15)
# ===============================
@router.get("/trending")
def get_trending_articles(
    limit: int = Query(5, ge=1, le=50),
    db: Session = Depends(get_db)
):
    """
    Returns most recent articles (Trending).
    Default limit = 5
    """

    articles = (
        db.query(Article)
        .order_by(Article.created_at.desc())
        .limit(limit)
        .all()
    )

    return [
        {
            "id": a.id,
            "title": a.title,
            "content": a.content,
            "source_url": a.source_url,
            "category": a.category,
            "summary": a.summary,
            "sentiment": a.sentiment,
            "created_at": a.created_at,
        }
        for a in articles
    ]


# ===============================
# Get all available categories
# ===============================
@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(Article.category).distinct().all()
    return [c[0] for c in categories if c[0]]


# ===============================
# Get user favorites
# (must come before /{article_id})
# ===============================
@router.get("/favorites")
def get_favorites(
    user_id: str = Header(..., alias="user-id"),
    db: Session = Depends(get_db)
):  
    print("USER ID RECEIVED:", user_id)

    favorites = db.query(Favorite).filter(
        Favorite.user_id == user_id
    ).all()

    return [
        {
            "id": fav.article.id,
            "title": fav.article.title,
            "content": fav.article.content,
            "source_url": fav.article.source_url,
            "category": fav.article.category,
            "summary": fav.article.summary,
            "sentiment": fav.article.sentiment,
            "created_at": fav.article.created_at,
        }
        for fav in favorites
    ]


# ===============================
# Search + Filter endpoint
# ===============================
@router.get("/search")
def search_articles(
    query: str | None = Query(None),
    category: str | None = Query(None),
    sentiment: str | None = Query(None),
    db: Session = Depends(get_db),
):
    articles_query = db.query(Article)

    if query:
        articles_query = articles_query.filter(
            (Article.title.ilike(f"%{query}%")) |
            (Article.content.ilike(f"%{query}%"))
        )

    if category:
        articles_query = articles_query.filter(
            Article.category.ilike(f"%{category}%")
        )

    if sentiment:
        articles_query = articles_query.filter(
            Article.sentiment.ilike(f"%{sentiment}%")
        )

    articles = articles_query.order_by(Article.created_at.desc()).all()

    return [
        {
            "id": a.id,
            "title": a.title,
            "content": a.content,
            "source_url": a.source_url,
            "category": a.category,
            "summary": a.summary,
            "sentiment": a.sentiment,
            "created_at": a.created_at,
        }
        for a in articles
    ]


# ===============================
# Add article to favorites
# ===============================
@router.post("/{article_id}/favorite")
def add_favorite(
    article_id: int,
    user_id: str = Header(..., alias="user-id"),
    db: Session = Depends(get_db)
):
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    existing = db.query(Favorite).filter(
        Favorite.user_id == user_id,
        Favorite.article_id == article_id
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Already in favorites")

    favorite = Favorite(user_id=user_id, article_id=article_id)
    db.add(favorite)
    db.commit()

    return {"message": "Added to favorites"}


# ===============================
# Remove article from favorites
# ===============================
@router.delete("/{article_id}/favorite")
def remove_favorite(
    article_id: int,
    user_id: str = Header(..., alias="user-id"),
    db: Session = Depends(get_db)
):
    favorite = db.query(Favorite).filter(
        Favorite.user_id == user_id,
        Favorite.article_id == article_id
    ).first()

    if not favorite:
        raise HTTPException(status_code=404, detail="Favorite not found")

    db.delete(favorite)
    db.commit()

    return {"message": "Removed from favorites"}


# ===============================
# Get single article by ID
# (ALWAYS LAST — dynamic route)
# ===============================
@router.get("/{article_id}")
def get_article(article_id: int, db: Session = Depends(get_db)):
    article = db.query(Article).filter(Article.id == article_id).first()

    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    return {
        "id": article.id,
        "title": article.title,
        "content": article.content,
        "source_url": article.source_url,
        "category": article.category,
        "summary": article.summary,
        "sentiment": article.sentiment,
        "created_at": article.created_at,
    }
