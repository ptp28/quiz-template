import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import {QuestionDataType} from "../../../../services/QuestionDataType.ts";

interface QuestionSectionProps {
    questionNumber: number;
    questionData: QuestionDataType['question'];
}

export default function QuestionSection(props: QuestionSectionProps) {

    return (
        <Grid size={{xs: 12}}>
            <Typography sx={{marginY: 1}}>
                {props.questionData.text}
            </Typography>
            {
                (props.questionData.imageURL != undefined) &&
                <Box
                    component="img"
                    sx={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        display: 'block',
                        border: '1px solid',
                        height: 250,
                        objectFit: 'fill',
                    }}
                    src={props.questionData.imageURL}
                    alt={props.questionData.imageAlt}
                />}
        </Grid>
    );
}