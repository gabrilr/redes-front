import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [cultivos, setCultivos] = useState([]);

  const fetchCultivos = async () => {
    const response = await fetch('https://redes-back-ohrk.onrender.com/cultivos/');
    if (response.ok) {
      const data = await response.json();
      setCultivos(data);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este cultivo?')) {
      const response = await fetch(`https://redes-back-ohrk.onrender.com/cultivos/${id}`, { method: 'DELETE' });
      
      if (response.ok) {
        // Actualizar el estado eliminando el cultivo de la lista localmente
        setCultivos(cultivos.filter((cultivo) => cultivo.id !== id));
        fetchCultivos();
      } else {
        console.error('Error al eliminar cultivo');
      }
    }
  };

  useEffect(() => {
    fetchCultivos();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lista de Cultivos</h1>
        <div className="flex space-x-4">
          <Link
            to="/create"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Registrar Cultivo
          </Link>
          <Link
            to="/register-user"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Registrar Usuario
          </Link>
          <Link
            to="/"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => {
              localStorage.removeItem('authToken');
              localStorage.removeItem('typeUser');
            }}
          >
            Cerrar Sesion
          </Link>
        </div>
      </div>
      <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Iluminación Óptima</th>
            <th className="border px-4 py-2">Humedad del Suelo</th>
            <th className="border px-4 py-2">Humedad del Aire</th>
            <th className="border px-4 py-2">Temperatura Óptima</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cultivos.map(({ id, nombre, iluminosidad, humedad_suelo, humedad_aire, temp }) => (
            <tr key={id}>
              <td className="border px-4 py-2">{nombre}</td>
              <td className="border px-4 py-2">{iluminosidad}</td>
              <td className="border px-4 py-2">{humedad_suelo}</td>
              <td className="border px-4 py-2">{humedad_aire}</td>
              <td className="border px-4 py-2">{temp}</td>
              <td className="border px-4 py-2">
                <Link to={`/edit/${id}`} className="text-blue-500">
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(id)}
                  className="text-red-500 ml-4"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
