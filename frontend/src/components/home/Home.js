import React, { useEffect } from "react";
import { Mouse } from "@mui/icons-material";
import "./home.css";
import Product from "./ProductCard.js";
import useTitle from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loading from "../layout/loader/Loading";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, error, alert]);

  useTitle("IndiaKart");
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="banner">
            <p>Welcome to IndiaKart</p>
            <h1>Get exclusive product only on IndiaKart</h1>

            <a href="#container">
              <button className="text-blue-700">
                Scroll <Mouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
