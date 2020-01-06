
import client from '../../../api.js';
import Notifications from 'react-notification-system-redux';

//action type
const GET_ALL_EXPENSE_BY_USER_REQUEST = 'GET_ALL_EXPENSE_BY_USER_REQUEST';
const GET_ALL_EXPENSE_BY_USER_SUCCESS = 'GET_ALL_EXPENSE_BY_USER_SUCCESS';
const GET_ALL_EXPENSE_BY_USER_ERROR = 'GET_ALL_EXPENSE_BY_USER_ERROR';

const DELETE_EXPENSE_BY_EXPENSE_ID_REQUEST = 'DELETE_EXPENSE_BY_EXPENSE_ID_REQUEST';
const DELETE_EXPENSE_BY_EXPENSE_ID_SUCCESS = 'DELETE_EXPENSE_BY_EXPENSE_ID_SUCCESS';
const DELETE_EXPENSE_BY_EXPENSE_ID_ERROR = 'DELETE_EXPENSE_BY_EXPENSE_ID_ERROR';

const DELETE_MANY_EXPENSE_BY_EXPENSE_ID_REQUEST = 'DELETE_MANY_EXPENSE_BY_EXPENSE_ID_REQUEST';
const DELETE_MANY_EXPENSE_BY_EXPENSE_ID_SUCCESS = 'DELETE_MANY_EXPENSE_BY_EXPENSE_ID_SUCCESS';
const DELETE_MANY_EXPENSE_BY_EXPENSE_ID_ERROR = 'DELETE_MANY_EXPENSE_BY_EXPENSE_ID_ERROR';  

//foreign action type
const NEW_EXPENSE_SUCCESS = 'NEW_EXPENSE_SUCCESS';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 6
};


export default(state = {
    listOfExpense: [],
    getAllExpenseRequestPending: false
}, action) => {
    switch (action.type) {
        case GET_ALL_EXPENSE_BY_USER_REQUEST:
            return state = {
                ...state,
                getAllExpenseRequestPending: true
            };

        case GET_ALL_EXPENSE_BY_USER_SUCCESS:
            return state = {
                ...state,
                listOfExpense: action.payload
            };

        case GET_ALL_EXPENSE_BY_USER_ERROR:
            return state = {
                ...state,
                getAllExpenseRequestPending: false
            };

        case NEW_EXPENSE_SUCCESS:
            return state = {
                ...state,
                listOfExpense: [...state.listOfExpense, action.payload]
            };

        case DELETE_EXPENSE_BY_EXPENSE_ID_REQUEST:
            return state = {
                ...state,
                getAllExpenseRequestPending: true
            }
        
        case DELETE_EXPENSE_BY_EXPENSE_ID_SUCCESS:
            return state = {
                ...state,
                getAllExpenseRequestPending: false,
                listOfExpense: state.listOfExpense.filter(x => x.id !== action.payload)
            }

        case DELETE_MANY_EXPENSE_BY_EXPENSE_ID_REQUEST:
            return state = {
                ...state
            }

        case DELETE_MANY_EXPENSE_BY_EXPENSE_ID_SUCCESS:            
            return state = {
                ...state,
                listOfExpense: state.listOfExpense.filter(x => {  
                    let exist = false;
                    exist = action.payload.some((id) => id == x.id);
                    if(!exist){
                        return x;
                    }
                })
            }
    }

    return state;
}

const deleteManyExpenseRequest = () => ({
    type: DELETE_MANY_EXPENSE_BY_EXPENSE_ID_REQUEST
})

const deleteManyExpenseSuccess = (listOfIds) => ({
    type: DELETE_MANY_EXPENSE_BY_EXPENSE_ID_SUCCESS,
    payload: listOfIds
})

const getAllExpenseRequest = () => ({
    type: GET_ALL_EXPENSE_BY_USER_REQUEST
});

const getAllExpenseSuccess = (expense) => ({
    type: GET_ALL_EXPENSE_BY_USER_SUCCESS,
    payload: expense
});

const getAllExpenseError = () => ({
    type: GET_ALL_EXPENSE_BY_USER_ERROR
})

const deleteExpenseByIdSuccess = (expenseId) => ({
    type: DELETE_EXPENSE_BY_EXPENSE_ID_SUCCESS,
    payload: expenseId
})


//api calls

export const getAllExpenseByUserId = (userId) => (dispatch) => {

    client.get(`api/Expense/GetAllExpenseByUserId?UserId=${userId}`)
    .then( response => {
        dispatch(getAllExpenseSuccess(response.data));
    }).catch( error => {
        console.log(error, 'error')
    })
}

export const deleteExpenseById = (expenseId, closeBasicDialog) => (dispatch) => {
    client.delete(`api/Expense/DeleteExpenseByExpenseId?ExpenseId=${expenseId}`)
    .then(response => {
        dispatch(deleteExpenseByIdSuccess(response.data));

        dispatch(Notifications.success({
            ...notificationOpts,
            message: 'Successfully deleted selected expense ',
            title: 'SUCCESS'
        }));

        closeBasicDialog();
    })
}

export const deleteManyExpenseById = (expenseToRemove, closeDialog) => (dispatch) => {
    dispatch(deleteManyExpenseRequest());

    var data = {
        expense: expenseToRemove
    }

    client.post('api/Expense/DeleteManyExpenseByIds', data).then(response => {
            dispatch(deleteManyExpenseSuccess(response.data));
            
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Successfully deleted selected expense ',
                title: 'SUCCESS'
            }));
            closeDialog();

    }).catch(error => {
        console.log(error)
    })


}



