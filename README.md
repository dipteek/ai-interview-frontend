# AI-Powered Interview Preparation Platform — Frontend

This is the **frontend** for the project titled:

> 📌 **Development of AI-Powered Interview Prep for Candidates**

It is built using **Next.js 14 (App Router)** and provides a fully interactive, voice/text-based mock interview platform. The system uses AI to generate job-role-specific questions, assess candidate responses, and give real-time personalized feedback.

---

## 🌟 Features

✅ AI-generated interview questions (GPT/Gemini based)  
✅ **Voice and Text Interview Simulation**  
✅ Coding Round with Real-Time Code Editor
✅ NLP-based feedback on tone, clarity, confidence, and relevance  
✅ Role and experience-level customization (Fresher, Intermediate, Expert)  
✅ Adaptive difficulty based on performance  
✅ Performance analytics dashboard with progress tracking  
✅ Multiple-choice quiz round  
✅ Custom interview sessions (duration & difficulty)  
✅ Authentication and personalized session history  
✅ Responsive UI with microphone and code editor integration  

---

## 🧠 Modules Overview

| Module                 | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| 🎤 Voice Interview     | Speak your answers. Uses Web Speech API / Whisper + NLP feedback            |
| ⌨️ Text Interview      | Type responses to AI-generated questions                                    |
| 💻 Coding Round       | Solve coding problems in a real-time code editor with language selection   |
| 📊 Dashboard           | View performance metrics (tone, fluency, content, history)                  |
| 🧩 MCQ Round           | Topic-specific multiple-choice technical questions                          |
| ⚙️ Custom Session      | Choose tech stack, experience level, and duration                           |

---

## 🔧 Tech Stack

| Layer        | Tools/Technologies                              |
|--------------|-------------------------------------------------|
| Frontend     | Next.js 14 (App Router), React.js               |
| Styling      | Tailwind CSS, CSS Modules                       |
| Audio Input  | Web Speech API, Whisper (via backend)           |
| Charts       | Chart.js for data visualization                 |
| Code Editor  | Monaco Editor (VS Code-like experience)         |
| Backend API  | Django REST Framework                           |
| AI Services  | OpenAI GPT, Google Gemini (via backend)         |
| NLP          | HuggingFace Transformers, spaCy, TextBlob       |

---

## 🗂️ Project Structure

```
app/
├── page.js                   # Landing Page
├── login/page.js             # Login
├── signup/page.js            # Register
├── dashboard/page.js         # Analytics Dashboard
├── interview/page.js         # AI Voice/Text Interview
├── coding/page.js            # Coding Round (Monaco Editor)
├── mcq/page.js               # Multiple Choice Round
├── customize/page.js         # Custom Interview Settings
├── components/               # Reusable UI Components
│   ├── NavBar.jsx
│   ├── InterviewBox.jsx
│   ├── FeedbackGraph.jsx
│   └── CodeEditor.jsx
├── utils/                    # Helper Functions
├── services/                 # API Utilities (Axios instance)
├── public/                   # Static Assets
└── styles/                   # Global + Tailwind Styles
```

---

## ⚙️ Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ai-interview-frontend.git
cd ai-interview-frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Start development server

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` in your browser.

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/
```

Make sure your Django backend is running and accessible.

---



## 🧪 Testing Features

- ✅ Mock interviews with AI questions
- ✅ Voice and text input support
- ✅ Code editor for solving problems
- ✅ Real-time NLP feedback
- ✅ Dashboards with charts and metrics

---

## 🧑 Author

**Dipteek Maidawat**  
RV College of Engineering, Bengaluru  
Email: `dipteekm.mca23@rvce.edu.in`

Mentor: **Dr. Usha J**, Professor, MCA Department

---

