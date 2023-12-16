import React, { useEffect } from 'react';

const Player = ({ currentPlayer, score, lastAnswerCorrect }) => {
  const pointsChange = lastAnswerCorrect ? 10 : -10;

  useEffect(() => {

    console.log(`Puntuación actualizada: ${score}`);
  }, [score]);

  return (
    <div>
      <h2>{`Jugador ${currentPlayer}`}</h2>
      <p>{`Puntuación: ${score} ${pointsChange !== 0 ? `(${pointsChange > 0 ? '+' : ''}${pointsChange})` : ''}`}</p>
    </div>
  );
};

export default Player;

