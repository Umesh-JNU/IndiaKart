import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, CLEAR_ERROR } from "../constants/productConstants";

const initialState = {
    products: []
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                itemPerPage: action.payload.itemPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            };
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};

const productDetailInitialState = {
    product: {}
};

export const productDetailsReducer = (state = productDetailInitialState, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};