import React, { useEffect, useState } from "react";
import "./products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/ProductAction";
import Loading from "../layout/loader/Loading";
import ProductCard from "../home/ProductCard";
import { useParams } from "react-router-dom";
import {
  Pagination,
  Slider,
  Typography,
  Rating,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useAlert } from "react-alert";
import useTitle from "../layout/MetaData";

const categories = [
  "Laptop",
  "Footwear",
  "Jeans",
  "Jacket",
  "Winter Wear",
  "Electronics",
  "Mobile",
  "Shirt",
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
  const [selectedIndex, setSelectedIndex] = useState();

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

  const valuetext = (value) => `₹${value}`;

  useTitle("IndiaKart | Products");
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="product-container">
          <div className="i1">
            <div className="i11">
              <h1 className="text-center text-medium px-4 py-2">Filter</h1>
            </div>
            <div className="i12 p-4">
              <div className="p-2">
                <Typography>Price</Typography>
                <Slider
                  value={price}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                  step={10000}
                  marks
                  min={0}
                  max={40000}
                  onChange={(e, newPrice) => setPrice(newPrice)}
                />
              </div>
              <div className="p-2">
                <Typography>Category</Typography>
                <List component="nav">
                  {categories.map((category, i) => (
                    <ListItemButton
                      sx={{padding: "0 5px"}}
                      key={i}
                      selected={selectedIndex === i}
                      onClick={() => {
                        setCategory(category);
                        setSelectedIndex(i);
                      }}
                    >
                      <ListItemText
                        primary={category}
                        primaryTypographyProps={{
                          fontSize: 12,
                          fontWeight: "medium",
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </div>
              <div className="p-2">
                <Typography sx={{padding: "0 0 2px 0"}}>Ratings Above</Typography>
                <Rating
                  onChange={(e, newRating) =>
                    setRatings(newRating === null ? 0 : newRating)
                  }
                  value={ratings}
                  size="large"
                  precision={0.5}
                />
              </div>
            </div>
          </div>
          <div className="i2">
            <div className="i21">
              <h1 className="text-center text-large px-4 py-2 inline-block">
                <span className="border-b-2 border-[#808080]">Products</span>
              </h1>
            </div>
            <div className="i22">
              <div className="products">
                {products &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
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
                  onChange={(e, val) => setCurPage(val)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
