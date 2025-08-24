# ✈️ Flight Search Demo (React)

This is a **demo frontend project** built with **React + TypeScript + TailwindCSS**. It simulates a flight search flow with:

- **Header** – simple top bar.
- **SearchForm** – form for entering route and date.
- **FlightResult** – shows flights with basic details.
- **Custom hook** – small hook to manage API calls & state.
- **Services** – API layer to fetch data (mock / RapidAPI).
- **Skeletons** – loading placeholders for better UX.

---

## 🚀 Features
- Search form triggers a request and shows results.
- While fetching, skeleton loaders are displayed.
- Clean separation of **UI / hooks / services**.
- Responsive layout with Tailwind.

---

## 🛠 Tech stack
- **React 18**
- **TypeScript**
- **React Router** (for navigation)
- **TailwindCSS** (styling)
- **Framer Motion** (small animations)

---

## 📦 Setup

```bash
# Install deps
yarn install

# Start dev server
yarn dev
```

For external API calls (RapidAPI SkyScraper), set your key in `.env.local`:

```bash
REACT_APP_RAPIDAPI_KEY=your_api_key_here
```
