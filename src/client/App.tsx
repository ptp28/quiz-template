import { useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Container, AppBar, Toolbar, Typography, useMediaQuery, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Quiz from './components/Quiz.tsx';

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');

    useEffect(() => {
        setMode(prefersDarkMode ? 'dark' : 'light');
    }, [prefersDarkMode]);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        main: mode === 'dark' ? '#288BE4' : '#091F2F'
                    },
                    secondary: {
                        main: mode === 'dark' ? '#FB4D42' : '#A51C30'
                    },
                },
            }),
        [mode],
    );

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Quiz Template
                        </Typography>
                        <IconButton onClick={toggleColorMode} color="inherit">
                            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg" sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    py: { xs: 2, md: 4 }
                }}>
                    <Quiz />
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;