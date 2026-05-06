import ProductCart from './ProductCart';
import ProductCard from './ProductCart';
export default function ProductList({products,addToCart})
{
    return(
        <div className='product-grid'>
        {products.map(product=>
        <ProductCart 
         key={product.id} 
        product={product} 
        addToCart={addToCart} />

        )}
        


        </div>
    )
}