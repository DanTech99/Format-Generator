import {React, useState} from 'react'

function GenerateExcel() {
    const [name, setName] = useState('');
    const [ email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // enviar los datos del formulario al servidor
      const response = await fetch('http://localhost:3001/form-generate-excel', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email})
        });

        // obtener el archivo como una respuesta binaria
        const blob = await response.blob();

        // Crear una URL del objeto blob
        const url = URL.createObjectURL(blob);

        // Crear un enlace para descargar el archivo
        const link = document.createElement('a');
        link.href = url;
        link.download = 'form_data.xlsx';
        document.body.appendChild(link);
        link.click()
    }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" value={name} onChange={event => setName(event.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={event => setEmail(event.target.value)} />
      </label>
      <br />
      <button type="submit">Enviar</button>
    </form>
  )
}

export default GenerateExcel