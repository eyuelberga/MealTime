from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import HTTPException
from starlette.responses import JSONResponse
from recipe_scrapers import scrape_me

app = FastAPI()

origins = [
    "*",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/health-check', status_code=200)
async def health_check():
    return 'Server is ready to go!'


class ImportRequest(BaseModel):
    url: str


@app.post("/import")
async def lookup_words(req: ImportRequest):
    scraper = scrape_me(req.url)
    return JSONResponse(scraper.to_json())
