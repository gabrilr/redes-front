import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Form = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    iluminosidad: '',
    humedad_suelo: '',
    humedad_aire: '',
    temp: '',
  });

  useEffect(() => {
    if (id) {
      fetch(`https://redes-back-ohrk.onrender.com/cultivos/${id}`)
        .then((response) => response.json())
        .then((data) => setFormData(data))
        .catch((error) => console.error('Error fetching cultivo:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };
    const url = id
      ? `https://redes-back-ohrk.onrender.com/cultivos/${id}`
      : 'https://redes-back-ohrk.onrender.com/cultivos';
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      // Si la solicitud fue exitosa, redirige a Home
      navigate('/home');
    } else {
      console.error('Error al actualizar o registrar cultivo');
    }
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold">{id ? 'Editar' : 'Registrar'} Cultivo</h1>
      {['nombre', 'iluminosidad', 'humedad_suelo', 'humedad_aire', 'temp'].map((field) => (
        <div className="mt-4" key={field}>
          <label className="capitalize">{field.replace('_', ' ')}</label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="border w-full p-2"
          />
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
        {id ? 'Actualizar' : 'Registrar'}
      </button>
    </form>
  );
};

export default Form;
