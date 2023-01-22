import { AppBar, Container, Toolbar, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useGlobalContext } from "../utils/globalStateContext";

const pages = ["Product", "Add Product", "Cart"];

function NavBar() {
    const { store, dispatch } = useGlobalContext();

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: "flex" }}>
                        {pages.map((page) => {
                            return (
                                <a
                                    key={page}
                                    style={{ textDecoration: "none" }}
                                    href={`#${page.replace(" ", "")}`}
                                >
                                    <Button
                                        key={page}
                                        sx={{
                                            my: 2,
                                            color: "white",
                                            display: "block",
                                        }}
                                    >
                                        {page}
                                    </Button>
                                </a>
                            );
                        })}
                    </Box>
                    {store.loggedInUserName}
                    {store.loggedInUserName && (
                        <button onClick={() => {
                            dispatch({
                                type: "setUser",
                                data: ""
                            })
                            dispatch({
                                type: "setToken",
                                data: ""
                            })
                        }}>Logout</button>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;
