import PropTypes from "prop-types";

function Character ({character}) {
    return (
        <>
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
        </>
        
    )
}
Character.propTypes={
  character:PropTypes.shape().isRequired,
} 
export default Character;