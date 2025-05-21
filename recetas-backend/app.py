from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

recetas = [
    {"id": 1, "nombre": "Arepas rellenas"},
    {"id": 2, "nombre": "Ensalada de atún"},
    {"id": 3, "nombre": "Pasta con verduras"},
]

@app.route("/recetas", methods=["GET"])
def obtener_recetas():
    return jsonify(recetas)

if __name__ == "__main__":
    app.run(debug=True)