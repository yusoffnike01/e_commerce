import React, { useEffect, useState } from "react";
import { Checkout, Navbar, Products } from "./components";
import Cart from "./components/Cart/Cart";
import { commerce } from "./libs/commerce";
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";


const App=()=>{
  const [products, setProduct]=useState([]);
  const [cart, setCart] = useState({});
  const [order, SetOrder] = useState({});
  const [errorMessage, setErrorMessage]= useState('');
  const fetchProducts = async ()=>{
    const {data} = await commerce.products.list()
    setProduct(data);
  }

    const fetchCart = async()=>{
      setCart(await commerce.cart.retrieve());

    }

const handleAddToCart = async (productId, quantity)=>{
  const {cart}= await commerce.cart.add(productId, quantity);
  setCart(cart);

}

const handleUpdateCartQty =async (productId, quantity)=>{
  const {cart} = await commerce.cart.update(productId, {quantity});
  setCart(cart);

}
const handleRemoveFromCart = async (productId)=>{
  const {cart} =await commerce.cart.remove(productId);
  setCart(cart);

}

const handleEmptyCart = async()=>{
  const {cart}= await commerce.cart.empty();
  setCart(cart);
}

const refreshCart= async()=>{
  const {cart}= await commerce.cart.empty();
  setCart(cart);
}
const handleCaptureCheckout = async(checkoutTokenId, newOrder)=>{
  try{
    const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
    SetOrder(incomingOrder)
    refreshCart();
  }catch(error) {
    setErrorMessage(error.data.error.message);

  }
}
    

  useEffect(()=>{
    fetchProducts();
    fetchCart();
  },[])

return(

<Router>
<div>
<Navbar totalItems={cart.total_items}/>
<Routes>
  <Route path='/' element={<Products products={products} onAddToCart={handleAddToCart}/>} />
  <Route  path='/cart'   element={<Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart}/>}/>
  <Route  path='/checkout'   element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}/>}/>
 
  </Routes>
</div>
</Router>

)

}
export default App;