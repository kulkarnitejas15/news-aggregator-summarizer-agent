from services.scraper import scrape_article

url = url = "https://www.bbc.com/news/world"


data = scrape_article(url)

print("\nSCRAPED DATA:\n")
print(data)
