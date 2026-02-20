import requests
from bs4 import BeautifulSoup
from datetime import datetime


def scrape_article(url: str):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")

        # title
        title = soup.title.string if soup.title else "No title"

        # paragraphs
        paragraphs = soup.find_all("p")
        content = " ".join([p.get_text() for p in paragraphs])

        # simple publish date attempt
        published_at = datetime.utcnow()

        return {
            "title": title.strip(),
            "content": content.strip(),
            "url": url,
            "published_at": published_at
        }

    except Exception as e:
        return {
            "error": str(e),
            "url": url
        }
