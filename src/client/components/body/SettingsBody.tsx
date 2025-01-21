import Body from "./Body.tsx";
import SettingsIcon from '@mui/icons-material/Settings';
import Stack from '@mui/material/Stack';
import {Card, Switch, Typography} from "@mui/material";
import {useAppState} from "../../context.tsx";


export default function LogoutBody() {

    const title = "Settings";

    const { state, dispatch } = useAppState();

    const { darkMode } = state;

    const toggleDarkMode = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "TOGGLE_DARK_MODE", payload: event.target.checked });
    };

    return (
        <Body icon={<SettingsIcon/>} title={title}>
            <Stack direction="column" spacing={2}>
                <Card
                    sx={{
                        padding: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                    }}
                >
                    <Typography>Dark Mode : </Typography>
                    <Switch
                        checked={darkMode}
                        onChange={toggleDarkMode}
                    />
                </Card>
            </Stack>
        </Body>
    );
}