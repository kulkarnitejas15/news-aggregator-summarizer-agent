from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .db import Base


# ===============================
# Article Model (existing)
# ===============================
class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    source_url = Column(String, nullable=False)
    category = Column(String, nullable=True)
    summary = Column(Text, nullable=True)
    sentiment = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


# ===============================
# Favorite Model (NEW)
# ===============================
class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)

    # Firebase user id (we store as string)
    user_id = Column(String, index=True, nullable=False)

    # reference to article
    article_id = Column(Integer, ForeignKey("articles.id"), nullable=False)

    # relationship to fetch article details
    article = relationship("Article")
# ===============================
# User Preferences Model (NEW)
# ===============================
class UserPreference(Base):
    __tablename__ = "user_preferences"

    id = Column(Integer, primary_key=True, index=True)

    # Firebase user id (string)
    user_id = Column(String, unique=True, nullable=False)

    # store selected categories (comma separated)
    categories = Column(Text, nullable=True)
