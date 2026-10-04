import os
from dotenv import load_dotenv
from pathlib import Path



load_dotenv()
# base path
BASE_DIR = Path(__file__).resolve().parent.parent
print(f"BASE_DIR: {BASE_DIR}")
# -------------------------
# API Keys
# -------------------------
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# -------------------------
# LLM Configuration
# -------------------------
LLM_MODEL = "llama-3.3-70b-versatile"

# -------------------------
# Embedding Model
# -------------------------
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

document = None 

embedding_model = None
vectors = None
search_results = None