
# 🧠 Automated Resume Screening and Candidate Ranking System

A full-stack web application that screens and ranks resumes based on job descriptions using AI-generated embeddings. Designed for recruiters to quickly identify the best-fit candidates — with score and a human-readable summary.

---

## 🚀 Live Demo

🌐 **Frontend (Vercel):**  
https://resume-screening-system-nine.vercel.app/

🧪 **Backend & Embedding API:**  
https://resume-screening-backend-u2a9.onrender.com/
Running locally for demo. Can be deployed using Render or Railway (see below).

---

## 📌 Features

✅ Upload and embed resumes using AI  
✅ Input job description from UI  
✅ Returns top 10 ranked resumes  
✅ Cosine similarity-based scoring (0–100)  
✅ Justification summary for each candidate  
✅ Simple and clean UI (built with Next.js)  
✅ Fully working local + deployable architecture

---

## 🧰 Tech Stack

| Layer        | Technology                                |
|--------------|--------------------------------------------|
| Frontend     | Next.js, Tailwind CSS                      |
| Backend      | Node.js (Express), Axios                   |
| Embedding    | `sentence-transformers` (local via Flask)  |
| Deployment   | Vercel (frontend), Render/Local (backend + Python) |
| Utilities    | Faker.js, Cosine Similarity, JSON Handling |

---

## 🏗️ Folder Structure

```
Resume Screening Project/
├── backend/                # Express backend
│   ├── controllers/
│   ├── routes/
│   ├── utils/
│   ├── data/
│   └── app.js
├── scripts/               # Python Embedding API
│   ├── embed_api.py
│   └── requirements.txt
├── resume-screening-frontend/ # Next.js UI
│   └── pages/, styles/, public/, etc.
```

---

## ⚙️ How It Works

1. **Resume Embedding**  
   A Python script encodes each resume into a dense vector using `sentence-transformers`.

2. **Job Description Input**  
   From the frontend, the user inputs a JD.

3. **Embedding & Comparison**  
   JD is sent to the embedding API (Flask), converted into a vector, and compared using cosine similarity against all resume vectors.

4. **Top Matches Returned**  
   The backend returns the top 10 matches with:
   - ✅ Score (0–100)
   - ✅ Justification (~50 words)

---

## 🧪 Local Setup (Optional)

```bash
# 1. Clone the repo
git clone https://github.com/your-username/resume-screening-system.git

# 2. Run embedding API
cd scripts
pip install -r requirements.txt
python embed_api.py

# 3. Run backend
cd ../backend
npm install
node app.js

# 4. Run frontend
cd ../resume-screening-frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
EMBEDDING_API_URL=http://localhost:10000/embed
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## ✅ Challenges Addressed

- 🔍 Handles unstructured resumes using sentence embeddings  
- ⚖️ Avoids keyword bias with contextual similarity  
- ⚡ Responds in under 2s with ranked results  
- 💬 Provides clear justification summaries for recruiters  

---

## 📝 Future Improvements

- Add PDF/Docx resume parsing
- Admin panel for recruiters
- Better model for multi-lingual resumes
- Login/auth for secure usage

---

## 📄 License

MIT — Free to use, modify, and extend.
