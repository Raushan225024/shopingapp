from pathlib import Path
import sys
import logging


# Add parent directory to sys.path
sys.path.insert(
    0,
    str(Path(__file__).resolve().parent.parent)
)

from config.vector_db_config import connect_supabase
import config.projectConfig as config

# -----------------------------
# Logging Configuration
# -----------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)


def retrieve_documents(
    query_embedding,
    k=50
):

    try:

        # Connect to Supabase
        supabase = connect_supabase()

        # Call Supabase RPC function
        response = supabase.rpc(
            "match_document_vector",
            {
                "query_embedding": query_embedding,
                "match_count": k
            }
        ).execute()

        # Get retrieved documents
        config.search_results = response.data
        print(f"Retrieved {len(config.search_results)} documents")
        print(f"type of documents: {type(config.search_results)}")
        print(f"documents: {config.search_results}")
        logging.info(
            f"Retrieved {len(config.search_results)} documents"
        )

        return config.search_results

    except Exception as e:

        logging.error(
            f"Error during retrieval: {e}"
        )

        raise