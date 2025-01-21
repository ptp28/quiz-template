import Body from "./Body.tsx";
import LogoutIcon from '@mui/icons-material/Logout';

export default function LogoutBody() {

    const title = "LOGOUT";

    return (
        <Body icon={<LogoutIcon/>} title={title}>
            <></>
        </Body>
    );
}