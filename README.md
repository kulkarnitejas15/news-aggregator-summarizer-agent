# News Aggregator and Summarizer Agent

A full-stack web application that automatically scrapes news articles from multiple sources, categorizes them using AI, generates summaries, performs sentiment analysis, and provides users with a personalized news feed.

---

## Project Overview

### Description

This application solves the problem of information overload by:
- Aggregating news from multiple sources in one place
- Providing AI-generated summaries to save reading time
- Categorizing articles automatically for easy navigation
- Analyzing sentiment to understand news tone
- Personalizing content based on user preferences

### Target Users

- News readers who want to stay informed without spending hours reading
- Professionals who need quick news updates
- Students and researchers tracking specific topics
- Anyone interested in understanding news sentiment and trends

### Core Value Proposition

- **Time-saving**: AI-generated summaries let users understand news quickly
- **Comprehensive**: Multiple sources aggregated in one dashboard
- **Intelligent**: Automatic categorization and sentiment analysis
- **Personalized**: Customizable feed based on user preferences
- **Convenient**: Daily email digests with top stories

---

## Technology Stack

### Frontend
- React 19
- Vite (build tool)
- Tailwind CSS (styling)
- React Router DOM (routing)
- Axios or Fetch (API calls)
- Firebase SDK (authentication)

### Backend
- Python 3.12+
- FastAPI (REST API)
- Uvicorn (ASGI server)
- Pydantic (data validation)
- BeautifulSoup or LangChain web scraping tools

### Database
- SQLite (for application data only, NOT authentication)

### Authentication
- Firebase Authentication (email/password)

### AI/ML
- LangChain (basic chains for summarization, categorization, sentiment)
- Google Gemini LLM (for all AI tasks)

---

## Project Structure

```
news-aggregator-and-summarizer-agent/
├── Backend/                    # FastAPI backend application
│   ├── main.py                 # Main backend server file
│   ├── database/               # Database models and queries
│   ├── services/               # Business logic (scraper, LLM processor)
│   ├── routes/                 # API route handlers
│   ├── requirements.txt        # Python dependencies
│   └── .env                    # Environment variables
│
├── Frontend/                   # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service functions
│   │   ├── config/             # Firebase configuration
│   │   └── App.jsx             # Main app component
│   ├── package.json            # Node.js dependencies
│   └── .env                    # Environment variables
│
├── issues/                     # All project issues (19 issues)
│   ├── issue-01-project-setup.md
│   ├── issue-02-landing-page-ui.md
│   └── ... (all 19 issues)
│
├── project_details.md          # Complete project planning document
└── PROJECT-README.md           # This file
```

---

## Issue Flow and Progression

### Phase 1: Foundation (Issues 1-8)
**Goal:** Set up project structure and authentication

1. **Issue #01:** Project Setup - Initialize project with FastAPI and React
2. **Issue #02:** Landing Page UI - Create static landing page
3. **Issue #03:** Signup Page UI - Create signup form (static)
4. **Issue #04:** Login Page UI - Create login form (static)
5. **Issue #05:** Firebase Auth Setup - Configure Firebase Authentication
6. **Issue #06:** Integrate Signup with Firebase - Connect signup form to Firebase
7. **Issue #07:** Integrate Login with Firebase - Connect login form to Firebase
8. **Issue #08:** Dashboard UI - Create protected dashboard with news feed layout

### Phase 2: Core Features (Issues 9-15)
**Goal:** Implement main functionality

9. **Issue #09:** News Scraping Backend - Scrape news and process with LLM
10. **Issue #10:** Display Articles - Show articles in dashboard with pagination
11. **Issue #11:** Article Detail View - Display full article with summary and sentiment
12. **Issue #12:** Search and Filter - Implement search and category/sentiment filtering
13. **Issue #13:** Favorites Feature - Save and manage favorite articles
14. **Issue #14:** User Preferences - Set preferred categories for personalized feed
15. **Issue #15:** Trending Articles - Display trending articles section

### Phase 3: Enhancements (Issues 16-18)
**Goal:** Improve user experience

16. **Issue #16:** Sentiment Analysis Display - Enhance sentiment visualization
17. **Issue #17:** Pagination - Add pagination component to all list views
18. **Issue #18:** Profile Page - Create user profile page

### Phase 4: Testing (Issue 19)
**Goal:** Verify complete application flow

19. **Issue #19:** Final Testing - End-to-end testing and documentation

---

## API Endpoints

### Articles

| Method | Endpoint | Protected | Purpose | LLM Integration |
|--------|----------|-----------|---------|-----------------|
| POST | `/api/articles/scrape` | Yes | Scrape and process news articles | Yes |
| GET | `/api/articles` | Yes | Get all articles (paginated) | No |
| GET | `/api/articles/:id` | Yes | Get single article | No |
| GET | `/api/articles/search` | Yes | Search articles | No |
| GET | `/api/articles/trending` | Yes | Get trending articles | No |

### Categories

| Method | Endpoint | Protected | Purpose |
|--------|----------|-----------|---------|
| GET | `/api/categories` | Yes | Get all categories |

### Favorites

