import React, { useState, useEffect } from 'react';
import Player from './Player';
import Question from './Question';
import { categories, question } from './data'; // Importa las categorías y preguntas de data.js
import fetchQuestions from './questionApi';  // Importa la función fetchQuestions

const App = () => {
  const [players, setPlayers] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [score, setScore] = useState(0);
  const [winner, setWinner] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [timer, setTimer] = useState(45);

  useEffect(() => {
    fetchQuestionsFromApi();
  
    let interval;
  
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
  
    // Limpia el intervalo cuando el componente se desmonta o cuando el timer llega a 0
    return () => clearInterval(interval);
  }, [timer]);
  

  const changeQuestion = (question) => {
    // Lógica para seleccionar una nueva pregunta en la categoría proporcionada
    handleCategorySelect(question.categories);
  };

  const fetchQuestionsFromApi = async () => {
    try {
      const data = await fetchQuestions();
      if (data.question && data.question.length > 0) {
        setQuestions(data.question);
      } else {
        console.warn('No hay preguntas disponibles.');
      }

      // Agrega las nuevas preguntas después de obtener las preguntas iniciales
      addAdditionalQuestions();
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const addAdditionalQuestions = () => {
    // Agrega preguntas adicionales si es necesario
  };

  const handleCategorySelect = (category) => {
    const categoryQuestions = question.filter(
      (q) => q.category === category && !q.used
    );

    if (categoryQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
      const selectedQuestion = categoryQuestions[randomIndex];

      setCurrentQuestion(selectedQuestion);
    } else {
      console.warn('No hay más preguntas disponibles en esta categoría.');
    }
  };

  const handleAnswer = (correctAnswer) => {
    if (correctAnswer) {
      setScore(score + 10); // Suma 10 puntos por respuesta correcta
    } else{
      setScore(score - 10); // Resta 10 puntos por respuesta incorrecta
    }

    setCurrentQuestion((question) => ({
      ...question,
      used: true,
    }));

    setCurrentPlayer((player) => (player % players) + 1);
  };

  useEffect(() => {
    if (score >= 50) {
      setWinner(currentPlayer);
    }
  }, [score, currentPlayer]);

  const handlePlayerChange = (event) => {
    setPlayers(Number(event.target.value));
    setCurrentPlayer(1);
    setScore(0);
    setQuestions([]);
    fetchQuestionsFromApi();
  };

  return (
    <div>
      <div>
        <label htmlFor="playerSelect">Número de jugadores:</label>
        <select id="playerSelect" value={players} onChange={handlePlayerChange}>
          <option value={1}>1 Jugador</option>
          <option value={2}>2 Jugadores</option>
        </select>
      </div>

      <div>
        {Object.values(categories).map((category) => (
         <button key={category} onClick={() => currentQuestion === null && handleCategorySelect(category)}>
         {category}
       </button>
       
        ))}
      </div>

      {winner ? (
        <div>{`¡El jugador ${winner} es el ganador!`}</div>
      ) : (
        <div>
          <h1>Trivia App</h1>
          <Player players={players} currentPlayer={currentPlayer} score={score} />
          {currentQuestion ? (
            <Question
              question={currentQuestion}
              onAnswer={handleAnswer}
              categorySelect={handleCategorySelect}  // Pasa la función directamente
              changeQuestion={changeQuestion}
            />
          ) : (
            <p>Elija una categoría para comenzar</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
