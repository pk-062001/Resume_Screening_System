const fs = require('fs');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');
const { cosineSimilarity } = require('../utils/similarity');

dotenv.config();

// Load embedded resumes
const resumes = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/embedded_resumes.json'), 'utf-8')
);

// Local Python server URL
const LOCAL_EMBEDDING_API = 'http://localhost:8000/embed';


exports.rankCandidates = async (req, res) => {
    const { jobDescription } = req.body;

    if (!jobDescription) {
        return res.status(400).json({ error: 'Job description is required' });
    }

    try {
        // 🔁 Call local Python server to generate embedding
        const response = await axios.post(
            LOCAL_EMBEDDING_API,
            { text: jobDescription },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        const jobEmbedding = response.data.embedding;

        if (!jobEmbedding) {
            throw new Error('Embedding not returned from local API');
        }

        //  Compare with resume embeddings
        const ranked = resumes.map((resume) => {
            const similarity = cosineSimilarity(jobEmbedding, resume.embedding);
            return {
                name: resume.name,
                skills: resume.skills,
                score: Math.round(similarity * 100),
                summary: `${resume.name} brings ${resume.experience} of experience and proficiency in ${resume.skills.slice(0, 5).join(', ')}. Their background demonstrates strong alignment with the job requirements, particularly in key technical areas. Based on their profile, they are likely to contribute effectively to this role and team.`,
            };
        });

        const top10 = ranked.sort((a, b) => b.score - a.score).slice(0, 10);

        return res.json(top10);
    } catch (error) {
        console.error(" Local Embedding API Error:", error.response?.data || error.message);
        return res.status(500).json({
            error: 'Failed to generate embedding via local API',
            details: error.response?.data || error.message,
        });
    }
};

