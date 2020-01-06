import client from '../../../api.js';
import Notifications from 'react-notification-system-redux';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 6
};

const USER_LIST_REQUEST = 'USER_LIST_REQUEST';
const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS';
const USER_LIST_ERROR = 'USER_LIST_ERROR';

const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST';
const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS';
const USER_DELETE_ERROR = 'USER_DELETE_ERROR';

const GET_SELECTED_USER_LIST_FILTER_BY_MONTH_REQUEST = 'GET_SELECTED_USER_LIST_FILTER_BY_MONTH_REQUEST';
const GET_SELECTED_USER_LIST_FILTER_BY_MONTH_SUCCESS = 'GET_SELECTED_USER_LIST_FILTER_BY_MONTH_SUCCESS';
const GET_SELECTED_USER_LIST_FILTER_BY_MONTH_ERROR = 'GET_SELECTED_USER_LIST_FILTER_BY_MONTH_ERROR'; 

// ** Foreign action
const ADD_NEW_USER_SUCCESS = 'ADD_NEW_USER_SUCCESS';
const EDIT_SELECTED_USER_SUCCESS = 'EDIT_SELECTED_USER_SUCCESS';


export default (state = {
    usersList: [],
    userListRequestPending : false

}, action) => {
    switch (action.type) {
        

        case USER_LIST_REQUEST :
            return state = {
                ...state,
                userListRequestPending : true
            };

        case USER_LIST_SUCCESS : 
            return state = {
                ...state,
                usersList : action.payload,
                userListRequestPending : false
            };

        case USER_LIST_ERROR :
            return state = {
                ...state
            };

        case ADD_NEW_USER_SUCCESS :
            return state = {
                ...state,
                usersList : [...state.usersList, action.payload]
            }

        case EDIT_SELECTED_USER_SUCCESS :
            return state = {
                ...state,
                usersList: state.usersList.map(selectedUser => {
                    if(selectedUser.id == action.payload.id){
                        return action.payload;
                    }else {
                        return selectedUser;
                    }
                })
            }
        case USER_DELETE_REQUEST : 
                    return state = {
                        ...state,
                        userDeleteRequestPending : true
                    }

        case USER_DELETE_ERROR : 
            return state = {
                ...state
            }

        case USER_DELETE_SUCCESS  :
            return state = {
                ...state,
                userDeleteRequestPending : false,
                usersList: state.usersList.filter(x => x.id !== action.payload.id)
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
                usersList : action.payload
            }

        default : return state;
    }
};

const getUserListRequest = () => ({
    type : USER_LIST_REQUEST
})

const getUserListSuccess = (listOfUser) => ({
    type : USER_LIST_SUCCESS,
    payload : listOfUser
}) 

const getUserListError = () => ({
    type : USER_LIST_ERROR
})

const deleteUserRequest = () => ({
    type : USER_DELETE_REQUEST
})

const deleteUserSuccess = (selectedUser) => ({
    type: USER_DELETE_SUCCESS,
    payload: selectedUser
})

const deleteUserError = () => ({
    type: USER_DELETE_ERROR
})

const getUserListFilteredByMonthRequest = () => ({
    type: GET_SELECTED_USER_LIST_FILTER_BY_MONTH_REQUEST,
})

const getUserListFiteredByMonthSuccess = (userList) => ({
    type: GET_SELECTED_USER_LIST_FILTER_BY_MONTH_SUCCESS,
    payload: userList
})


export function getListOfUsers() {
    return (dispatch) => {
        dispatch(getUserListRequest());

        client.get('/api/Users/GetAllUsers')
            .then(response => {
                dispatch(getUserListSuccess(response.data));
            })
            .catch(error => {

            })

    }
}

export function deleteSelectedUser(selectedUserId, closeDiag) {
    return (dispatch) => {
        dispatch(deleteUserRequest());

        client.delete('/api/Users/DeleteUser?Id=' + selectedUserId)
            .then(response => {

                dispatch(Notifications.success({
                    ...notificationOpts,
                    title: 'SUCCESS',
                    message: `Sucessfully deleted ${response.data.firstname} ${response.data.middlename} ${response.data.lastname}`
                    // message: 'Sucessfully deleted a user'
                }));
                closeDiag();
                dispatch(deleteUserSuccess(response.data));

                
            })
            .catch(error => {

            })
    }
}

export function getUserListFiteredByMonth(selectedMonth) {
    return (dispatch) => {
        dispatch(getUserListFilteredByMonthRequest);

        var data = {
            selectedMonth: selectedMonth
        };

        client.post('/api/Users/GetAllUsersBySelectedMonth', data)        
        .then(response => {
            dispatch(getUserListFiteredByMonthSuccess(response.data));
        })
        .catch(error => {

        })
    }
}