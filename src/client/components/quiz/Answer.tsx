import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import { TextField, Stack, Fade, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { QuestionDataType } from "../../../services/QuestionDataType.ts";


interface AnswerProps {
    questionNumber: number;
    answerData: QuestionDataType['answer'];
    onAnswerSelection: (selectedAnswer: string) => void;
    isIncorrect?: boolean;
}

export default function Answer(props: AnswerProps) {

    const [selectedAnswer, setSelectedAnswer] = useState('');

    useEffect(() => {
        setSelectedAnswer('');
    }, [props.questionNumber]);

    const checkAnswer = (answer: string) => {
        props.onAnswerSelection(answer);
    }

    if (props.answerData.options) {
        return (
            <Grid size={{ xs: 12 }}>
                <Grid container spacing={2}>
                    {
                        props.answerData.options.map((option, index) => (
                            <Grid size={{ xs: 12, sm: 6 }} key={index}>
                                <Button
                                    variant="outlined"
                                    color={props.isIncorrect ? "error" : "primary"}
                                    onClick={() => checkAnswer(option)}
                                    fullWidth
                                >
                                    {option}
                                </Button>
                            </Grid>
                        ))
                    }
                </Grid>
                <Fade in={props.isIncorrect}>
                    <Alert severity="error" sx={{ mt: 2 }}>
                        Incorrect answer. Please try again.
                    </Alert>
                </Fade>
            </Grid>
        );
    } else {
        return (
            <Grid size={{ xs: 12 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                        sx={{ flexGrow: 1 }}
                        label="Your Answer"
                        variant="outlined"
                        value={selectedAnswer}
                        error={props.isIncorrect}
                        onChange={(e) => {
                            setSelectedAnswer(e.target.value)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                checkAnswer(selectedAnswer);
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        color={props.isIncorrect ? "error" : "primary"}
                        onClick={() => checkAnswer(selectedAnswer)}
                    >
                        Submit
                    </Button>
                </Stack>
                <Fade in={props.isIncorrect}>
                    <Alert severity="error" sx={{ mt: 2 }}>
                        Incorrect answer. Please try again.
                    </Alert>
                </Fade>
            </Grid>
        );
    }

}