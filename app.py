from flask import Flask, jsonify
from flask_cors import CORS
import pymongo
import json

app = Flask(__name__)
CORS(app)

# Creating connection 
conn = 'mongodb://localhost:27017'

# Passing connection to pymongo instance
client = pymongo.MongoClient(conn)

db = client.trips
flight_data = db.flights


@app.route("/")
def home():
    return (
        f'Welcome! Here are the avaliable routes: <br>'
        f'/flights'
    )

@app.route('/flights')
def flights():
    # Pulling all data in database except id due to object error
    flight_documents = list(flight_data.find({}, {'_id': False}))

    return jsonify(flight_documents)

if __name__ == "__main__":
    app.run(debug=True)