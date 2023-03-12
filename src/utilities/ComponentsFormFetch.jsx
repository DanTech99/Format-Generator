

import React, { useState } from 'react';

const Formulario = () => {

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => console.log(data));

  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Nombre" onChange={handleChange} /> <br /> <br />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} /> <br /> <br />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} /> <br /> <br />

      <button type="submit">Enviar</button>

    </form>

  );
};

 export default Formulario;



 function App() {
  const [formData, setFormData] = useState({});
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/form-data', formData)
      .then((response) => {
        console.log(response.data);
        formRef.current.reset(); // resetear el formulario
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <label>
        Name:
        <input type="text" name="name" onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
       //mantener el input de date actualizado con la fecha actual
      //  const [fechaActual, setFechaActual] = useState('');
      //  useEffect(() => {
      //    const fecha = new Date().toISOString().substr(0, 10);
      //    setFechaActual(fecha)
      //  }, [])