import Title from "./styled/Title";
import GridBox from "./styled/GridBox";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
    const [items, setCartItems] = useState([])

    useEffect(() => {
        axios
            .get("/carts/5")
            .then((res) => res.data)
            .then((json) => {
                const products = json.products
                // console.log(products)

                let newItemsPriomise = []

                const getProductPromise = (id) => {
                    return axios.get(`/products/${id}`)
                    .then(res => res.data)
                    .then(json => {
                        return {
                            ...json,
                            stock: 5
                        }
                    })
                }

                // get promises and add to promise array
                products.forEach(product => {
                    newItemsPriomise.push(getProductPromise(product.productId))
                });

                Promise.all(newItemsPriomise).then(items => {
                    setCartItems(items)
                })
                
            });
    }, []);

    return (
        <div id="Cart">
            <Title>Cart</Title>
            <GridBox>
                {items.map((item) => {
                    return <CartItem key={item.id} item={item} />;
                })}
            </GridBox>
            <div></div>
        </div>
    );
}

export default Cart;
