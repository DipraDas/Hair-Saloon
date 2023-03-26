import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../../components/loading/Loading';
import { useGetProductsQuery } from '../../../features/api/productSlice';
import Categories from '../Categories/Categories';
import Product from '../Product/Product';
import ShopCart from '../ShopCart/ShopCart';
import UpCommingProduct from '../UpCommingProduct/UpCommingProduct';
import './Products.css';

const Products = () => {

    const [upcommingProducts, setUpcommingProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const cart = useSelector(state => state.cart);
    const cartDetails = cart.cart;
    const cartLength = (cart.cart.length);

    const eachProductCost = (cartDetails.map(c => (c.price * c.quantity)));
    const subTotal = (eachProductCost.reduceRight((acc, cur) => acc + cur, 0)).toFixed(2);

    const { data, isLoading } = useGetProductsQuery();
    const products = data;

    if (isLoading) {
        <Loading></Loading>
    }

    useEffect(() => {
        fetch('../../../upCommingProduct.JSON')
            .then(response => response.json())
            .then(data => setUpcommingProducts(data));
    }, [])
    useEffect(() => {
        fetch('../../../categories.JSON')
            .then(response => response.json())
            .then(data => setCategories(data));
    }, [])

    return (
        <div>
            <div className="products py-5">
                <div className="container">
                    <div className="row p-0 m-0">
                        <div className='show'>Showing 1-15 of 15 results</div>
                        <div className="col-lg-9 col-md-12 px-4">
                            <div className="proContainer">
                                {
                                    products?.map(product =>
                                        <Product
                                            key={product.id}
                                            product={product}
                                        ></Product>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 rightProducts">
                            {
                                cartLength > 0 &&
                                <h4 className='mb-4'>Cart</h4>
                            }
                            <div className='mb-5'>
                                {
                                    cartLength > 0 &&
                                    cartDetails.map(cart => <ShopCart
                                        key={cart._id}
                                        cart={cart}
                                    ></ShopCart>)
                                }
                                {
                                    cartLength > 0 &&
                                    <div className='d-flex justify-content-between'>
                                        <div className='subtotalStyle'>Subtotal :</div>
                                        <div className='subtotalStyle'>£{subTotal}</div>
                                    </div>
                                }
                            </div>
                            <h4>Upcomming Products</h4>
                            {
                                upcommingProducts.map(upcommingProduct =>
                                    <UpCommingProduct
                                        key={upcommingProduct.id}
                                        upcommingProduct={upcommingProduct}
                                    ></UpCommingProduct>
                                )
                            }
                            <h5>Categories</h5>
                            {
                                categories.map(category =>
                                    <Categories
                                        key={category.id}
                                        category={category}
                                    ></Categories>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;