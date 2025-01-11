import React from 'react';
import './Contacto.css'; // Asegúrate de importar el archivo CSS

function Contacto() {
    return (
        <>
            <div>
                <h1>Contactos</h1>
            </div>
            <div className="contactos-grid">
                <div className="contacto-item">
                    <p>
                        Cargo: Jefe de área:<br />
                        Nombre: Sebastian Ochoa<br />
                        Teléfono: +49 1789834473<br />
                        Correo: 
                    </p>
                </div>
                <div className="contacto-item">
                    <p>
                        Cargo: :<br />
                        Nombre: Hernán Londoño<br />
                        Teléfono: +57 3046199822<br />
                        Correo: comercialaudio@codiscos.com
                    </p>
                </div>
                <div className="contacto-item">
                    <p>
                        Cargo: :<br />
                        Nombre: Diego Gonzales<br />
                        Teléfono: +57 3217821500 <br />
                        Correo: comercialaudio@codiscos.com
                    </p>
                </div>
                <div className="contacto-item">
                    <p>
                        Cargo: :<br />
                        Nombre: David Aguirre<br />
                        Teléfono: +57 3105302224<br />
                        Correo: comercialaudio@codiscos.com
                    </p>
                </div>
            </div>

            <div className="form-container">
                <h2>Contacto</h2>
                <form action="https://formsubmit.co/david.aguirre201@tau.usbmed.edu.co" method="POST">
                    <label htmlFor="nombre">Nombre</label>
                    <input className="form-input" type="text" id="nombre" name="nombre" required />
                    
                    <label htmlFor="email">Correo:</label>
                    <input className="form-input" type="email" id="email" name="email" required />
                    
                    <label htmlFor="mensaje">Mensaje:</label>
                    <textarea className="form-textarea" id="mensaje" name="mensaje" rows="4" required></textarea>
                    
                    <input className="form-btn" type="submit" value="Enviar Comentario" />
                    <input type="hidden" name="_next" value="http://localhost:3000/Contacto" />
                    <input type="hidden" name="_captcha" value="false" />
                </form>
            </div>
        </>
    );
}

export default Contacto;

