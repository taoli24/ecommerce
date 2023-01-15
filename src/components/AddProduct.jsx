import Title from "./styled/Title";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const InputWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    width: 40%;
    max-width: 400px;
    margin-bottom: 0.6rem;
`;

function AddProduct() {
    // const [title, setTitle] = useState("")
    // const [description, setDescription] = useState("")

    // use single state to handle state changes
    const [product, setProduct] = useState({
        title: "",
        description: "",
        stock: 1,
        price: 0,
    });

    const [errorMessage, setErrorMessage] = useState(null)

    const addProductHandler = (e) => {
        e.preventDefault();
        console.log(product);

        // Data validation
        if (!product.title) {
            setErrorMessage("Product must have a title.")
        }
        else if (!product.price) {
            setErrorMessage("Product must have a price.")
        }
        else{
            // Send product to Api
            setErrorMessage(null)
            axios.post("/products", product)
            .then(res => res.data)
            .then(json => console.log(json))
        }

    };

    // const titleChangeHandler = (e) => {
    //     setTitle(e.target.value)
    // }

    // const descriptionChangeHandler = (e) => {
    //     setDescription(e.target.value)
    // }

    const formChangeHandler = (e) => {
        const key = e.target.name;

        setProduct((prevState) => {
            return {
                ...prevState,
                [key]: e.target.value,
            };
        });
    };

    return (
        <div id="AddProduct">
            <Title>Add Product</Title>
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                onSubmit={addProductHandler}
            >
                <InputWrapper>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={formChangeHandler}
                    />
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={product.description}
                        onChange={formChangeHandler}
                    />
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="image">Image:</label>
                    <input type="file" name="image" accept=".png .jpg .jpeg" />
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="stock">Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        min="1"
                        value={product.stock}
                        onChange={formChangeHandler}
                    />
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        name="price"
                        inputMode="numeric"
                        pattern="\d*\.?\d*"
                        value={product.value}
                        onChange={formChangeHandler}
                    />
                </InputWrapper>
                <InputWrapper>
                    <div></div>
                    <input type="submit" value="Add Product" />
                </InputWrapper>
                {errorMessage && <div style={{
                    "color": "red"
                }}>{errorMessage}</div>}
            </form>
        </div>
    );
}

export default AddProduct;
