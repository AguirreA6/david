import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  # Importar CORS

app = Flask(__name__)
CORS(app)  # Habilitar CORS para todas las rutas

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

import logging

# Configuración básica del registro
logging.basicConfig(level=logging.DEBUG)

@app.route('/upload', methods=['POST'])
def upload_files():
    try:
        if 'files' not in request.files:
            return jsonify({"error": "No files part in the request"}), 400

        # Obtener los archivos y las rutas
        files = request.files.getlist('files')
        paths = request.form.getlist('paths')
        section = request.form.get('section', 'Sección 1')  # Obtiene la sección desde el frontend

        saved_files = []

        for i, file in enumerate(files):
            path = paths[i] if i < len(paths) and paths[i].strip() else file.filename

            # Crear la carpeta correspondiente a la sección
            section_folder = os.path.join(UPLOAD_FOLDER, section)
            os.makedirs(section_folder, exist_ok=True)  # Asegura que la carpeta de la sección existe

            # Crear subcarpeta dentro de la sección si es necesario
            file_folder = os.path.join(section_folder, os.path.dirname(path))
            os.makedirs(file_folder, exist_ok=True)  # Crea subcarpetas si hay

            # Guarda el archivo en la carpeta correspondiente
            filepath = os.path.join(file_folder, os.path.basename(path))
            file.save(filepath)
            saved_files.append(path)

        return jsonify({"files": saved_files})
    except Exception as e:
        logging.error(f"Error al subir archivos: {e}")
        return jsonify({"error": "Error al procesar la solicitud"}), 500

@app.route('/upload-folder', methods=['POST'])
def upload_folder():
    try:
        if 'files' not in request.files:
            return jsonify({"error": "No files part in the request"}), 400

        files = request.files.getlist('files')
        paths = request.form.getlist('paths')
        section = request.form.get('section', 'Sección 1')

        saved_files = []

        for i, file in enumerate(files):
            path = paths[i] if i < len(paths) and paths[i].strip() else file.filename

            # Asegurarse de que las carpetas correspondientes a la sección existan
            section_folder = os.path.join(UPLOAD_FOLDER, section)
            os.makedirs(section_folder, exist_ok=True)

            file_folder = os.path.join(section_folder, os.path.dirname(path))
            os.makedirs(file_folder, exist_ok=True)

            # Guardar el archivo
            filepath = os.path.join(file_folder, os.path.basename(path))
            file.save(filepath)
            saved_files.append(path)

        return jsonify({"files": saved_files})
    except Exception as e:
        logging.error(f"Error al subir archivos de carpeta: {e}")
        return jsonify({"error": "Error al procesar la solicitud"}), 500



@app.route('/uploads/<path:filename>', methods=['GET'])
def download_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=True)

@app.route('/list-files', methods=['GET'])
def list_files():
    section = request.args.get('section', 'Sección 1')
    folder_path = os.path.join(UPLOAD_FOLDER, section)

    # Verifica si la carpeta existe, y si no, la crea
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)  # Crear la carpeta de la sección si no existe

    def build_tree(directory):
        tree = []
        for item in os.listdir(directory):
            item_path = os.path.join(directory, item)
            if os.path.isdir(item_path):
                tree.append({"name": item, "children": build_tree(item_path)})
            else:
                tree.append(item)
        return tree

    files_tree = build_tree(folder_path)
    logging.debug(f"Archivos en la sección {section}: {files_tree}")
    return jsonify({"files": files_tree})


if __name__ == '__main__':
    app.run(debug=True)
