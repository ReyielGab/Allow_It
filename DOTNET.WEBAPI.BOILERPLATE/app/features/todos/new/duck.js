import moment from 'moment';
import client from '../../../api.js';
import Notifications from 'react-notification-system-redux';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 6
};


const ADD_NEW_TODO_REQUEST = 'ADD_NEW_TODO_REQUEST';
const ADD_NEW_TODO_SUCCESS = 'ADD_NEW_TODO_SUCCESS';
const ADD_NEW_TODO_ERROR = 'ADD_NEW_TODO_ERROR';

export default (state = {
    todoList: []
}, action) => {
    switch(action.type) {
    
    case ADD_NEW_TODO_REQUEST :
        return state = {
            ...state,
        }

    case ADD_NEW_TODO_SUCCESS :
        return state = {
            ...state,
        }

    case ADD_NEW_TODO_ERROR :
        return state = {
            ...state,
        }

    }

    return state;
}


const addNewTodoRequest = () => ({
    type: ADD_NEW_TODO_REQUEST
})

const addNewTodoSuccess = (newTodo) => ({
    type: ADD_NEW_TODO_SUCCESS,
    payload: newTodo
})

const addNewTodoError = () => ({
    type: ADD_NEW_TODO_ERROR
})

export function addNewTodo(value, closeDialog) {
    return(dispatch) => {
        
        client
            .post('/api/Todo/NewTodo', value)
            .then(response => {
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'Successfully added a todo ',
                    title: 'SUCCESS'
                }))

                dispatch(addNewTodoSuccess(response.data));
                // closeDialog();
            })
            .catch(error => {
            })

    }
}