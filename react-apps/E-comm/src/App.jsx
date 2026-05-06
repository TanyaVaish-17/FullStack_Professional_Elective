import { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Search from './components/Search';
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [totalAmt, setAmt] = useState(0);

  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 50000,
      image: "https://tse3.mm.bing.net/th/id/OIP._jSBoAtROdfsCG3kgKAqSQHaHa?pid=Api&h=220&P=0"
    },
    {
      id: 2,
      name: "Mobile",
      price: 10000,
      image: "https://tse1.mm.bing.net/th/id/OIP.gafxI64LAojCJ6bf60e5vQHaEK?pid=Api&h=220&P=0"
    },
    {
      id: 3,
      name: "Charger",
      price: 5000,
      image: "https://tse4.mm.bing.net/th/id/OIP.L_XVZQ8Vz9zmYHG-27an_QHaGT?pid=Api&h=220&P=0"
    }
  ];

  const [filteredProducts, setFilteredProducts] = useState(products);

  function addToCart(product) {
    setCart([...cart, product]);
    setAmt(totalAmt + product.price);
  }

  function removeFromCart(index) {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  }

  return (
    <div className='container'>
      <Header cartCount={cart.length} />
      <Search products={products} setFilteredProducts={setFilteredProducts} />
      <ProductList products={filteredProducts} addToCart={addToCart} />
      <Cart totalAmt={totalAmt} cart={cart} removeFromCart={removeFromCart} />
    </div>
  );
}

export default App;