import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
import Home from './components/home/Home.js'
import ProductDetails from './components/product/ProductDetails.js'
import Products from './components/product/Products.js'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import webFont from "webfontloader"
import React from "react"
import LoginSignUp from './components/user/LoginSignUp';
import store from './store'
import { loadUser } from './actions/userAction';

function App () {
	React.useEffect(() => {
		webFont.load({
			google: {
				families:["Roboto", "Droid Sands", "Chilanka"]
			}
		})

		store.dispatch(loadUser());
	}, []);
	
	return (
		<Router>
			<Header />
			<Routes>
				<Route exact path="/" element={ <Home />} />
				<Route exact path="/product/:id" element={ <ProductDetails /> } />
				<Route exact path="/products" element={ <Products /> } />				
				<Route path="/products/:keyword" element={ <Products /> } />
				<Route exact path="/login" element={ <LoginSignUp />} />
				{/* <Route exact path="/account" element={ <Account /> } />		 */}
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
