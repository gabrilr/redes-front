const NotFound = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-100">
        <h1 className="text-4xl font-bold text-red-600">No autorizado</h1>
        <p className="mt-4 text-lg">Lo sentimos, la página a la que intentas acceder no esta disponible.</p>
      </div>
    );
  };
  
  export default NotFound;
  