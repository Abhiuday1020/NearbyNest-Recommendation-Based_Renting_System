import joblib
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.neighbors import NearestNeighbors

app = Flask(__name__)
CORS(app)

# Load dataset
df = pd.read_csv("recommendation_dataset.csv")

# Define categorical and numerical features
categorical_features = ["Gender", "WiFi", "Food", "Parking", "Amenities"]
numeric_features = ["Rent", "Distance"]

# Define preprocessing pipelines
categorical_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="constant", fill_value="missing")),
    ("onehot", OneHotEncoder(handle_unknown="ignore"))
])

numeric_transformer = Pipeline(steps=[
    ("scaler", StandardScaler())
])

preprocessor = ColumnTransformer(
    transformers=[
        ("num", numeric_transformer, numeric_features),
        ("cat", categorical_transformer, categorical_features)
    ]
)

# Transform dataset and fit KNN
df_transformed = preprocessor.fit_transform(df)
knn_model = NearestNeighbors(n_neighbors=10, metric="euclidean")
knn_model.fit(df_transformed)

def recommend_rooms(user_input):
    """ Recommends nearest rooms based on user preferences. """

    # Convert user input to DataFrame
    user_df = pd.DataFrame([user_input])  

    # Ensure all required fields exist
    for col in categorical_features + numeric_features:
        if col not in user_df:
            user_df[col] = None  # Assign None instead of NaN

    # Fill missing values with default values
    user_df.fillna({
        "Rent": df["Rent"].median(),
        "Distance": df["Distance"].median(),
        "Gender": "Male",
        "WiFi": "No",
        "Food": "No",
        "Parking": "No",
        "Amenities": "None"
    }, inplace=True)

    # Transform user input
    input_transformed = preprocessor.transform(user_df)

    # Convert sparse matrix to dense array if necessary
    if hasattr(input_transformed, "toarray"):
        input_transformed = input_transformed.toarray()

    # Ensure there are no NaN values after transformation
    if np.isnan(input_transformed).any():
        raise ValueError("Input contains NaN after transformation. Please check preprocessing.")

    # Find nearest neighbors
    distances, indices = knn_model.kneighbors(input_transformed)

    # Retrieve recommended rooms
    recommendations = df.iloc[indices[0]]

    return recommendations.to_dict(orient="records")



@app.route("/recommendations", methods=["POST"])
def get_recommendations():
    """ API endpoint for getting recommendations based on user input. """
    user_input = request.json
    recommendations = recommend_rooms(user_input)
    return jsonify(recommendations)

if __name__ == "__main__":
    app.run(debug=True)
