
import React, { useState } from 'react';

function FormDatePdf() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Enviar datos al servidor con Fetch
    const response = await fetch('http://localhost:3000/formulario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    if (response.ok) {
      // Descargar el PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'formulario.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nombre:</label>
      <input type="text" id="name" value={name} onChange={event => setName(event.target.value)} />
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" value={email} onChange={event => setEmail(event.target.value)} />
      <label htmlFor="message">Mensaje:</label>
      <textarea id="message" value={message} onChange={event => setMessage(event.target.value)}></textarea>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default FormDatePdf;
