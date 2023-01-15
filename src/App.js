// import Product from './components/Product';
import { ProductList } from './components/ProductList';
// import { ProductListClass } from './components/ProductListClass';
import ProductInfo from './components/ProductInfo';
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import NavBar from './components/MUI/NavBar';
import Login from './components/Login';
import { useState} from 'react';




function App() {
  const [selectedItem, setSelectedItem] = useState(null)

  const setItem = (item) => {
    setSelectedItem(item)
  }


  // Component did mount and component did update
  // useEffect(() => {
  //   console.log("UseEffect")
  // })

  // Only activate when component mounted
  // useEffect(() => {
  //   // dependency list is empty, therefore this side effect will only execute when component mount
  //   console.log("Only when mounted.")
  // }, [])


  return (
      <>
          <div className="App">
            <NavBar />
            <Login />
            <ProductList onSelected={setItem}/>
            {selectedItem == null? "No item selected" :<ProductInfo item={selectedItem}/>}
            <AddProduct></AddProduct>
            <Cart />
          </div>
      </>
  )
}

export default App;