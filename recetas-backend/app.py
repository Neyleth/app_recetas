from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) #habilita Cors para que React pueda consumir la API

#Recetas
recetas = [
    {
        "id": 1,
        "nombre": "Arroz con pollo",
        "ingredientes": ["arroz" , "pollo" , "morron" , "ajo" , "cebolla" , "verdeo"],
        "pasos": "Cocinar el pollo, agregar el ajo, morron y cebolla, cuando este sofrito todo agregar el arroz y cocinar todo junto, agregar agua y dejar que se consuma, luego bajar la llama y tapar.",
        "imagen": "https://via.placeholder.com/300",
    },
    {
        "id": 2,
        "nombre":"Ensalada Cesar",
        "ingredientes": ["lechuga" , "pollo" , "queso" , "crutones"],
        "pasos": "Cocinar el pollo a la plancha, en un bol agregar la lechuga cortada, el queso en cuadritos, los crutones y el pollo en cubos. Servir con aderezo.",
        "imagen": "https://via.placeholder.com/300",
    }
]

@app.route("/api/recetas", methods=["GET"])
def obtener_recetas():
    return jsonify(recetas)

@app.route("/api/recetas/<int:receta_id>", methods=["GET"])
def obtener_receta(receta_id):
    receta = next((r for r in recetas if r["id"] == receta_id), None)
    return jsonify(receta) if receta else ("Receta no encontrada", 404)

if __name__ == "__main__":
    app.run(debug=True)
