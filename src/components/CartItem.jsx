import { useState } from "react"


function CartItem(props) {
    const item = props.item;
    const [noItems, setNumItems] = useState(1)

    const addItemHandler = () => {
        setNumItems(prevState => {
            return prevState += 1
        })
    }

    const removeItemHandler = () => {
        setNumItems(prevState => {
            return prevState -= 1
        })
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
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
                }}
            >
                ${item.price}
            </div>
            <div>Stock number: {item.stock}</div>
            <div style={{
                marginTop: "5px"
            }}>
                <button onClick={removeItemHandler} disabled={noItems === 0}>-</button>
                <span style={{
                    margin: "0 5px"
                }}>{noItems}</span>
                <button onClick={addItemHandler} disabled={noItems === item.stock}>+</button>
            </div>
            <div>Total Price: ${noItems*item.price} </div>
        </div>
    );
}

export default CartItem;
