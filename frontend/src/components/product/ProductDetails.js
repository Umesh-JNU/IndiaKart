import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./productDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { NEW_REVIEW_RESET } from "../../constants/ProductConstants";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/ProductAction";
import { addItemsToCart } from "../../actions/CartAction";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.js";
import Loading from "../layout/loader/Loading";
import { useAlert } from "react-alert";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
  Stack,
  TextField,
} from "@mui/material";
import useTitle from "../layout/MetaData";

const CustomButton = ({ func, text }) => (
  <Button
    variant="contained"
    sx={{ padding: "0 6px", minWidth: "30px" }}
    onClick={func}
  >
    {text}
  </Button>
);

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added to Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  useTitle(`${product.name} | IndiaKart`);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="productDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="carouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>

              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <Stack spacing={1} direction="row">
                    <CustomButton func={decreaseQuantity} text={"-"} />
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      disabled
                      value={quantity}
                    />
                    <CustomButton func={increaseQuantity} text={"+"} />
                  </Stack>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ marginTop: "15px", borderRadius: "20px" }}
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </div>
                <p>
                  Status :
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? " Out of Stock" : " In Stock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                <strong>Description :</strong><p>{product.description}</p>
              </div>
              <Button
                variant="contained"
                size="small"
                sx={{ marginTop: "15px", borderRadius: "20px" }}
                disabled={product.stock < 1 ? true : false}
                onClick={submitReviewToggle}
              >
                Submit Review
              </Button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((r, i) => (
                <ReviewCard review={r} key={i} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
