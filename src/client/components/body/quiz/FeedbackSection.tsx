import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import {Card, Typography} from "@mui/material";

const Item = styled(Button)(({theme}) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    width: '100%',
    height: '100%',
}));


interface FeedbackSectionProps {
    questionNumber: number;
    feedback: string;
    dismissFeedback: () => void;
}

export default function FeedbackSection(props: FeedbackSectionProps) {
    return (
        <>
            <Typography variant="h6">
                Question {props.questionNumber}
            </Typography>
            <Card sx={{
                padding: "20px",
                alignItems: "center",
                gap: "20px",
            }}
            >
                <Typography variant="h6" dangerouslySetInnerHTML={{ __html: props.feedback }} />
                <Item
                    variant="contained"
                    disableElevation
                    onClick={props.dismissFeedback}
                >
                    Proceed
                </Item>
            </Card>
        </>
    );
}
