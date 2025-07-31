'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [jd, setJd] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!jd.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/rank', {
        jobDescription: jd,
      });
      setResults(res.data);
    } catch (err) {
      alert("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-2">
          📄 Automated Resume Ranker
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Paste a job description to find top matching candidates.
        </p>

        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-blue-400"
          placeholder="Enter job description here..."
          rows="6"
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />

        <div className="text-center mt-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded transition duration-200"
          >
            {loading ? 'Ranking...' : 'Rank Candidates'}
          </button>
        </div>

        {results.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Top Candidates:</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {results.map((r, i) => (
                <div
                  key={i}
                  className="bg-white p-4 border rounded-lg shadow hover:shadow-md transition duration-300"
                >
                  <h3 className="font-bold text-lg text-blue-800">{r.name}</h3>
                  <p className="text-gray-600 text-sm">Score: <span className="font-medium">{r.score}</span></p>
                  <p className="text-sm mt-2 text-gray-700">{r.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
