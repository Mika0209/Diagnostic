import { useState, useEffect } from 'react';
import './App.css';
import debounce from 'lodash.debounce';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Función para obtener los personajes
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://api.disneyapi.dev/character');
        const data = await response.json();
        setCharacters(data.data);
      } catch (error) {
        console.error("Error al obtener los personajes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // Crear una función debounced para manejar cambios en la búsqueda
  const handleSearchChange = debounce((value) => {
    setSearch(value);
  }, 1000); // 1 segundo de retraso

  // Mostrar cargando si estamos en estado de carga
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Filtrar personajes por nombre basado en la búsqueda
  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ color: 'black', textAlign: 'center' }}>Personajes de Disney</h1>
      <input
        type="text"
        placeholder="Buscar"
        onChange={(e) => handleSearchChange(e.target.value)} // Manejador del evento onChange
        style={{
          padding: '10px',
          width: '300px',
          margin: '20px auto',
          display: 'block',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
      <div className="character-list">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map(character => (
            <div key={character._id} className="character-card">
              <div className="image-container">
                <h2 style={{ fontWeight: 'bold', color: 'black', top: '10px', left: '10px'}}>
                  {character.name}
                </h2>
                {character.imageUrl && (
                  <a href={character.sourceUrl} target="_blank">
                    <img src={character.imageUrl} alt={character.name} />
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron personajes.</p>
        )}
      </div>
    </div>
  );
}

export default App;