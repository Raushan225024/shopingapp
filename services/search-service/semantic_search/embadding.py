from pathlib import Path
import sys
from langchain_huggingface import HuggingFaceEmbeddings

# Ensure `rag` (the parent folder) is on sys.path so `import config...` works
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from langchain_text_splitters import RecursiveCharacterTextSplitter
import config.projectConfig as config

def load_embedding_model():
    """
    Load the HuggingFace embedding model.
    """

    config.embedding_model = HuggingFaceEmbeddings(
        model_name=config.EMBEDDING_MODEL
    )

    return config.embedding_model

def generate_embeddings(document):
    """
    Generate embeddings for a single document.

    Args:
        document: The document for which to generate embeddings.

    Returns:
        List of embeddings.
    """

    


    # Load embedding model
    load_embedding_model()

    config.vectors = []

        # Generate embeddings for current batch
    embeddings = config.embedding_model.embed_query(
            document
        )

        # Store embeddings
    config.vectors.extend(embeddings)

    return config.vectors