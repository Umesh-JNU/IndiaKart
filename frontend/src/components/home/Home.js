import React, { useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import './home.css'
import Product from './Product.js'
import MetaData from '../layout/MetaData'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../../actions/productAction'
import Loading from '../layout/loader/Loading'
import {useAlert} from 'react-alert'

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading, error, products, productsCount} = useSelector((state) => state.products);

    useEffect(() => {
        if(error) {
            return alert.error(error);
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    return (
        <>
            {loading ? (
                <Loading />
            ):( 
            <>
                <MetaData title="IndiaKart" />
                <div className='banner'>
                    <p>Welcome to IndiaKart</p>
                    <h1>Get exclusive product only on IndiaKart</h1>

                    <a href='#container'>
                        <button>Scroll <CgMouse /></button>
                    </a>
                </div>

                <h2 className='homeHeading'>Featured Products</h2>
                <div className='container' id='container'>
                    {products && products.map((product) => <Product product={product} />)}
                </div>
            </>)}
        </>
    )
}

export default Home