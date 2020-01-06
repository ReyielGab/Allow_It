import client from '../../../api.js';
import Notifications from 'react-notification-system-redux';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 6
};

const EDIT_SELECTED_USER_REQUEST = 'EDIT_SELECTED_USER_REQUEST';
const EDIT_SELECTED_USER_SUCCESS = 'EDIT_SELECTED_USER_SUCCESS';
const EDIT_SELECTED_USER_ERROR = 'EDIT_SELECTED_USER_ERROR';


export default (state = {
    editSelectedUserRequestPending : false
}, action) => {
    switch (action.type){
     
    case EDIT_SELECTED_USER_REQUEST :
        return state = {
            ...state,
            editSelectedUserRequestPending: true
        }

    case EDIT_SELECTED_USER_SUCCESS :
        return state = {
            ...state,
            editSelectedUserRequestPending: false
        }
    
    case EDIT_SELECTED_USER_ERROR :
        return state = {
            ...state,
            editSelectedUserRequestPending: false
        }
    }
    return state;
};


const editSelectedUserRequest = () => ({
    type: EDIT_SELECTED_USER_REQUEST
});

const editSelectedUserSuccess = (selectedUser) => ({
    type: EDIT_SELECTED_USER_SUCCESS,
    payload: selectedUser
})

const editSelectedUserError = () => ({
    type: EDIT_SELECTED_USER_ERROR
})


export function editSelectedUser(userDto, closeDialog){
    return(dispatch) => {

        boilerAxios.put('/api/Users/EditUser', userDto)
        .then(response => {
            dispatch(Notifications.success({
                ...notificationOpts,
                title: 'SUCCESS',
                message: 'Successfully updated a user'
            }))
            dispatch(editSelectedUserSuccess(response.data))
            closeDialog();
        })
        .catch(error =>{

        })
    }
}

