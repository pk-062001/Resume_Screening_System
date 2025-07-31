from faker import Faker
import random, json

fake = Faker()
skills_pool = ['Python', 'Java', 'React', 'Node.js', 'TensorFlow', 'AWS', 'SQL', 'Docker', 'MongoDB', 'GCP']

resumes = []

for _ in range(100):
    resume = {
        "name": fake.name(),
        "skills": random.sample(skills_pool, 4),
        "experience": f"{random.randint(1, 8)} years",
        "education": fake.job()
    }
    resumes.append(resume)

with open("resumes.json", "w") as f:
    json.dump(resumes, f, indent=2)

print("✅ Generated 100 fake resumes.")


