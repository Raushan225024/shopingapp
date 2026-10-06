import os
import json


from regex import search
from fastapi import FastAPI, Query, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from redis import Redis

from semantic_search.embadding import generate_embedding
from semantic_search.retriver import search_products
import config.projectConfig as config


app = FastAPI(title="Product Search Service")



# --------------------------------------------------
# Redis
# --------------------------------------------------

redis_client = Redis(
    host=os.getenv("REDIS_HOST", "localhost"),
    port=int(os.getenv("REDIS_PORT", 6379)),
    decode_responses=True
)


# --------------------------------------------------
# Health endpoint
# --------------------------------------------------

@app.get("/health")
async def health():
    return {
        "status": "UP",
        "service": "search-service"
    }


# --------------------------------------------------
# Search Product
# --------------------------------------------------

@app.get("/searchProduct")
async def search_product(
    q: str = Query(..., min_length=1),
    limit: int = Query(10, ge=1, le=50),

    x_user_id: str = Header(...)
):

    user_id = x_user_id

    # ----------------------------------------------
    # Redis key for this user's search
    # ----------------------------------------------

    search_id = f"search:{user_id}:{q}"

    # ----------------------------------------------
    # Check whether search already exists in Redis
    # ----------------------------------------------

    cached_results = redis_client.get(search_id)

    if cached_results:

        print("Getting search result from Redis")

        results = json.loads(cached_results)

    else:

        print("Running embedding + retriever")

        # ------------------------------------------
        # 1. Generate embedding
        # ------------------------------------------

        await generate_embedding(q)
        query_embadding = config.vectors
        # ------------------------------------------
        # 2. Search vector database
        # ------------------------------------------

        await search_products(
            query_embedding=query_embadding,
            top_k=100
        )
        results = config.search_results

        # ------------------------------------------
        # 3. Store complete search result in Redis
        # ------------------------------------------

        redis_client.setex(
            search_id,
            300,                 # 5 minutes
            json.dumps(results)
        )


    return {
        "success": True,
        "query": q,
        "user_id": user_id,
        
        
        
    }