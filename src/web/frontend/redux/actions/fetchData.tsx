import axios from 'axios';
import {response} from "express";

// import {GET_DATA_INIT, GET_DATA_SUCCESS, GET_DATA_FAILURE} from '../constants'

// export const getData = {
//     init: () => ({
//         type: GET_DATA_INIT,
//     }),
//     success: (request:any, response:any) => ({
//         type: GET_DATA_SUCCESS,
//         payload: {
//             data: response,
//         }
//     }),
//     failure: (error:any) => ({
//         type: GET_DATA_FAILURE,
//         payload: console.log('error: ', error )
//     })
// };

function getFetch() {
    return axios.get('api/room')
}

function setFetch(data:any) {
    return {
        type: 'GET_DATA',
        payload: data
    }
}

export const asyncGetData = () => (dispatch:any) => {
    getFetch()
        .then(response => dispatch(setFetch(response.data)))
};
