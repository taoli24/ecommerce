import Title from "./styled/Title";
import Product from "./Product";

function ProductInfo(props){
    const item = props.item
    return ( !item ? null :  (
        <>
            <Title>{item.title}</Title>
            <Product product={item} />
        </>                 
    ))
}

export default ProductInfo