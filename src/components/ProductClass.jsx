import { Component } from "react";
import styled from "styled-components";
import Button from "./styled/Button";

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

class ProductClass extends Component {

    constructor(props) {
        super(props);
        console.log("Constructor");
        this.state = {
            numItemsOnCart: 0,
        };
    }

    componentDidMount() {
        // triggered when component is rendered
        // fetching data from apis, listern to web socket apis, add event listerners
        console.log("componentDidMount");
    }

    componentDidUpdate() {
        // triggered when state/prop chanages
        // fetching data from apis using new state/prop value
        console.log("componentDidUpdate");
    }

    componentWillUnmount() {
        // triggered when component is unmounted
        // clear everything, stop listerning to web socket apis, remove event listerners
        console.log("componentWillUnmount");
    }

    addToCartHandler = () => {
        this.setState(prevState => {
            return {
                numItemsOnCart: prevState.numItemsOnCart + 1
            }
        })
        

    };

    render() {
        const item = this.props.product;

        console.log("render");
        return (
            <Wrapper onClick={() => {
                this.props.onSelected(item)
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
                        marginBottom: 10,
                    }}
                >
                    ${item.price}
                </div>
                <div>Stock: {item.stock}</div>
                <div>Stock left: {item.stock - this.state.numItemsOnCart}</div>

                <Button
                    disabled={item.stock === this.state.numItemsOnCart}
                    onClick={this.addToCartHandler}
                    greaterThanFive={this.state.numItemsOnCart > 5}
                >
                    {item.stock === this.state.numItemsOnCart
                        ? "No Stock Left"
                        : "Add to Cart"}
                </Button>
            </Wrapper>
        );
    }
}

export default ProductClass;
