import client from '../../../api.js';
import Notifications from 'react-notification-system-redux';

const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
const GET_USER_INFO_ERROR = 'GET_USER_INFO_ERROR';

const GET_SELECTED_USER_LIST_FILTER_BY_MONTH_REQUEST = 'GET_SELECTED_USER_LIST_FILTER_BY_MONTH_REQUEST';
const GET_SELECTED_USER_LIST_FILTER_BY_MONTH_SUCCESS = 'GET_SELECTED_USER_LIST_FILTER_BY_MONTH_SUCCESS';
const GET_SELECTED_USER_LIST_FILTER_BY_MONTH_ERROR = 'GET_SELECTED_USER_LIST_FILTER_BY_MONTH_ERROR'; 

//** foreign action */
const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const NEW_USER_INFO_SUCCESS = 'NEW_USER_INFO_SUCCESS';


export default (state = {
    userInfo: null,
    userListRequestPending: false
}, action) => {
    switch(action.type){
        case GET_USER_INFO_REQUEST :
            return state = {
                ...state,

            }

        case GET_USER_INFO_SUCCESS :
            return state = {
                ...state,
                userInfo: action.payload
            }

        case LOGIN_USER_SUCCESS :
            return state = {
                ...state,
                userInfo: action.payload
            }

        case NEW_USER_INFO_SUCCESS :
            return state = {
                ...state,
                userInfo: action.payload
            }

        case GET_SELECTED_USER_LIST_FILTER_BY_MONTH_REQUEST :
            return state = {
                ...state,
                userListRequestPending : true
            }
        
        case GET_SELECTED_USER_LIST_FILTER_BY_MONTH_SUCCESS :
            return state = {
                ...state,
                userListRequestPending : false,
                userInfo : action.payload
            }


        default : return state;
    }

}


const getUserInfoRequest = () => ({
    type: GET_USER_INFO_REQUEST
})

const getUserInfoSuccess = (userInfo) => ({
    type: GET_USER_INFO_SUCCESS,
    payload: userInfo
})  

const getUserListFilteredByMonthRequest = () => ({
    type: GET_SELECTED_USER_LIST_FILTER_BY_MONTH_REQUEST,
})

const getUserListFiteredByMonthSuccess = (userList) => ({
    type: GET_SELECTED_USER_LIST_FILTER_BY_MONTH_SUCCESS,
    payload: userList
})



export const getUserInfo = (userId) => (dispatch) => {
    dispatch(getUserInfoRequest());

    client.get(`api/Users/GetUserInfoById?UserId=${userId}`).then(response => {
        dispatch(getUserInfoSuccess(response.data));
    })
}

export function getUserListFiteredByMonth(selectedMonth, userInfo) {
    return (dispatch) => {
        dispatch(getUserListFilteredByMonthRequest);

        var data = {
            selectedMonth: selectedMonth,
            userId: userInfo
        };

        client.post('/api/Users/GetAllUserInfoByMonth', data)        
        .then(response => {
            dispatch(getUserListFiteredByMonthSuccess(response.data));
        })
        .catch(error => {

        })
    }
}