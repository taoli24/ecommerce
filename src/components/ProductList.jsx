import React from "react";
import { CircularProgress, Box } from "@mui/material";
import styled from "styled-components";
import Product from "./Product";
import Title from "./styled/Title";
import GridBox from "./styled/GridBox";
// import { useEffect, useState } from "react";
// import axios from "axios";
import { useApi } from "./utils/useApi";

const CustomGrid = styled(GridBox)`
    padding: 30px;
`;

function ProductList(props) {
    // const [items, setItems] = useState([]);
    // const [isLoading, setIsloading] = useState(true);

    // useEffect(() => {
    //     // Fetch from fakestore api
    //     // fetch("https://fakestoreapi.com/products?limit=9")
    //     //     .then((response) => {
    //     //         return response.json();
    //     //     })
    //     //     .then((data) => {
    //     //         const newItems = data.map((product) => {
    //     //             product.stock = 10;
    //     //             return product;
    //     //         });

    //     //         setItems(newItems);
    //     //         setIsloading(false);
    //     //     });

    //     // axio is better with base url setted
    //     axios
    //         .get("/products?limit=9")
    //         .then((res) => res.data)
    //         .then((data) => {
    //             console.log(data);

    //             const newItems = data.map((item) => {
    //                 item.stock = 10;
    //                 return item;
    //             });

    //             setItems(newItems);
    //             setIsloading(false);
    //         });
    // }, []);

    let [isLoading, data] = useApi("/products?limit=9")

    const items = data.map(item => {
        item.stock = 5
        return item
    })

    return (
        <>
            {isLoading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                    }}
                >
                    <CircularProgress></CircularProgress>
                </Box>
            ) : (
                <div id="Product">
                    <Title>Products</Title>
                    <CustomGrid>
                        {/* map create new array to put here */}
                        {items.map((item) => (
                            <Product
                                key={item.id}
                                product={item}
                                onSelected={props.onSelected}
                            />
                        ))}
                    </CustomGrid>
                </div>
            )}
        </>
    );
}

// named export
export { ProductList };
