# 🌍 Multi-Language News App

A modern, fully responsive React news application powered by [NewsData.io](https://newsdata.io), supporting **20 languages**, **13+ categories**, and **15 countries** with a sleek dark/light theme toggle.

![Nexus News Preview](https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80)

---

## ✨ Features

- 🌐 **20 Languages** — English, Hindi, Arabic, French, German, Spanish, Chinese, Japanese, Korean, Russian, and more
- 📂 **13+ Categories** — Top Stories, Business, Technology, Science, Health, Sports, Entertainment, Politics, Environment, Food, Travel, World
- 🌎 **Country Filter** — Filter news by 15 countries including US, UK, India, Germany, Japan, China, Brazil, and more
- 🔍 **Live Search** — Debounced full-text search across all articles
- ♾️ **Infinite Pagination** — Load more stories using NewsData.io's pagination tokens
- 🌙 **Dark / Light Theme** — Persisted via `localStorage`
- 📱 **Fully Responsive** — Mobile, tablet, and desktop layouts
- ⚡ **Skeleton Loading** — Smooth skeleton placeholders while fetching
- 🛡️ **Error Handling** — Graceful error states with retry options

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
cd multilang-news-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Your API Key

Get your free API key from [newsdata.io/register](https://newsdata.io/register), then:

```bash
cp .env.example .env
```

Edit `.env`:

```env
REACT_APP_NEWSDATA_API_KEY=your_actual_api_key_here
```

> ⚠️ **Never commit your `.env` file.** It's already in `.gitignore`.

### 4. Start the Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🔧 API Reference

This app uses the [NewsData.io REST API](https://newsdata.io/documentation).

| Parameter  | Description                             |
|------------|-----------------------------------------|
| `language` | ISO 639-1 language code (e.g. `en`, `hi`) |
| `category` | News category (e.g. `technology`, `sports`) |
| `country`  | ISO 3166-1 alpha-2 country code (e.g. `us`) |
| `q`        | Full-text search query                  |
| `page`     | Pagination token from previous response |

### Free Plan Limits

- ✅ 200 requests/day
- ✅ Up to 10 articles per request
- ✅ Access to latest news endpoint

---

## 📦 Build for Production

```bash
npm run build
```

The optimized build will be in the `build/` directory, ready to deploy on Vercel, Netlify, or any static host.

---

## 🌐 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Set the environment variable `REACT_APP_NEWSDATA_API_KEY` in your Vercel project settings.

---

## 🎨 Design System

All colors, spacing, typography, and animations are driven by CSS custom properties defined in `src/index.css`:

```css
:root {
  --bg-primary: #080b14;
  --accent-primary: #3b82f6;
  --font-display: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  /* ... */
}
```

Switching `data-theme="light"` on `<html>` automatically remaps all variables.

---

## 🛠️ Tech Stack

| Technology        | Usage                          |
|-------------------|-------------------------------|
| React 18          | UI framework                  |
| React Router v6   | Client-side routing           |
| Axios             | HTTP requests                 |
| date-fns          | Human-readable timestamps     |
| NewsData.io API   | News data source              |
| CSS Custom Props  | Design system / theming       |
| Google Fonts      | Syne + DM Sans typography     |

---

## 📄 License

MIT — feel free to use, fork, and build on this project.

---

## 🙏 Credits

- News data by [NewsData.io](https://newsdata.io)
- Typography: [Syne](https://fonts.google.com/specimen/Syne) & [DM Sans](https://fonts.google.com/specimen/DM+Sans) via Google Fonts
