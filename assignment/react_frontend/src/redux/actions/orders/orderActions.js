import axios from "axios";
import { apiURL } from "../../../config";
import { GET_ORDERS, ERROR, POST_ORDERS, SUCCESS, RESET_CART, LOADING } from "../actionTypes";
import { stateTypes } from "../../../tests/constants/components";
import { resetCart } from "../cart/actionCreators";

export const getOrders  = () => async (dispatch) =>  {
    dispatch({ type: LOADING, payload: {message:"Orders loading", stateType: stateTypes.order}});

    try {
        const response = await axios.get(apiURL + '/orders', 
        
        {
            withCredentials: true,
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error('Failed to get orders');
        }
        dispatch({ type: SUCCESS, payload: {message:"Orders fetched", stateType: stateTypes.order}});
        dispatch({ type: GET_ORDERS, payload: response.data });
    } catch (error) {
        dispatch({ type: ERROR, payload: {message:"Not authorized", stateType: stateTypes.order}});
    }
}

export const postOrders = (items) => async (dispatch) => {
    dispatch({ type: LOADING, payload: {message:"Orders updating", stateType: stateTypes.order}});
    console.log("order loading");
    try {
        const response = await axios.post(
            apiURL + '/orders',
            { items: items },
            {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.status !== 201) {
            throw new Error('Failed to send order');
        }

        dispatch({ type: SUCCESS, payload: { message: "Order success", stateType: stateTypes.order } });
        console.log("order success");

        dispatch({ type: POST_ORDERS, payload: response.data });
    } catch (error) {
        dispatch({ type: ERROR, payload: { message: "Order failed", stateType: stateTypes.order } });
    }
};

export const getOrder  = async (id) =>  {

    try {
        const response = await axios.get(apiURL + '/orders/' + id, {
            withCredentials: true,
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        });

        console.log("get order response: ", response);

        if (response.status !== 200) {
            throw new Error('Failed to get order');
        }

        return response.data;
    } catch (error) {
        console.error(error);
    }
}





