import { Box, Typography, Button, Card, CardContent, Stack, CircularProgress, CardHeader, Avatar } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ReplayIcon from '@mui/icons-material/Replay';

interface QuizCompleteProps {
    currentScore: number;
    totalScore: number;
    onResetQuizClick: () => void;
}

export default function QuizComplete({ currentScore, totalScore, onResetQuizClick }: QuizCompleteProps) {
    const percentage = Math.max(0, Math.min(100, (currentScore / totalScore) * 100));

    return (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" py={4}>
            <Card sx={{ maxWidth: 400, width: '100%', textAlign: 'center' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                            <EmojiEventsIcon />
                        </Avatar>
                    }
                    title={<Typography variant="h5">Quiz Complete!</Typography>}
                    subheader="Great job on finishing the quiz!"
                />
                <CardContent>
                    <Stack spacing={3} alignItems="center">
                        <Box position="relative" display="inline-flex">
                            <CircularProgress
                                variant="determinate"
                                value={percentage}
                                size={80}
                            />
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography variant="caption" component="div" color="text.secondary">
                                    {`${Math.round(percentage)}%`}
                                </Typography>
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="h6">
                                Your Final Score: {currentScore}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                out of {totalScore} possible points
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            startIcon={<ReplayIcon />}
                            onClick={onResetQuizClick}
                            fullWidth
                        >
                            Try Again
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
