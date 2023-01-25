import Title from "./styled/Title";
import GridBox from "./styled/GridBox";
import CartItem from "./CartItem";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

function Cart() {
    const items = useLoaderData();

    return (
        <div id="Cart">
            <Title>Cart</Title>
            <GridBox>
                {items.map((item) => {
                    return <CartItem key={item.id} item={item} />;
                })}
            </GridBox>
        </div>
    );
}

export function loader() {
    return axios
        .get("/carts/5")
        .then((res) => res.data)
        .then((json) => {
            const products = json.products;
            // console.log(products)

            let newItemsPriomise = [];

            const getProductPromise = (id) => {
                return axios
                    .get(`/products/${id}`)
                    .then((res) => res.data)
                    .then((json) => {
                        return {
                            ...json,
                            stock: 5,
                        };
                    });
            };

            // get promises and add to promise array
            products.forEach((product) => {
                newItemsPriomise.push(getProductPromise(product.productId));
            });

            console.log(newItemsPriomise)

            // Promise.all(newItemsPriomise).then(items => {
            //     console.log(items)
            //     setCartItems(items)
            // })

            return Promise.all(newItemsPriomise);
        });
}

export default Cart;
