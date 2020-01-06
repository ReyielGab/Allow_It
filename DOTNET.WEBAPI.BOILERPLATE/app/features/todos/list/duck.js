
import moment from 'moment';
import client from '../../../api.js';

import Notifications from 'react-notification-system-redux';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 6
};


const GET_ALL_TODO_BY_ID_REQUEST = 'GET_ALL_TODO_BY_ID_REQUEST';
const GET_ALL_TODO_BY_ID_SUCCESS = 'GET_ALL_TODO_BY_ID_SUCCESS';
const GET_ALL_TODO_BY_ID_ERROR = 'GET_ALL_TODO_BY_ID_ERROR';

const DELETE_SELECTED_TODO_REQUEST = 'DELETE_SELECTED_TODO_REQUEST';
const DELETE_SELECTED_TODO_SUCCESS = 'DELETE_SELECTED_TODO_SUCCESS';
const DELETE_SELECTED_TODO_ERROR = 'DELETE_SELECTED_TODO_ERROR'

const DONE_SELECTED_TODO_REQUEST = 'DONE_SELECTED_TODO_REQUEST';
const DONE_SELECTED_TODO_SUCCESS = 'DONE_SELECTED_TODO_SUCCESS';
const DONE_SELECTED_TODO_ERROR = 'DONE_SELECTED_TODO_ERROR';

// ** Foreign action
const ADD_NEW_TODO_SUCCESS = 'ADD_NEW_TODO_SUCCESS';

const convertTodoDateUtcToLocal = t => {
    t.todoDate = moment.utc(t.todoDate).toDate();
    return t;
};



export default (state = {
    todoList: [],
    getAllTodosPendingRequest: false
}, action) => {
    switch (action.type) {

        case GET_ALL_TODO_BY_ID_REQUEST:
            return state = {
                ...state,
                getAllTodosPendingRequest: true
            }

        case GET_ALL_TODO_BY_ID_SUCCESS:
            return state = {
                ...state,
                getAllTodosPendingRequest: false,
                todoList: action.payload.map(convertTodoDateUtcToLocal)
            }

        case GET_ALL_TODO_BY_ID_ERROR:
            return state = {
                ...state,
            }

        case DELETE_SELECTED_TODO_REQUEST:
            return state = {
                ...state
            }

        case DELETE_SELECTED_TODO_SUCCESS:
            return state = {
                ...state,
                todoList: state.todoList.filter(x => x.id !== action.payload)
            }

        case ADD_NEW_TODO_SUCCESS:
            return state = {
                ...state,
                todoList: [...state.todoList, action.payload]
            }

        case DONE_SELECTED_TODO_SUCCESS:
            return state = {
                ...state,
                todoList: state.todoList.filter((t) => {
                    if(t.id == action.payload) {
                        t.done = true;
                        return t;
                    }
                    else return t;
                })
            }

    }

    return state;
};


const getAllTodoByIdRequest = () => ({
    type: GET_ALL_TODO_BY_ID_REQUEST
});

const getAllTodoByIdSuccess = (todos) => ({
    type: GET_ALL_TODO_BY_ID_SUCCESS,
    payload: todos
});

const getAllTodoByIdError = () => ({
    type: GET_ALL_TODO_BY_ID_ERROR
});

const deleteSelectedTodoRequest = () => ({
    type: DELETE_SELECTED_TODO_REQUEST
});

const deleteSelectedTodoSuccess = (todoId) => ({
    type: DELETE_SELECTED_TODO_SUCCESS,
    payload: todoId
});

const deleteSelectedTodoError = () => ({
    type: DELETE_SELECTED_TODO_ERROR
});

const doneSelectedTodoRequest = () => ({
    type: DONE_SELECTED_TODO_REQUEST
});

const doneSelectedTodoSuccess = (todoId) => ({
    type: DONE_SELECTED_TODO_SUCCESS,
    payload: todoId
});

const doneSelectedTodoError = () => ({
    type: DONE_SELECTED_TODO_ERROR
})


export const getAllTodos = (userId) => (dispatch) => {
    dispatch(getAllTodoByIdRequest())
    client.get(`api/Todo/GetTodosById?UserId=${userId}`)
        .then(response => {
            dispatch(getAllTodoByIdSuccess(response.data))
            
        })
        .catch(error => {
          
        })
}


export const deleteSelectedTodo = (todoId, closeDialog) => (dispatch) => {

    client.delete(`api/Todo/DeleteTodoById?TodoId=${todoId}`)
        .then(response => {
            
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Successfully deleted a todo ',
                title: 'SUCCESS'
            }))

            dispatch(deleteSelectedTodoSuccess(todoId));
            closeDialog();
      
        })
        .catch(error => {

        })
}

export const doneTodo = (todoId) => (dispatch) => {
    
    client.put(`api/Todo/DoneTodo?TodoId=${todoId}`)
        .then(response => {

            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Successfully done a todo ',
                title: 'SUCCESS'
            }))

            dispatch(doneSelectedTodoSuccess(todoId))
        })
        .catch(error => {

        })
}

