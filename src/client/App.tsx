import NavigationArea from "./components/navigation/NavigationArea.tsx";
import Sidebar from "./components/navigation/Sidebar.tsx";
import {MenuItems} from "./components/navigation/MenuItems.tsx";
import * as React from "react";
import HomeBody from "./components/body/HomeBody.tsx";
import {ThemeProvider, createTheme, CssBaseline} from "@mui/material";
import {useAppState} from "./context.tsx";


const App = () => {

    const [bodyComponent, setBodyComponent] = React.useState<React.ReactNode>(<HomeBody/>);
    const title = "TreasureQuest";

    const {state} = useAppState();

    const {darkMode} = state;

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: darkMode ? '#288BE4' : '#091F2F'
            },
            secondary: {
                main: darkMode ? '#FB4D42' : '#A51C30'
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <NavigationArea
                title={title}
                sidebarComponent={<Sidebar menuItems={MenuItems} setBodyComponent={setBodyComponent}/>}
                bodyComponent={bodyComponent}
            />
        </ThemeProvider>
    )
}

export default App;