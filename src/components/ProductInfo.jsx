import Title from "./styled/Title";
import Product from "./Product";
import Review from "./Review";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function ProductInfo() {
    const [item, setItem] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        axios.get(`products/${productId}`)
            .then(res => res.data)
            .then(json => {
                setItem({
                    ...json,
                    stock: 5
                })
            }).catch(e => console.log(e))
    }, [productId])


    return !item ? null : (
        <>
            <Title>{item.title}</Title>
            <Product product={item} />
            <Review />
        </>
    );
}

export default ProductInfo;
