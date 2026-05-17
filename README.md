# Veylox 🔐

Veylox is a secure API key vault and developer workspace designed to help developers organize, store, manage, monitor, and track API keys across multiple projects.

Instead of keeping API keys scattered across notes, files, or environment variables, Veylox provides a centralized dashboard with usage tracking, expiry reminders, analytics, and project-based organization.

---

## ✨ Features

### Authentication

* Email/password signup and login
* Google OAuth authentication
* GitHub OAuth authentication
* Protected routes and session handling

### Project Management

* Create multiple projects
* Organize API keys by project
* Delete projects
* Dedicated project workspace

### API Key Management

* Add API keys
* Store keys in encrypted form
* Mask API keys in UI
* Copy API keys securely
* Delete API keys
* Track last used timestamps

### Security

* Encryption for stored API keys
* Password hashing with bcrypt
* JWT authentication
* Route protection middleware

### Alerts & Reminders

* API key expiry dates
* Automated cron jobs
* Email reminder system
* Notification reminders
* Expiry tracking calendar

### Usage Analytics

* Usage count tracking
* Usage overview dashboard
* Usage bars and indicators
* High usage warnings
* Recent activity feed

### Dashboard

* Project statistics
* Active and expired keys overview
* Calendar with expiry markers
* Reminder panel
* Usage chart visualization
* Profile panel

---

## 🛠 Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Recharts
* Lucide Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* node-cron
* Nodemailer

### Authentication

* NextAuth
* Google OAuth
* GitHub OAuth

---

## 📂 Project Structure

```bash
Veylox/
│
├── client/
│   ├── app/
│   ├── components/
│   ├── public/
│   └── styles/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── cron/
│   ├── utils/
│   └── config/
│
└── README.md
```

---

## ⚙ Installation

Clone repository:

```bash
git clone https://github.com/yourusername/veylox.git
```

Move into project:

```bash
cd veylox
```

Install frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd server
npm install
```

---

## Environment Variables

Create a `.env` file.

```env
MONGO_URI=
JWT_SECRET=

NEXTAUTH_SECRET=
NEXTAUTH_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_ID=
GITHUB_SECRET=

EMAIL_USER=
EMAIL_PASS=
```

---

## Run Project

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
npm run dev
```

Frontend:

```bash
http://localhost:3000
```

Backend:

```bash
http://localhost:4000
```

---

## Future Improvements

* Team collaboration
* Shared workspaces
* API key rotation
* Advanced analytics
* AI usage insights
* Export reports
* Dark mode enhancements
* Push notifications

---

## Author

Built with ❤️ by Saanvi

Veylox — Secure API Key Management for Developers.
