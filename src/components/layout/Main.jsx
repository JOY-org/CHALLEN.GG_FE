import { Box } from "@mui/material";

const Main = ({children}) => {
    return (
        <Box sx={{minHeight: "calc(90vh - 106px)"}}>
            {children}
        </Box>
    );
}

export default Main;