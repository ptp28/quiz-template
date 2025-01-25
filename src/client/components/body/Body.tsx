import {Typography} from "@mui/material";
import React, {ReactNode} from "react";
import Box from "@mui/material/Box";

interface BodyProps {
    title: string,
    icon?: ReactNode,
    children?: React.ReactNode,
}

export default function Body(props: BodyProps) {

    return (
        <>
            <Typography typography={'h5'} color="textPrimary" display="inline-flex" alignItems="center">
                {props.icon && props.icon}
                &nbsp;&nbsp;{props.title}
            </Typography>
            <Box
                sx={{
                    margin: "0 auto",
                    paddingY: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                {props.children}
            </Box>
        </>
    );
}