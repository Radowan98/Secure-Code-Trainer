import pytest
from game_logic import get_random_code, validate_answer

def test_get_random_code():
    """Test that a random code snippet is returned with necessary fields."""
    question = get_random_code()
    
    assert "id" in question
    assert "code" in question
    assert "options" in question
    assert "time_limit" in question
    assert question["time_limit"] == 10

def test_validate_answer():
    """Test that validate_answer correctly identifies answers."""
    # Sample function in dataset
    sample_code_id = "test_id"
    correct_label = "Vulnerable"

    # Mock dataset (monkeypatching)
    mock_dataset = [{"id": sample_code_id, "label": correct_label, "message": "Sample reason", "solution_function": "Fixed version"}]
    
    # Patch the dataset
    from game_logic import dataset
    dataset.clear()
    dataset.extend(mock_dataset)

    # Test correct answer
    result = validate_answer(sample_code_id, "Vulnerable")
    assert result["correct"] is True

    # Test incorrect answer
    result = validate_answer(sample_code_id, "Safe")
    assert result["correct"] is False
    assert "reason" in result
    assert "solution" in result
