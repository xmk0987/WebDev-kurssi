import axios from "axios";
import { apiURL } from "../../../config";
import { GET_PRODUCTS, ERROR, POST_PRODUCT, SUCCESS, LOADING, UPDATE_PRODUCT, DELETE_PRODUCT } from "../actionTypes";
import { stateTypes } from "../../../tests/constants/components";

export const getProducts  = () => async (dispatch) =>  {
    dispatch({ type: LOADING, payload: {message:"Getting products", stateType: stateTypes.product}});

    try {
        const response = await axios.get(apiURL + '/products', {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error('Failed to get products');
        }
        dispatch({ type: SUCCESS, payload: {message:"Products fetched", stateType: stateTypes.product}});
        dispatch({ type: GET_PRODUCTS, payload: response.data });
    } catch (error) {
        dispatch({ type: ERROR, payload: {message:"Can't get products", stateType: stateTypes.product}});
    }
}

export const getProduct  = async (id) =>  {
    try {
        const response = await axios.get(apiURL + '/products/' + id, {
            withCredentials: true,
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error('Failed to get product');
        }

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const postProduct  = (product) =>  async (dispatch) => {
    dispatch({ type: LOADING, payload: {message:"Product is being add", stateType: stateTypes.product}});

    const jsonProduct = JSON.stringify(product);
    try {
        const response = await axios.post(apiURL + '/products', jsonProduct, {
            withCredentials: true,
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        });

        if (response.status !== 201) {
            throw new Error('Failed to post product');
        }

        dispatch({ type: SUCCESS, payload: {message:"Product posted", stateType: stateTypes.product}});
        dispatch({ type: POST_PRODUCT , payload: response.data });
    } catch (error) {
        dispatch({ type: ERROR, payload: {message:"Can't post product", stateType: stateTypes.product}});
    }
}


export const updateProduct  = (product, id) =>  async (dispatch) => {
    dispatch({ type: LOADING, payload: {message:"Product is being modified", stateType: stateTypes.product}});


    const jsonProduct = JSON.stringify(product);
    try {
        const response = await axios.put(apiURL + '/products/' + id, jsonProduct, {
            withCredentials: true,
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error('Failed to modify product');
        }

        dispatch({ type: SUCCESS, payload: {message:"Product modified", stateType: stateTypes.product}});
        dispatch({ type: UPDATE_PRODUCT , payload: response.data });
    } catch (error) {
        dispatch({ type: ERROR, payload: {message:"Can't modify product", stateType: stateTypes.product}});
    }
}

export const deleteProduct  = (id) =>  async (dispatch) => {
    dispatch({ type: LOADING, payload: {message:"Product is being deleted", stateType: stateTypes.product}});

    try {
        const response = await axios.delete(apiURL + '/products/' + id, {
            withCredentials: true,
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error('Failed to delete product');
        }

        dispatch({ type: SUCCESS, payload: {message:"Product deleted", stateType: stateTypes.product}});
        dispatch({ type: DELETE_PRODUCT , payload: response.data.id });
    } catch (error) {
        dispatch({ type: ERROR, payload: {message:"Can't delete product", stateType: stateTypes.product}});
    }
}
