import { AppBar, Container, Toolbar, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useGlobalContext } from "../utils/globalStateContext";
import { Link, useNavigate } from "react-router-dom";

// const pages = ["Product", "Add Product", "Cart"];

const pages = [
    {
        title: "Products",
        linkto: "/",
    },
    {
        title: "Add Product",
        linkto: "products/add",
    },
    {
        title: "Cart",
        linkto: "cart",
    },
];

function NavBar() {
    const { store, dispatch } = useGlobalContext();
    const navigate = useNavigate()

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: "flex" }}>
                        {pages.map((page) => {
                            return (
                                <Link
                                    key={page.title}
                                    style={{ textDecoration: "none" }}
                                    to={page.linkto}
                                >
                                    <Button
                                        key={page.title}
                                        sx={{
                                            my: 2,
                                            color: "white",
                                            display: "block",
                                        }}
                                    >
                                        {page.title}
                                    </Button>
                                </Link>
                            );
                        })}
                    </Box>
                    {store.loggedInUserName}
                    {store.loggedInUserName ? (
                        <button
                            onClick={() => {
                                dispatch({
                                    type: "setUser",
                                    data: "",
                                });
                                dispatch({
                                    type: "setToken",
                                    data: "",
                                });
                            }}
                        >
                            Logout
                        </button>
                    ) : (
                        <button onClick={() => {
                            navigate("login")
                        }}>Login</button>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;
