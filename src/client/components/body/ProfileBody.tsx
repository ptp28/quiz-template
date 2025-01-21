import Body from "./Body.tsx";
import PersonIcon from '@mui/icons-material/Person';
import {Avatar, Box, Card, Typography, Stack, Divider} from "@mui/material";

export default function ProfileBody() {
    const title = "PROFILE";

    const name = "John Doe";
    const email = "john.doe@mail.com";

    return (
        <Body icon={<PersonIcon/>} title={title}>
            <Card
                sx={{
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                <Avatar
                    sx={{width: 80, height: 80}}
                    alt={name}
                />
                <Box>
                    <Typography variant="h5" fontWeight="bold">
                        {name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {email}
                    </Typography>
                </Box>
            </Card>

            <Card sx={{padding: "20px"}}>
                <Typography variant="h6" gutterBottom>
                    Account Activity
                </Typography>
                <Stack direction="row" justifyContent="space-around" spacing={2}>
                    <Box>
                        <Typography variant="body2" color="textSecondary">
                            High Score
                        </Typography>
                        <Typography variant="h6">120</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem/>
                    <Box>
                        <Typography variant="body2" color="textSecondary">
                            Last Played
                        </Typography>
                        <Typography variant="h6">01/01/2025</Typography>
                    </Box>
                </Stack>
            </Card>

            <Card sx={{padding: "20px"}}>
                <Typography variant="h6" gutterBottom>
                    About
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Hi, I'm John! A software developer passionate about creating
                    user-friendly web applications. I love exploring new technologies and
                    sharing knowledge with others.
                </Typography>
            </Card>
        </Body>
    );
}