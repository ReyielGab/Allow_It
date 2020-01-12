import client from '../../../api.js';

import { reset } from 'redux-form';

import Notifications from 'react-notification-system-redux';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 6
};

const NEW_USER_INFO_REQUEST = 'NEW_USER_INFO_REQUEST';
const NEW_USER_INFO_SUCCESS = 'NEW_USER_INFO_SUCCESS';
const NEW_USER_INFO_ERROR = 'NEW_USER_INFO_ERROR'; 



export default (state = {
    newUserInfoRequestPending: false
},action) => {
    switch(action.type) {
        case NEW_USER_INFO_REQUEST :
            return state = {
                ...state,
                newUserInfoRequestPending: true
            }

        case NEW_USER_INFO_SUCCESS :
            return state = {
                ...state,
                newUserInfoRequestPending: false
            }
    }

    return state;
}


const newUserInfoRequest = () => ({
    type: NEW_USER_INFO_REQUEST
})

const newUserInfoSuccess = (userInfo) => ({
    type: NEW_USER_INFO_SUCCESS,
    payload: userInfo
})




export const newUserInfo = (userData, closeDiag) => (dispatch) => {
    dispatch(newUserInfoRequest());

    client.post('api/Users/NewUserInfo', userData).then(response => {
        dispatch(newUserInfoSuccess(response.data));

        dispatch(Notifications.success({
            ...notificationOpts,
            title: 'SUCCESS',
            message: 'Sucessfully added details'
        }));

        closeDiag();
    }).catch(error => {
        console.log(error);
    })
}