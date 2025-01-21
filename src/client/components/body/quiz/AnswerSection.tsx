import Grid from "@mui/material/Grid2";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {useState} from "react";
import {QuestionDataType} from "../../../../services/QuestionDataType.ts";

const Item = styled(Button)(({theme}) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    width: '100%',
    height: '100%',
}));


interface AnswerSectionProps {
    questionNumber: number;
    answerData: QuestionDataType['answer'];
    onAnswerSelection: (selectedAnswer: string) => void;
}

export default function AnswerSection(props: AnswerSectionProps) {

    const [selectedAnswer, setSelectedAnswer] = useState('');

    const checkAnswer = (answer: string) => {
        console.log(answer);
        props.onAnswerSelection(answer);
        setSelectedAnswer('');
    }

    if (props.answerData.options) {
        return (
            <Grid size={{xs: 12}}>
                <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    {
                        props.answerData.options.map((option, index) => (
                            <Grid size={{xs: 12, sm: 12, md: 6}} key={index}>
                                <Item
                                    variant="contained"
                                    disableElevation
                                    onClick={() => checkAnswer(option)}
                                >
                                    {option}
                                </Item>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        );
    } else {
        return (
            <Grid size={{xs: 12}}>
                <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid size={{xs: 12, sm: 8}}>
                        <TextField
                            sx={{width: '100%'}}
                            label="Answer"
                            variant="outlined"
                            value={selectedAnswer}
                            onChange={(e) => {
                                setSelectedAnswer(e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid size={{xs: 12, sm: 4}}>
                        <Item
                            variant="contained"
                            disableElevation
                            onClick={() => checkAnswer(selectedAnswer)}
                        >
                            Submit
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

}