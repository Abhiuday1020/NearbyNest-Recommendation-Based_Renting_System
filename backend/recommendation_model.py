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

df = pd.read_csv("recommendation_dataset.csv")

categorical_features = ["Gender", "WiFi", "Food", "Parking", "Amenities"]
numeric_features = ["Rent", "Distance"]

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

df_transformed = preprocessor.fit_transform(df)
knn_model = NearestNeighbors(n_neighbors=10, metric="euclidean")
knn_model.fit(df_transformed)

def recommend_rooms(user_input):

    user_df = pd.DataFrame([user_input])  
    print("hello", user_df.columns)
    for col in categorical_features + numeric_features:
        if col not in user_df:
            user_df[col] = None

    user_df.fillna({
        "Food": "No",
        "Parking": "Yes",
    }, inplace=True)

    user_df = user_df.infer_objects(copy=False)
    input_transformed = preprocessor.transform(user_df)

    if hasattr(input_transformed, "toarray"):
        input_transformed = input_transformed.toarray()

    if np.isnan(input_transformed).any():
        raise ValueError("Input contains NaN after transformation. Please check preprocessing.")

    distances, indices = knn_model.kneighbors(input_transformed)

    recommendations = df.iloc[indices[0]]

    return recommendations.to_dict(orient="records")



@app.route("/recommendations", methods=["POST"])
def get_recommendations():
    user_input = request.json
    print("Data received from frontend:", user_input)
    recommendations = recommend_rooms(user_input)
    return jsonify(recommendations)

if __name__ == "__main__":
    app.run(debug=True)
