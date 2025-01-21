import Body from "./Body.tsx";
import HomeIcon from '@mui/icons-material/Home';

export default function HomeBody() {

    const title = "HOME";

    return (
        <Body icon={<HomeIcon/>} title={title}>
            <></>
        </Body>
    );
}