| Method | Endpoint | Protected | Purpose |
|--------|----------|-----------|---------|
| POST | `/api/articles/:id/favorite` | Yes | Add article to favorites |
| DELETE | `/api/articles/:id/favorite` | Yes | Remove article from favorites |
| GET | `/api/favorites` | Yes | Get user's favorite articles |

### Preferences

| Method | Endpoint | Protected | Purpose |
|--------|----------|-----------|---------|
| POST | `/api/preferences` | Yes | Update user preferences |
| GET | `/api/preferences` | Yes | Get user preferences |

---

## Frontend Pages

| Page Name | Route | Protected | Main Components |
|-----------|-------|-----------|-----------------|
| Landing | `/` | No | Navbar, Hero, Features, Footer |
| Signup | `/signup` | No | SignupForm |
| Login | `/login` | No | LoginForm |
| Dashboard | `/dashboard` | Yes | NewsFeed, ArticleCard, FilterBar, SearchBar |
| Article Detail | `/articles/:id` | Yes | ArticleDetail, SummaryView, SentimentBadge |
| Favorites | `/favorites` | Yes | FavoritesList, ArticleCard |
| Preferences | `/preferences` | Yes | PreferencesForm, CategorySelector |
| Profile | `/profile` | Yes | ProfileForm |

---

## Key Features

### 1. News Scraping
- Scrape articles from multiple news sources
- Extract article content, title, publication date
- Respect website terms of service and robots.txt

### 2. AI Processing
- **Categorization**: Automatically categorize articles (Technology, Politics, Sports, Business, etc.)
- **Summarization**: Generate concise summaries using LangChain + LLM
- **Sentiment Analysis**: Determine article sentiment (positive, negative, neutral)

### 3. Personalized Feed
- Users can select preferred categories
- Dashboard displays articles based on preferences
- Trending articles section

### 4. Search and Filter
- Search articles by text query
- Filter by category and sentiment
- Combine multiple filters

### 5. Favorites Management
- Save articles to favorites
- View all favorite articles
- Remove articles from favorites

---

## Database Schema (High-Level)

### Tables

**articles**
- Stores scraped news articles
- Fields: identifier, title, content, source URL, publication date, category, summary, sentiment, timestamps

**categories**
- Stores article categories
- Fields: identifier, category name

**user_preferences**
- Stores user category preferences
- Fields: user identifier (Firebase UID), preferred categories

**favorites**
- Stores user's favorite articles
- Fields: user identifier (Firebase UID), article reference

---

## User Flow

1. **First Visit:** User lands on landing page → Clicks "Sign Up"
2. **Registration:** Fills signup form → Firebase creates account → Redirects to login
3. **Login:** Enters credentials → Firebase authenticates → Redirects to dashboard
4. **Main Usage:**
   - Views dashboard with news feed
   - Scrapes news articles (manual trigger)
   - Sees articles with summaries and sentiment
   - Uses search and filters to find articles
   - Clicks on article to view details
   - Saves favorite articles
   - Sets preferences for personalized feed
5. **Article Detail:** Views full content → Reads summary → Sees sentiment → Saves to favorites
6. **Preferences:** Selects preferred categories → Saves preferences → Dashboard updates

---

## Development Workflow

### Starting the Project

1. Complete Issue #01 (Project Setup)
2. Set up Firebase project (Issue #05)
3. Follow issues sequentially from #02 onwards
4. Each issue builds on previous ones

### Testing

- Test each feature as you implement it
- Use browser developer tools for debugging
- Check Firebase Console for authentication
- Verify database operations
- Test error scenarios

### Best Practices

- Follow the issue structure and requirements
- Keep code clean and well-organized
- Add error handling for all operations
- Implement loading states for async operations
- Make UI responsive and accessible
- Document any deviations or improvements

---

## Important Notes

### Web Scraping
- Use LangChain web scraping tools or BeautifulSoup
- Respect robots.txt and website terms of service
- Implement proper error handling for scraping failures
- For MVP, scraping is manually triggered

### LLM Usage
- All AI tasks use LangChain + LLM (no specialized libraries)
- Categorization, summarization, and sentiment analysis all use LLM
- Implement proper error handling for LLM API calls
- Add delays between requests to respect rate limits

### Authentication
- Firebase handles ALL authentication
- No backend authentication logic needed
- Use Firebase UID to associate data with users
- SQLite is for application data only, NOT authentication

### Database
- Students design their own schemas
- Keep it simple - only essential tables
- Use Firebase UID as user reference (not foreign key constraint)

---

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [LangChain Documentation](https://python.langchain.com/)
- [Google Generative AI](https://ai.google.dev/docs)

---

## Success Criteria

### Technical Success
- All endpoints work correctly
- Firebase authentication functions properly
- News scraping works from multiple sources
- LLM integration provides accurate summaries and categorization
- Sentiment analysis works correctly
- Database operations are reliable
- Frontend is responsive and user-friendly

### Learning Success
- Students understand full-stack development
- Students can connect frontend to backend
- Students learn Firebase authentication
- Students understand web scraping basics
- Students learn LangChain for multiple AI tasks
- Students understand LLM integration

---

## License

This is a template project for educational purposes.
