# import kagglehub
# import pandas as pd
# from pandas import pd 
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Download dataset
# path = kagglehub.dataset_download("bhavyadhingra00020/healthy-indian-recipes")

# Assuming the dataset is in CSV format
# df = pd.read_csv(path + '/dataset.csv')  # Replace with actual file name

# Sample data for cuisines (this can be dynamic if needed)
cuisines = [
    "American", "Kid-Friendly", "Italian", "Asian", "Mexican", "Southern & Soul Food"
]

# Route to get the list of cuisines
@app.route('/api/cuisines', methods=['GET'])
def get_cuisines():
    return jsonify(cuisines)

# Route to get recipes from the dataset
@app.route('/api/recipes', methods=['GET'])
def get_recipes():
    # Convert the dataframe to a list of dictionaries (optional)
    recipes = df.to_dict(orient='records')
    return jsonify(recipes)

# Route to submit user preferences (cuisines)
@app.route('/api/submit', methods=['POST'])
def submit_preferences():
    selected_cuisines = request.json.get('selectedCuisines', [])
    # Here, you could store the preferences in a database or perform other actions
    print(f"User selected cuisines: {selected_cuisines}")
    return jsonify({"status": "success", "selected": selected_cuisines})

if __name__ == '__main__':
    app.run(debug=True)
