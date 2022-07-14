import React, { useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import './productDetails.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails } from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import ReviewCard from './ReviewCard.js'
import Loading from '../layout/loader/Loading'
import { useAlert } from 'react-alert'

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id, error, alert]);


    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    };

    return (
        <> {loading ? <Loading /> :
            <>
                <div className='productDetails'>
                    <div>
                        <Carousel >
                            {product.image && product.image.map((item, i) => (
                                <img
                                    className='carouselImage'
                                    key={item.url}
                                    src={item.url}
                                    alt={`${i} Slide`}
                                />
                            ))}
                        </Carousel>
                    </div>

                    <div>
                        <div className='detailsBlock-1'>
                            <h2>{product.name}</h2>
                            <p>Product # {product._id}</p>
                        </div>
                        <div className='detailsBlock-2'>
                            <ReactStars {...options} />
                            <span>({product.numOfReviews} Reviews)</span>
                        </div>
                        <div className='detailsBlock-3'>
                            <h1>{`₹${product.price}`}</h1>
                            <div className='detailsBlock-3-1'>
                                <div className='detailsBlock-3-1-1'>
                                    <button>-</button>
                                    <input value="1" type="number" />
                                    <button>+</button>
                                </div>{" "}
                                <button>Add to Cart</button>
                            </div>
                            <p>
                                Status:{" "}
                                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                    {product.stock < 1 ? "Out of Stock" : "In Stock"}
                                </b>
                            </p>
                        </div>

                        <div className='detailsBlock-4'>
                            Description : <p>{product.description}</p>
                        </div>

                        <button className='submitReview'>Submit Review</button>
                    </div>
                </div>

                <h3 className='reviewsHeading'>REVIEWS</h3>
                {product.reviews && product.reviews[0] ? (
                    <div className='reviews'>
                        {product.reviews.map((r) => <ReviewCard review={r} />)}
                    </div>
                ) : (
                    <p className='noReviews'>No Reviews</p>
                )}
            </>
        }
        </>
    )
}

export default ProductDetails