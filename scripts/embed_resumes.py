from sentence_transformers import SentenceTransformer
import json

# Load resumes
with open("resumes.json", "r") as f:
    resumes = json.load(f)

# Load model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Generate embeddings
for resume in resumes:
    # Combine fields into a single string
    text = f"{resume['name']} {', '.join(resume['skills'])} {resume['experience']} {resume['education']}"
    embedding = model.encode(text)
    resume["embedding"] = embedding.tolist()

# Save new JSON
with open("embedded_resumes.json", "w") as f:
    json.dump(resumes, f, indent=2)

print("✅ Embeddings saved to embedded_resumes.json")

