import { Box } from "@mui/material";

const Main = ({children}) => {
    return (
        <Box sx={{minHeight: "calc(90vh - 100px)"}}>
            {children}
        </Box>
    );
}

export default Main;