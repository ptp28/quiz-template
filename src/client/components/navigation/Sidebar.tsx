import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {MenuItemType} from "./MenuItems.tsx";

interface SidebarProps {
    menuItems: MenuItemType[][];
    setBodyComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

export default function Sidebar(props: SidebarProps): JSX.Element {
    return (
        <div>
            <Toolbar/>
            {props.menuItems.map((menuSection: MenuItemType[], sectionIndex) => (
                <div key={sectionIndex}>
                    <List key={sectionIndex}>
                        {menuSection.map((menuItem, itemIndex) => (
                            <ListItem key={itemIndex} disablePadding>
                                <ListItemButton onClick={() => {
                                    props.setBodyComponent(menuItem.component);
                                }}>
                                    <ListItemIcon>
                                        {menuItem.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={menuItem.name}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    {(props.menuItems.length - 1 != sectionIndex) && <Divider/>}
                </div>
            ))}
        </div>
    )
}