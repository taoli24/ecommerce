// import Product from './components/Product';
import { ProductList } from "./components/ProductList";
// import { ProductListClass } from './components/ProductListClass';
import ProductInfo from "./components/ProductInfo";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import NavBar from "./components/MUI/NavBar";
import Login from "./components/Login";
import { useState } from "react";
import { GlobalContext } from "./components/utils/globalStateContext";
import { useReducer } from "react";
import { useEffect } from "react";
import globalReducer from "./components/reducers/globalReducer";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Outlet
} from "react-router-dom";

function App() {
    const initialState = {
        loggedInUserName: "",
        token: "",
    };

    const [store, dispatch] = useReducer(globalReducer, initialState);

    useEffect(() => {
        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");

        if (token && username) {
            dispatch({
                type: "setUser",
                data: username,
            });

            dispatch({
                type: "setToken",
                data: token,
            });
        }
    }, []);

    // Component did mount and component did update
    // useEffect(() => {
    //   console.log("UseEffect")
    // })

    // Only activate when component mounted
    // useEffect(() => {
    //   // dependency list is empty, therefore this side effect will only execute when component mount
    //   console.log("Only when mounted.")
    // }, [])

    return (
        <>
            <div className="App">
                <GlobalContext.Provider value={{ store, dispatch }}>
                    <RouterProvider router={router} />
                </GlobalContext.Provider>
            </div>
        </>
    );
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainPage />}>
            <Route path="login" element={<Login />} />
            <Route path="product/add" element={<AddProduct />} />
            <Route path="cart" element={<Cart />} />
        </Route>
    )
);

function MainPage() {
    const [selectedItem, setSelectedItem] = useState(null);

    const setItem = (item) => {
        setSelectedItem(item);
    };
    return (
        <>
            <NavBar />
            <Outlet />
            {/* <Login />
            <ProductList onSelected={setItem} />
            {selectedItem == null ? (
                "No item selected"
            ) : (
                <ProductInfo item={selectedItem} />
            )}
            <AddProduct></AddProduct>
            <Cart /> */}
        </>
    );
}

export default App;
