import Title from "./styled/Title";
import Product from "./Product";
import Review from "./Review";

function ProductInfo(props){
    const item = props.item
    return ( !item ? null :  (
        <>
            <Title>{item.title}</Title>
            <Product product={item} />
            <Review />
        </>                 
    ))
}

export default ProductInfo