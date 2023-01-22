import React from "react";
import styled from "styled-components";
import Button from "./styled/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    :hover {
        box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.2);
    }
`;

function Product(props) {
    const item = props.product;
    const [numItemsOnCart, setItemOnCart] = useState(0);
    const navigate = useNavigate()

    const addToCartHandler = () => {
        setItemOnCart((prevState) => {
            return (prevState += 1);
        });
    };

    return (
        <Wrapper
            onClick={() => {
                navigate(`product/${item.id}`)
            }}
        >
            <img
                style={{
                    height: 200,
                }}
                src={item.image}
                alt="bag"
            />
            <div
                style={{
                    fontSize: 25,
                    fontWeight: 700,
                    marginBottom: 10,
                }}
            >
                {item.title}
            </div>
            <div>{item.description}</div>
            <div
                style={{
                    color: "red",
                    marginTop: 10,
                    marginBottom: 10,
                }}
            >
                ${item.price}
            </div>
            <div>Stock: {item.stock}</div>
            <div>Stock left: {item.stock - numItemsOnCart}</div>

            <Button
                disabled={item.stock === numItemsOnCart}
                onClick={addToCartHandler}
                greaterThanFive={numItemsOnCart > 5}
            >
                {item.stock === numItemsOnCart
                    ? "No Stock Left"
                    : "Add to Cart"}
            </Button>
        </Wrapper>
    );
}

// default export
export default Product;
