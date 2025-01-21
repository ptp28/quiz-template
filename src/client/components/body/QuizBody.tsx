import Body from "./Body.tsx";
import QuizIcon from "@mui/icons-material/Quiz";
import Grid from '@mui/material/Grid2';
import {Card, Typography} from "@mui/material";
import QuestionSection from "./quiz/QuestionSection.tsx";
import AnswerSection from "./quiz/AnswerSection.tsx";
import {useEffect, useState} from "react";
import questionService from "../../../services/FileQuestionProvider.ts";
import {QuestionDataType} from "../../../services/QuestionDataType.ts";
import FeedbackSection from "./quiz/FeedbackSection.tsx";


export default function QuizBody() {

    const title = "QUIZ";

    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [questionData, setQuestionData] = useState<QuestionDataType | null>(null);
    const [feedbackData, setFeedbackData] = useState<string | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const initializeQuiz = async () => {
            try {
                const index = questionService.getCurrentQuestionIndex();
                if (questionService.getNumQuestions() === 0) {
                    setIsError(true);
                    return;
                }
                setCurrentQuestionIndex(index);
                await loadNextQuestion();
            } catch (error) {
                setIsError(true);
                console.error("Error loading questions:", error);
            }
        };
        initializeQuiz();
    }, []);

    const loadNextQuestion = async () => {
        setIsLoading(true);
        const nextQuestion = await questionService.getNextQuestion();
        if (nextQuestion) {
            setQuestionData(nextQuestion);
            setCurrentQuestionIndex(questionService.getCurrentQuestionIndex());
        } else {
            setIsFinished(questionService.getCurrentQuestionIndex() === questionService.getNumQuestions());
        }
        setIsLoading(false);
    };

    const onAnswerSelection = async (selectedAnswer: string) => {
        const isCorrect = await questionService.checkAnswer(selectedAnswer);
        if (isCorrect) {
            setFeedbackData(questionService.getFeedbackData(currentQuestionIndex));
        } else {
            alert("Your answer is incorrect!");
        }
        setScore(questionService.getScore());
    };

    const dismissFeedback = async () => {
        setFeedbackData(null);
        await loadNextQuestion();
    }

    const renderContent = () => {

        if (isError) {
            return "Unable to fetch questions right now...";
        }
        if (isLoading) {
            return "Loading Questions....";
        }
        if (isFinished) {
            return `Score: ${score} / ${questionService.getNumQuestions()}`;
        }
        if (!questionData) {
            return "No question found.";
        }
        if (feedbackData != null) {
            return <FeedbackSection
                questionNumber={currentQuestionIndex + 1}
                feedback={feedbackData}
                dismissFeedback={dismissFeedback}/>;
        }

        return (
            <>
                <Typography variant="h6">
                    Question {currentQuestionIndex + 1}
                </Typography>
                <Card sx={{
                    padding: "20px",
                    alignItems: "center",
                    gap: "20px",
                }}
                >
                    <Grid container spacing={5}>
                        <QuestionSection
                            questionNumber={currentQuestionIndex}
                            questionData={questionData.question}/>
                        <AnswerSection
                            questionNumber={currentQuestionIndex}
                            answerData={questionData.answer}
                            onAnswerSelection={onAnswerSelection}/>
                    </Grid>
                </Card>
            </>
        );

    };

    return (
        <Body icon={<QuizIcon/>} title={title}>
            {renderContent()}
        </Body>)
        ;
}