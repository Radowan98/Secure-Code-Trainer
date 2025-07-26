import pytest
from unittest.mock import patch
from leaderboard import get_leaderboard, update_leaderboard

@patch("leaderboard.requests.get")
def test_get_leaderboard(mock_get):
    """Test fetching leaderboard from JSONBin."""
    mock_response = {"record": [{"nickname": "Alice", "score": 100}]}
    mock_get.return_value.json.return_value = mock_response
    mock_get.return_value.raise_for_status = lambda: None  # Mock no errors

    leaderboard = get_leaderboard()
    assert isinstance(leaderboard, list)
    assert leaderboard[0]["nickname"] == "Alice"
    assert leaderboard[0]["score"] == 100

@patch("leaderboard.requests.put")
@patch("leaderboard.get_leaderboard")
def test_update_leaderboard(mock_get_leaderboard, mock_put):
    """Test updating leaderboard and sorting scores."""
    mock_get_leaderboard.return_value = [{"nickname": "Alice", "score": 100}]
    mock_put.return_value.raise_for_status = lambda: None  # Mock no errors

    new_entry = {"nickname": "Bob", "score": 120}
    result = update_leaderboard(new_entry["nickname"], new_entry["score"])

    assert "message" in result
    assert "leaderboard" in result
    assert result["leaderboard"][0]["nickname"] == "Bob"  # Bob should be on top
