import './App.css';
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
import Home from './components/home/Home.js'
import ProductDetails from './components/product/ProductDetails.js'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import webFont from "webfontloader"
import React from "react"



function App () {
	React.useEffect(() => {
		webFont.load({
			google: {
				families:["Roboto", "Droid Sands", "Chilanka"]
			}
		})
	}, []);
	
	return (
		<Router>
			<Header />
			<Routes>
				<Route exact path="/" element={ <Home />} />
				<Route exact path="/product/:id" element={ <ProductDetails /> } />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
