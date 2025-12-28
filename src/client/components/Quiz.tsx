import Grid from '@mui/material/Grid2';
import { Card, Typography, Box, CircularProgress, Divider, LinearProgress, Button, Fade, CardContent } from "@mui/material";
import Question from "./quiz/Question.tsx";
import Answer from "./quiz/Answer.tsx";
import QuizComplete from "./quiz/QuizComplete.tsx";
import { useQuiz } from "../hooks/useQuiz.ts";

export default function Quiz() {

    const {
        isLoading,
        isError,
        isFinished,
        questionData,
        currentQuestionIndex,
        totalQuestions,
        score,
        isIncorrect,
        isHintRevealed,
        submitAnswer,
        revealHint,
        resetQuiz
    } = useQuiz();

    const renderContent = () => {

        if (isError) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Typography color="error">Unable to fetch questions right now...</Typography>
                </Box>
            );
        }
        if (isLoading) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                </Box>
            );
        }
        if (isFinished) {
            return <QuizComplete
                currentScore={score}
                totalScore={totalQuestions * 5}
                onResetQuizClick={resetQuiz} />;
        }
        if (!questionData) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Typography>No question found.</Typography>
                </Box>
            );
        }

        const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
        const hasHint = !!questionData.hint;

        return (
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 3 }} sx={{ order: { xs: 1, md: 2 } }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 6, md: 12 }}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" color="primary" gutterBottom>
                                        Progress
                                    </Typography>
                                    <LinearProgress variant="determinate" value={progress} sx={{ my: 2 }} />
                                    <Box display="flex" justifyContent="space-between" alignItems="baseline">
                                        <Typography variant="body2" color="text.secondary">
                                            Question
                                        </Typography>
                                        <Typography variant="h6">
                                            {currentQuestionIndex + 1} <Typography component="span" variant="body2" color="text.secondary">/ {totalQuestions}</Typography>
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 6, md: 12 }}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Score
                                    </Typography>
                                    <Typography variant="h3" color="secondary">
                                        {score}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Fade in={hasHint} unmountOnExit>
                            <Grid size={{ xs: 12 }}>
                                <Card sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                        {isHintRevealed ? (
                                            <Typography variant="body1">
                                                {questionData.hint}
                                            </Typography>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                onClick={revealHint}
                                                fullWidth
                                            >
                                                Reveal Hint
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Fade>
                    </Grid>
                </Grid>
                <Grid size={{ xs: 12, md: 9 }} sx={{ order: { xs: 2, md: 1 } }}>
                    <Card sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Question {currentQuestionIndex + 1}
                            </Typography>
                            <Question
                                questionNumber={currentQuestionIndex}
                                questionData={questionData.question} />
                        </CardContent>
                        <Divider />
                        <CardContent>
                            <Answer
                                questionNumber={currentQuestionIndex}
                                answerData={questionData.answer}
                                onAnswerSelection={submitAnswer}
                                isIncorrect={isIncorrect}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );

    };

    return (
        <Box sx={{ width: '100%', py: 2 }}>
            {renderContent()}
        </Box>
    );
}