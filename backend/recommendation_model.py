import pandas as pd
import numpy as np
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows cross-origin requests

# Load trained recommendation model and dataset
model = joblib.load("room_recommendation_model.pkl")  # Replace with your model path
dataset = pd.read_csv("room_data.csv")  # Replace with your dataset path

def recommend_rooms(user_input):
    """Filter and rank rooms based on user input"""
    filtered_rooms = dataset.copy()

    # Apply filtering based on user preferences
    filtered_rooms = filtered_rooms[
        (filtered_rooms["rent"] <= user_input["rent"]) &
        (filtered_rooms["distance"] <= user_input["distance"]) &
        (filtered_rooms["gender"] == user_input["gender"]) &
        (filtered_rooms["wifi"] == user_input["wifi"]) &
        (filtered_rooms["food"] == user_input["food"]) &
        (filtered_rooms["parking"] == user_input["parking"])
    ]

    # Sort by distance and rent (lower is better)
    filtered_rooms = filtered_rooms.sort_values(by=["distance", "rent"], ascending=[True, True])

    return filtered_rooms.to_dict(orient="records")[:5]  # Return top 5 recommendations

@app.route("/recommendations", methods=["POST"])
def get_recommendations():
    user_input = request.json
    recommendations = recommend_rooms(user_input)
    return jsonify(recommendations)

if __name__ == "__main__":
    app.run(debug=True)
