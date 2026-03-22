<div align="center">

# 📚 Syllabi-Reader

**Simplifying Your Academic Life**

Upload your course syllabi and let AI extract key dates — exams, assignments, deadlines — straight into a downloadable calendar file.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-412991?logo=openai)](https://openai.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

</div>

---

## ✨ Features

| Feature | Description |
| --- | --- |
| **AI-Powered Extraction** | Upload a PDF or DOCX syllabus and let OpenAI extract exams, homework, deadlines, and holidays automatically. |
| **Event Editor** | Review, edit, add, or delete extracted events before exporting — you're always in control. |
| **Calendar View** | Visualize all your events on an interactive mini-calendar with event-day indicators. |
| **ICS Export** | Download a `.ics` file with smart reminders (5 days for exams, 3 for projects, 2 for homework) and import it into Google Calendar, Outlook, or Apple Calendar. |
| **Multi-File Upload** | Upload multiple syllabi at once — events from all files are merged and sorted by date. |
| **Internationalization** | Full i18n support for **8 languages**: English, Spanish, French, Turkish, Japanese, Korean, Chinese, and Arabic (with RTL). |
| **Dark / Light Theme** | Toggle between themes with a flicker-free, system-aware implementation. |

---

## 🛠️ Tech Stack

- **Framework** — [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
- **UI** — [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)
- **AI** — [OpenAI API](https://platform.openai.com/) (GPT-3.5 Turbo)
- **PDF Parsing** — [pdf.js](https://mozilla.github.io/pdf.js/)
- **DOCX Parsing** — [Mammoth.js](https://github.com/mwilliamson/mammoth.js)
- **Calendar** — [react-calendar](https://github.com/wojtekmaj/react-calendar), [ics](https://github.com/adamgibbons/ics)
- **Database** — [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- **i18n** — [next-intl](https://next-intl.dev/)
- **Auth** — [bcrypt](https://github.com/kelektiv/node.bcrypt.js) (password hashing)
- **Validation** — [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- A MongoDB database (local or [Atlas](https://www.mongodb.com/atlas))
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Installation

```bash
# Clone the repository
git clone https://github.com/ilkeEren27/syllabi-reader.git
cd syllabi-reader

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=your_mongodb_connection_string
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 📂 Project Structure

```
syllabi-reader/
├── app/
│   ├── [locale]/          # Locale-aware pages (home, upload)
│   ├── api/
│   │   ├── extractDates/  # OpenAI date extraction endpoint
│   │   └── generateICS/   # ICS file generation endpoint
│   ├── i18n/              # Internationalization config
│   └── locales/           # Translation files (8 languages)
├── components/
│   ├── UploadSyllabi.js   # File upload & text extraction
│   ├── EventEditor.js     # Editable event list
│   ├── MiniCalendar.js    # Interactive calendar view
│   ├── LanguageSwitch.js  # Language selector
│   ├── ThemeToggle.js     # Dark / Light mode toggle
│   └── ui/                # Reusable UI primitives
├── config/
│   └── database.js        # MongoDB connection
├── models/                # Mongoose schemas
├── _actions/              # Server actions
├── lib/                   # Utility functions
└── public/                # Static assets
```

---

## 🌍 Supported Languages

| Language | Code |
| --- | --- |
| English | `en` |
| Spanish | `es` |
| French | `fr` |
| Turkish | `tr` |
| Japanese | `ja` |
| Korean | `ko` |
| Chinese | `zh` |
| Arabic | `ar` |

---

## 🤝 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://ilkeeren.dev">
        <b>Eren</b>
      </a>
    </td>
    <td align="center">
      <a href="https://www.linkedin.com/in/hassan-syed/">
        <b>Hassan Syed</b>
      </a>
    </td>
  </tr>
</table>

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.
