import axios from "axios";
import { apiURL } from "../../../config";
import { GET_PRODUCTS, ERROR } from "../actionTypes";

export const getProducts  = () => async (dispatch) =>  {
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

        dispatch({ type: GET_PRODUCTS, payload: response.data });
    } catch (error) {
        dispatch({ type: ERROR, payload: error.message });
    }
}

export const getProduct  = async (id) =>  {
    try {
        const response = await axios.get(apiURL + '/products/' + id, {
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


