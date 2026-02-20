from fastapi import APIRouter, Depends, Header
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database.db import get_db
from database.models import UserPreference

router = APIRouter(prefix="/api/preferences", tags=["Preferences"])


# ===============================
# Request model (IMPORTANT FIX)
# ===============================
class PreferenceRequest(BaseModel):
    categories: list[str]


# ===============================
# Save or Update Preferences
# ===============================
@router.post("/")
def save_preferences(
    request: PreferenceRequest,
    user_id: str = Header(..., alias="user-id"),
    db: Session = Depends(get_db)
):
    pref = db.query(UserPreference).filter(
        UserPreference.user_id == user_id
    ).first()

    categories_str = ",".join(request.categories)

    if pref:
        pref.categories = categories_str
    else:
        pref = UserPreference(
            user_id=user_id,
            categories=categories_str
        )
        db.add(pref)

    db.commit()

    return {"message": "Preferences saved"}


# ===============================
# Get User Preferences
# ===============================
@router.get("/")
def get_preferences(
    user_id: str = Header(..., alias="user-id"),
    db: Session = Depends(get_db)
):
    pref = db.query(UserPreference).filter(
        UserPreference.user_id == user_id
    ).first()

    if not pref:
        return []

    return pref.categories.split(",")
