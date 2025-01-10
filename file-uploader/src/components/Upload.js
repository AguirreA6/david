import React, { useState, useEffect } from "react";
import axios from "axios";

const Upload = () => {
    const [filesData, setFilesData] = useState({
        "Sección 1": [],
        "Sección 2": [],
        "Sección 3": []
    });

    // Estado para gestionar la expansión de las carpetas
    const [expandedFolders, setExpandedFolders] = useState({});

    // Función para alternar la expansión de una carpeta
    const toggleFolder = (folderName) => {
        setExpandedFolders((prevState) => ({
            ...prevState,
            [folderName]: !prevState[folderName],
        }));
    };

    // Función para obtener los archivos
    const fetchFiles = async (section) => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/list-files", {
                params: { section },
            });
            setFilesData((prevState) => ({
                ...prevState,
                [section]: response.data.files,
            }));
        } catch (error) {
            console.error(`Error fetching files for ${section}:`, error);
        }
    };

    useEffect(() => {
        ["Sección 1", "Sección 2", "Sección 3"].forEach(fetchFiles);
    }, []);

    const handleFileUpload = async (event, section) => {
        const uploadedFiles = Array.from(event.target.files);
        const formData = new FormData();
    
        uploadedFiles.forEach((file) => {
            formData.append("files", file);
            formData.append("paths", file.webkitRelativePath || file.name);
        });
        formData.append("section", section);  // Agregar la sección para indicar dónde guardar los archivos
    
        try {
            await axios.post("http://127.0.0.1:5000/upload", formData);
            alert(`Archivos subidos exitosamente en la sección ${section}`);
            fetchFiles(section);
        } catch (error) {
            console.error(`Error subiendo archivos en ${section}:`, error);
        }
    };
    

    const handleFolderUpload = async (event, section) => {
        const uploadedFiles = Array.from(event.target.files);
        const formData = new FormData();

        uploadedFiles.forEach((file) => {
            formData.append("files", file);
            formData.append("paths", file.webkitRelativePath || file.name);
        });
        formData.append("section", section);

        try {
            await axios.post("http://127.0.0.1:5000/upload-folder", formData); // Ruta para subir carpetas
            alert(`Carpeta subida exitosamente en la sección ${section}`);
            fetchFiles(section);
        } catch (error) {
            console.error(`Error subiendo carpeta en ${section}:`, error);
        }
    };


    const renderTree = (files, section) => {
        return (
            <ul>
                {files.map((file, index) =>
                    typeof file === "string" ? (
                        <li key={index}>
                            {file}{" "}
                            <a href={`http://127.0.0.1:5000/uploads/${section}/${file}`} download>
                                Descargar
                            </a>
                        </li>
                    ) : (
                        <li key={file.name}>
                            <strong
                                onClick={() => toggleFolder(file.name)}
                                style={{ cursor: "pointer" }}
                            >
                                📁 {file.name}
                            </strong>
                            {expandedFolders[file.name] && file.children && (
                                <ul>{renderTree(file.children, section)}</ul>
                            )}
                        </li>
                    )
                )}
            </ul>
        );
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Gestión de Archivos y Carpetas</h1>
            {["Sección 1", "Sección 2", "Sección 3"].map((section, index) => (
                <div
                    key={index}
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        padding: "20px",
                        marginBottom: "20px",
                    }}
                >
                    <h2>{section}</h2>
                    <div style={{ marginBottom: "10px" }}>
                        <label>
                            <strong>Subir Archivos:</strong>
                        </label>
                        <input
                            type="file"
                            multiple
                            onChange={(event) => handleFileUpload(event, section)}
                        />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <label>
                            <strong>Subir Carpeta:</strong>
                        </label>
                        <input
                            type="file"
                            webkitdirectory="true"
                            onChange={(event) => handleFolderUpload(event, section)}
                        />
                    </div>

                    <div>
                        <h3>Estructura de Carpetas:</h3>
                        {filesData[section]?.length > 0 ? (
                            renderTree(filesData[section], section)
                        ) : (
                            <p>No hay archivos ni carpetas subidos en esta sección.</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Upload;
