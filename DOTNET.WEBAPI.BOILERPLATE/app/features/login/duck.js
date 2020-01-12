import client from '../../api.js';

import { reset } from 'redux-form';

import Notifications from 'react-notification-system-redux';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 6
};


const SIGN_UP_NEW_USER_REQUEST = 'SIGN_UP_NEW_USER_REQUEST'; 
const SIGN_UP_NEW_USER_SUCCESS = 'SIGN_UP_NEW_USER_SUCCESS';
const SIGN_UP_NEW_USER_ERROR = 'SIGN_UP_NEW_USER_ERROR';

const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';


//** foreign action */

//const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';


export default (state = {
    requestSignUpNewUserRequestPending: false,
    loginUserRequestPending: false,
    userInfo: null,
    signUpSuccess: false
}, action) => {
    switch (action.type) {
        case SIGN_UP_NEW_USER_REQUEST :
            return state = {
                ...state,
                requestSignUpNewUserRequestPending: true
            }
        
        case SIGN_UP_NEW_USER_SUCCESS :
            return state = {
                ...state,
                requestSignUpNewUserRequestPending: false,
                signUpSuccess: action.payload
            }

        case LOGIN_USER_REQUEST :
            return state = {
                ...state,
                loginUserRequestPending: true
            }   

        case LOGIN_USER_SUCCESS :
            return state = {
                ...state,
                loginUserRequestPending: false,
                userInfo: action.payload
            }
        

    }

    return state;
}


const signUpNewUserRequest = () => ({
    type: SIGN_UP_NEW_USER_REQUEST
})

const signUpNewUserSuccess = (success) => ({
    type: SIGN_UP_NEW_USER_SUCCESS,
    payload: success
})

const loginUserRequest = () => ({
    type: LOGIN_USER_REQUEST
})

const loginUserSuccess = (userInfo) => ({
    type: LOGIN_USER_SUCCESS,
    payload: userInfo
})


export const signUpNewUser = (newUser, onSignedUp) => (dispatch) => {
    dispatch(signUpNewUserRequest());


    client.post('api/Users/SignUpNewUser', newUser).then(response => {
        dispatch(Notifications.success({
            ...notificationOpts,
            title: 'SUCCESS',
            message: 'Sucessfully signed up!'
        }));

        dispatch(signUpNewUserSuccess(response.data));

        dispatch(reset('loginForm'));
        onSignedUp();
    })
}

export const loginUser = (userInfo) => (dispatch) => {
    dispatch(loginUserRequest());

    const { userName, password } = userInfo;

    client.get(`api/Users/CheckIfUserExist?UserName=${userName}&Password=${password}`).then(response => {
        dispatch(Notifications.success({
            ...notificationOpts,
            title: 'SUCCESS',
            message: 'Sucessfully Login!'
        }));

        dispatch(loginUserSuccess(response.data))
    })
}


