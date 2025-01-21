import { useState } from 'react';
import { Container, Typography, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material';

const questions = [
  {
    questionText: 'What is the capital of France?',
    answerOptions: [
      { answerText: 'New York', isCorrect: false },
      { answerText: 'London', isCorrect: false },
      { answerText: 'Paris', isCorrect: true },
      { answerText: 'Dublin', isCorrect: false },
    ],
  },
  {
    questionText: 'Who is CEO of Tesla?',
    answerOptions: [
      { answerText: 'Jeff Bezos', isCorrect: false },
      { answerText: 'Elon Musk', isCorrect: true },
      { answerText: 'Bill Gates', isCorrect: false },
      { answerText: 'Tony Stark', isCorrect: false },
    ],
  },
  // Add more questions as needed
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleAnswerOptionClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer('');
    } else {
      setShowScore(true);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Quiz App
      </Typography>
      {showScore ? (
        <Typography variant="h5">
          You scored {score} out of {questions.length}
        </Typography>
      ) : (
        <>
          <Typography variant="h6">
            {questions[currentQuestion].questionText}
          </Typography>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select an answer</FormLabel>
            <RadioGroup
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
            >
              {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                <FormControlLabel
                  key={index}
                  value={answerOption.answerText}
                  control={<Radio />}
                  label={answerOption.answerText}
                  onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </>
      )}
    </Container>
  );
}

export default App;