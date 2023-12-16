import React, { useState, useEffect } from "react";

const Question = ({
  question,
  onAnswer,
  categorySelect,
  changeQuestion,
  lastAnswerCorrect,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(45);

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      // Lógica para manejar el tiempo agotado
      handleAnswer(false);
    }
  }, [timer]);

  const handleAnswer = () => {
    // Verifica si la respuesta seleccionada es la correcta
    const isCorrect = selectedAnswer === question.correctAnswer;

    // Ajusta la puntuación según sea necesario
    if (isCorrect) {
      onAnswer(true); // Llama a la función onAnswer con true para indicar una respuesta correcta
    } else {
      onAnswer(false); // Llama a la función onAnswer con false para indicar una respuesta incorrecta
      console.log("Respuesta incorrecta. Se restaron 10 puntos.");
    }

    // Restablece el estado según sea necesario
    setTimer(45);
    setSelectedAnswer(null);
    categorySelect(); // Lógica para cambiar de categoría después de responder
    changeQuestion(); // Lógica para cambiar de pregunta después de responder
  };

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  useEffect(() => {
    if (lastAnswerCorrect !== null) {
      // Muestra la respuesta correcta después de responder
      setSelectedAnswer(question.correctAnswer);
      const timeout = setTimeout(() => {
        categorySelect();
        handleAnswer(lastAnswerCorrect);
        setSelectedAnswer(null); // Restablece la respuesta seleccionada
      }, 2000); // Cambia la categoría después de 2 segundos (ajusta según sea necesario)
      return () => clearTimeout(timeout);
    }
  }, [ question.correctAnswer, categorySelect]);

  return (
    <div>
      <h2>{question.question.text}</h2>
      <p>{`Time remaining: ${timer}s`}</p>
      <div>
  {question.type === "text_choice" && (
    <div>
      {question.incorrectAnswers.map((question, index) => (
        <button
          key={index}
          onClick={() => handleSelectAnswer(question)}
          className={`choice-button ${selectedAnswer === question ? "selected" : ""}`}
        >
          {question}
        </button>
      ))}
      <button
        key={question.correctAnswer}
        onClick={() => handleSelectAnswer(question.correctAnswer)}
        className={`choice-button ${selectedAnswer === question.correctAnswer ? "selected" : ""}`}
      >
        {question.correctAnswer}
      </button>
    </div>
  )}
  {/* Agrega más lógica para otros tipos de preguntas si es necesario */}
</div>

        <button
          onClick={categorySelect}
        
     
        >
          Submit Answer
        </button>
        <button
          onClick={changeQuestion}
      
   
        >
          Change Question
        </button>
      </div>

  );
};

export default Question;
