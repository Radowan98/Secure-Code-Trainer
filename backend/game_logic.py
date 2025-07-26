import json
import random

# Path to dataset file
DATA_FILE = "data/python_vulnerability.json"

# Load dataset on startup
try:
    with open(DATA_FILE, "r", encoding="utf-8") as file:
        dataset = json.load(file)
    if not dataset:
        raise ValueError("Dataset is empty!")
except Exception as e:
    print(f"Error loading dataset: {e}")
    dataset = []

def get_random_code():
    """
    Returns a random code function for the player to classify.
    """
    if not dataset or len(dataset) == 0:
        raise Exception("Dataset is empty or not loaded correctly!")

    code_entry = random.choice(dataset)
    
    return {
        "id": code_entry.get("id", "unknown"),
        "code": code_entry.get("code", "No code available"),
        "options": ["Safe", "Vulnerable"],  # Player choices
        "time_limit": 10  # Frontend enforces this limit
    }

def validate_answer(code_id: str, user_choice: str):
    """
    Checks whether the user's answer is correct.
    """
    for entry in dataset:
        if entry["id"] == code_id:
            correct_label = entry["label"]
            is_correct = (user_choice.lower() == correct_label.lower())

            response = {
                "correct": is_correct,
                "correct_answer": correct_label
            }

            if not is_correct:
                # Provide explanation if answer is incorrect
                response["reason"] = entry.get("message", "No explanation available.")
                response["solution"] = entry.get("solution_function", "No secure version provided.")

            return response

    return {"error": "Invalid code ID!"}
