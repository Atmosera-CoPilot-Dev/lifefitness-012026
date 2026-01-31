import json
from pathlib import Path

def validate_scores(data):
    # Simplified validation: must be a list of rows with 'student' and 'score'
    if not isinstance(data, list) or not data:
        raise ValueError("Malformed data.")
    for row in data:
        if (
            not isinstance(row, dict) or
            "student" not in row or
            "score" not in row or
            not isinstance(row["student"], str) or
            not isinstance(row["score"], int)
        ):
            raise ValueError("Malformed data.")

def load_scores(path):
    p = Path(path)
    if not p.exists():
        raise FileNotFoundError(f"File not found: {p}")
    content = p.read_text(encoding="utf-8")
    if not content.strip():
        raise ValueError("Empty file.")
    try:
        data = json.loads(content)
    except json.JSONDecodeError:
        raise ValueError("Malformed JSON.")
    validate_scores(data)
    return data

def print_report(data):
    title = "Student Test Scores"
    print(title)
    print("=" * len(title))
    print(f"{'Student':<15} {'Score':>5}")
    print(f"{'-'*15} {'-'*5}")
    for row in data:
        print(f"{row['student']:<15} {row['score']:>5}")

if __name__ == "__main__":
    json_path = Path(__file__).parent / "test-scores.json"
    scores = load_scores(json_path)
    print(f"Loaded {len(scores)} rows.")
    print_report(scores)