import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import QuizIcon from '@mui/icons-material/Quiz';
import {ReactNode} from "react";
import QuizBody from "../body/QuizBody.tsx";
import LeaderboardBody from "../body/LeaderboardBody.tsx";
import ProfileBody from "../body/ProfileBody.tsx";
import LogoutBody from "../body/LogoutBody.tsx";
import HomeIcon from '@mui/icons-material/Home';
import HomeBody from "../body/HomeBody.tsx";
import SettingsBody from '../body/SettingsBody.tsx';
import SettingsIcon from '@mui/icons-material/Settings';

export type MenuItemType = {
    name: string,
    icon: ReactNode,
    component: ReactNode,
}

export const MenuItems: MenuItemType[][] = [
    [
        {
            name: "Home",
            icon: <HomeIcon/>,
            component: <HomeBody/>
        }
    ],
    [
        {
            name: "Quiz",
            icon: <QuizIcon/>,
            component: <QuizBody/>,
        },
        {
            name: "Leaderboard",
            icon: <LeaderboardIcon/>,
            component: <LeaderboardBody/>,
        },
    ],
    [
        {
            name: "Profile",
            icon: <PersonIcon/>,
            component: <ProfileBody/>,
        },
        {
            name: "Settings",
            icon: <SettingsIcon/>,
            component: <SettingsBody/>,
        },
        {
            name: "Logout",
            icon: <LogoutIcon/>,
            component: <LogoutBody/>,
        },
    ],
];