import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { QuestionDataType } from "../../../services/QuestionDataType.ts";

interface QuestionProps {
    questionNumber: number;
    questionData: QuestionDataType['question'];
}

export default function Question(props: QuestionProps) {

    return (
        <Grid size={{ xs: 12 }}>
            <Typography variant="h5" gutterBottom>
                {props.questionData.text}
            </Typography>
            {
                (props.questionData.imageURL != undefined) &&
                <Box display="flex" justifyContent="center" my={2}>
                    <Box
                        component="img"
                        src={props.questionData.imageURL}
                        alt={props.questionData.imageAlt}
                        sx={{
                            maxWidth: '100%',
                            maxHeight: 400,
                            objectFit: 'contain',
                        }}
                    />
                </Box>}
        </Grid>
    );
}