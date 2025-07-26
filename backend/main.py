from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from game_logic import get_random_code, validate_answer
from leaderboard import get_leaderboard, update_leaderboard

app = FastAPI()

# In-memory store for player scores (this could be replaced by a database in production)
player_scores = {}

# CORS Configuration (Allow frontend requests)
origins = [
    "http://localhost:3000",  # Local frontend testing
    "https://your-vercel-frontend.vercel.app"  # Replace with actual Vercel frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health Check
@app.get("/")
def health_check():
    """Check if backend is running."""
    return {"status": "running", "message": "Secure Code Trainer Backend is live!"}

# Get a random code snippet
@app.get("/game/question")
def get_question():
    """Returns a random code snippet for the player."""
    try:
        question = get_random_code()
        return question
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Define request body schema for checking answers
class AnswerRequest(BaseModel):
    code_id: str
    user_choice: str
    nickname: str  # Added nickname to track score for each player

# Validate user answer and update score
@app.post("/game/answer")
def check_answer(request: AnswerRequest):
    """Validates user input and returns correctness + explanation if incorrect."""
    try:
        result = validate_answer(request.code_id, request.user_choice)
        
        # Update score based on whether the answer was correct
        if request.nickname not in player_scores:
            player_scores[request.nickname] = 0
        
        if result["correct"]:
            player_scores[request.nickname] += 10  # Add 10 points for correct answer (adjust as needed)
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Get player's current score
@app.get("/game/score")
def get_current_score(nickname: str):
    """Get the current score of the player."""
    try:
        score = player_scores.get(nickname, 0)  # Default to 0 if the player hasn't answered yet
        return {"nickname": nickname, "score": score}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Fetch leaderboard
@app.get("/leaderboard")
def fetch_leaderboard():
    """Fetch leaderboard from JSONBin."""
    try:
        leaderboard = get_leaderboard()
        return leaderboard
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Define request body schema for updating leaderboard
class LeaderboardEntry(BaseModel):
    nickname: str
    score: int

# Update leaderboard
@app.post("/leaderboard/update")
def update_score(entry: LeaderboardEntry):
    """Update leaderboard with a new score."""
    try:
        response = update_leaderboard(entry.nickname, entry.score)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run FastAPI with Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
