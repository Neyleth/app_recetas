from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
CORS(app)

# Configurar la base de datos SQLite (archivo en el mismo proyecto)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'recetas.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Receta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    ingredientes = db.Column(db.Text, nullable=False)  # Guardamos como texto separado por coma

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "ingredientes": self.ingredientes.split(",")  # Convertimos a lista
        }

# Rutas usando la base de datos

@app.route("/recetas", methods=["GET"])
def obtener_recetas():
    recetas = Receta.query.all()
    return jsonify([r.to_dict() for r in recetas])

@app.route("/recetas/<int:id>", methods=["GET"])
def obtener_receta(id):
    receta = Receta.query.get(id)
    if receta:
        return jsonify(receta.to_dict())
    return jsonify({"error": "Receta no encontrada"}), 404

@app.route("/recetas", methods=["POST"])
def agregar_receta():
    data = request.get_json()

    if not data or "nombre" not in data or "ingredientes" not in data or "descripcion" not in data:
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    ingredientes_str = ",".join(data["ingredientes"]) if isinstance(data["ingredientes"], list) else data["ingredientes"]

    receta = Receta(
        nombre=data["nombre"],
        descripcion=data["descripcion"],
        ingredientes=ingredientes_str
    )
    db.session.add(receta)
    db.session.commit()

    return jsonify(receta.to_dict()), 201

# Crear base de datos y tablas
with app.app_context():
    db.create_all()
    if Receta.query.count() == 0:
        receta1 = Receta(
            nombre="Arepas rellenas",
            descripcion="Mezcla la harina con agua y sal, forma arepas, cocínalas y rellénalas con queso y jamón.",
            ingredientes="Harina de maíz,Agua,Sal,Queso,Jamón"
        )
        receta2 = Receta(
            nombre="Ensalada de atún",
            descripcion="Combina todos los ingredientes frescos y añade atún y aceite de oliva al gusto.",
            ingredientes="Atún,Lechuga,Tomate,Cebolla,Aceite de oliva"
        )
        receta3 = Receta(
            nombre="Pasta con verduras",
            descripcion="Cocina la pasta y las verduras, luego mezcla todo con salsa de tomate.",
            ingredientes="Pasta,Zanahoria,Brócoli,Pimiento,Salsa de tomate"
        )
        db.session.add_all([receta1, receta2, receta3])
        db.session.commit()

if __name__ == "__main__":
    app.run(debug=True)