import React, { useEffect, useState } from "react";
import "./products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/ProductAction";
import Loading from "../layout/loader/Loading";
import ProductCard from "../home/ProductCard";
import { useParams } from "react-router-dom";
import { Pagination, Slider, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import useTitle from "../layout/MetaData";

const categories = [
  "laptop",
  "footwear",
  "bottom",
  "tops",
  "attire",
  "camera",
  "mobile",
  "smartphones",
];

const Products = () => {
  const alert = useAlert();
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const [curPage, setCurPage] = useState(1);
  const [price, setPrice] = useState([0, 40000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const setCurPageNo = (e, val) => {
    setCurPage(val);
  };
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, curPage, price, category, ratings));
  }, [dispatch, error, alert, keyword, curPage, price, category, ratings]);
  
  const count = filteredProductsCount;
  const noPages =
    parseInt(productsCount / resultPerPage) +
    (productsCount % resultPerPage === 0 ? 0 : 1);

  useTitle("IndiaKart | Products");
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className='filterBox'>
                    <Typography>Price</Typography>
                    <Slider value={price} valueLabelDisplay="auto"
                    aria-labelledby='range-slider'
                    min={0}
                    max={40000}
                    onChange={priceHandler} />

                    <Typography>Category</Typography>
                    <ul className='categoryBox'>
                        {categories.map((category) => (
                            <li className='category-link' key={category} onClick={() => setCategory(category)}>{category}</li>
                        ))}
                    </ul>

                    <fieldset>
                        <Typography component="legend">Ratings Above</Typography>
                        <Slider value={ratings} onChange={(e, newRating) => setRatings(newRating)} aria-labelledby="continuous-slider" min={0} max={5} valueLabelDisplay="auto" />
                    </fieldset>
                </div>

          {resultPerPage < count && (
            <Pagination
              count={noPages}
              page={curPage}
              variant="outlined"
              color="primary"
              siblingCount={0}
              boundaryCount={2}
              showFirstButton
              showLastButton
              onChange={setCurPageNo}
            />
          )}
        </>
      )}
    </>
  );
};

export default Products;
