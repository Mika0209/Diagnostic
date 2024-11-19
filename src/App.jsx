import { useState, useEffect } from 'react';
import './App.css';
import debounce from 'lodash.debounce';
import Character from './Components/Character';

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
        className='search'
      />
      <div className="character-list">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map(character => (
            <Character key={character._id}
            character={character}/>
                      ))
        ) : (
          <p>No se encontraron personajes.</p>
        )}
      </div>
    </div>
  );
}

export default App;