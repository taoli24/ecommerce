import { Component } from "react";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import ProductClass from "./ProductClass";
import Title from "./styled/Title";
import GridBox from "./styled/GridBox";


const CustomGrid = styled(GridBox)`
    padding: 30px;
`;

class ProductListClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoading: true
        };
    }

    componentDidMount() {
        fetch("https://fakestoreapi.com/products?limit=9")
            .then((res) => res.json())
            .then((data) => {
                const newItems = data.map((product) => {
                    product.stock = 10;
                    return product;
                });
                this.setState({
                    items: newItems,
                    isLoading: false
                });
            });
    }

    componentDidUpdate() {
        console.log("ProductList Uodated");
    }

    componentWillUnmount() {
        console.log("ProductList Unmounted");
    }

    render() {
        const items = this.props.productList;

        return (
            <>
                {this.state.isLoading ? (
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
                            {this.state.items.map((item) => (
                                <ProductClass key={item.id} product={item} onSelected={this.props.onSelected} />
                            ))}
                        </CustomGrid>
                    </div>
                )}
            </>
        );
    }
}

export { ProductListClass };
