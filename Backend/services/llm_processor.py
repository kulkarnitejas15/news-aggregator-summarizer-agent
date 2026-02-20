import google.generativeai as genai
import os
from dotenv import load_dotenv
import re

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")

if api_key:
    genai.configure(api_key=api_key)


def process_article(content: str):
    """
    Uses Gemini LLM to analyze article content.
    Returns clean category, summary and sentiment.
    """

    try:
        model = genai.GenerativeModel("gemini-2.5-flash")

        prompt = f"""
        Analyze this news article and respond in EXACT format:

        Category: <Technology | Politics | Sports | Business | Entertainment | Health | Other>
        Summary: <3 sentence summary>
        Sentiment: <Positive | Negative | Neutral>

        Article:
        {content[:4000]}
        """

        response = model.generate_content(prompt)
        text = response.text

        # ----------------------------
        # Extract Category
        # ----------------------------
        category_match = re.search(
            r"Category:\s*(.*)", text, re.IGNORECASE
        )
        category = (
            category_match.group(1).strip()
            if category_match
            else "Other"
        )

        # ----------------------------
        # Extract Summary
        # ----------------------------
        summary_match = re.search(
            r"Summary:\s*(.*)", text, re.IGNORECASE | re.DOTALL
        )
        summary = (
            summary_match.group(1).strip()
            if summary_match
            else ""
        )

        # ----------------------------
        # Extract Sentiment
        # ----------------------------
        sentiment_match = re.search(
            r"Sentiment:\s*(.*)", text, re.IGNORECASE
        )
        sentiment = (
            sentiment_match.group(1).strip()
            if sentiment_match
            else "Neutral"
        )

        return {
            "category": category,
            "summary": summary,
            "sentiment": sentiment,
        }

    except Exception as e:
        return {"error": str(e)}
