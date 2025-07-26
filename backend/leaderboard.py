import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# JSONBin Configuration (Private Bin)
JSONBIN_ID = "67bc6f4be41b4d34e49ab670"
JSONBIN_API_KEY = os.getenv("JSONBIN_API_KEY")  # Securely load API key

JSONBIN_URL = f"https://api.jsonbin.io/v3/b/{JSONBIN_ID}"

HEADERS = {
    "Content-Type": "application/json",
    "X-Master-Key": JSONBIN_API_KEY  # Required for private bins
}

def update_leaderboard(nickname: str, score: int):
    """
    Updates the leaderboard, keeping only the top 5 scores.
    """
    try:
        # Fetch current leaderboard data
        response = requests.get(JSONBIN_URL, headers=HEADERS)
        response.raise_for_status()
        leaderboard_data = response.json()

        # Ensure leaderboard is stored inside "record"
        if "record" in leaderboard_data and isinstance(leaderboard_data["record"], list):
            leaderboard = leaderboard_data["record"]
        else:
            leaderboard = []  # Create an empty list if "record" isn't present

        # Append new entry
        leaderboard.append({"nickname": nickname, "score": score})
        leaderboard = sorted(leaderboard, key=lambda x: x["score"], reverse=True)[:5]  # Keep only top 5

        # Update JSONBin with new leaderboard (force overwrite)
        update_payload = {"record": leaderboard}
        response = requests.put(JSONBIN_URL, json=update_payload, headers=HEADERS)
        response.raise_for_status()

        # Fetch the updated data again to verify it was saved
        updated_data = requests.get(JSONBIN_URL, headers=HEADERS).json()

        return {"message": "Leaderboard updated successfully!", "leaderboard": updated_data["record"]}
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}
def get_leaderboard():
    """
    Fetches the top 5 leaderboard entries from JSONBin.
    """
    try:
        response = requests.get(JSONBIN_URL, headers=HEADERS, params={"ts": str(os.urandom(8))})  # Force fresh request
        response.raise_for_status()
        data = response.json()

        # Check if 'record' exists and is a list
        if "record" in data and isinstance(data["record"], list) and len(data["record"]) > 0:
            leaderboard = sorted(data["record"], key=lambda x: x["score"], reverse=True)[:5]
            return leaderboard
        else:
            return [{"nickname": "No Players Yet", "score": 0}]  # Show placeholder if no data
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}
