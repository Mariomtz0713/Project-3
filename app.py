from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def flights():
    x = '10'
    return (x)

if __name__ == "__main__":
    app.run(debug=True)