# 🏗️ Skip Rental Redesign – React + Tailwind

This project is a full redesign of the "Choose Your Skip Size" page from [wewantwaste.co.uk](https://wewantwaste.co.uk).
It replaces the original dark UI with a modern, responsive, and accessible interface using **React**, **Vite**, and **Tailwind CSS**.

## 🔍 Overview

The goal was to redesign the skip selection page completely while retaining the original functionality. This includes:

- Responsive layout
- Visual card-based skip options
- Sort and filter capabilities
- Accessibility improvements
- Step-by-step navigation progress bar

---

## 🎯 Redesign Features

| Feature                | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| 💡 Light UI Theme       | Clean, light interface using Tailwind utility classes                      |
| 🧱 Responsive Grid       | 1 card per row on mobile, 2-3 on tablets/desktops                          |
| 🧩 Filter & Sort Panel   | Toggle road-legal skips, size range slider, sort options                    |
| 🎴 Skip Cards            | Interactive cards with hover, selection state, and styled price labels     |
| ⚠️ Status Tags           | Icon + label for "Not Road Legal" skips                                    |
| 📱 Sticky CTA Bar        | Mobile-friendly footer for selected skip actions                           |
| ♿ Accessibility         | Keyboard navigable, alt text, aria labels, WCAG contrast                   |

---

## 🧰 Tech Stack

- ⚛️ React + Vite
- 🎨 Tailwind CSS
- 🧪 JSX Components
- 📡 Fetch API for skip data

---

## 📦 Installation

```bash
# Clone the repo
https://github.com/YOUR_USERNAME/skip-rental-redesign.git

cd skip-rental-redesign
npm install
npm run dev
```

---

## 📡 API Endpoint Used

```
https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft
```

This endpoint returns all available skip options for a postcode + area. We transform the results to format and display:
- Name: "X Yard Skip"
- Hire Period: e.g., 14 days
- Price: formatted as `£price`
- Road Legal Status

---

## 📁 Project Structure

```
skip-rental-redesign/
├── public/
│   └── assets/images/
├── src/
│   ├── components/
│   │   ├── ProgressBar.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── SkipCard.jsx (inlined logic)
│   ├── pages/
│   │   └── Home.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
└── README.md
```

---

## 🌐 Live Preview

You can test the project here:

🔗 [Live on CodeSandbox](https://codesandbox.io/s/github/YOUR_USERNAME/skip-rental-redesign)

---

## ✨ Final Notes

- Skip images are standardized and consistent
- All interactive elements respond on hover/focus
- Designed with responsiveness and clarity in mind

---

## ✅ License

[MIT](LICENSE)

---

> Designed and developed as part of a front-end evaluation task for skip rental service UI improvement