const apiUrl = 'https://the-trivia-api.com/v2/questions';

const fetchQuestions = async () => {
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Error de red: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener preguntas:', error.message);
    throw error;
  }
};

export default fetchQuestions;
