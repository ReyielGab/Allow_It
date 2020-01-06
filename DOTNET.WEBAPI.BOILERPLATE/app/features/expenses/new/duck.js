
import client from '../../../api.js';
import Notifications from 'react-notification-system-redux';
import { reset } from 'redux-form';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 6
};


const NEW_EXPENSE_REQUEST = 'NEW_EXPENSE_REQUEST';
const NEW_EXPENSE_SUCCESS = 'NEW_EXPENSE_SUCCESS';
const NEW_EXPENSE_ERROR = 'NEW_EXPENSE_ERROR';




export default(state = {
    newExpensePending: false
}, action) => {


    switch(action.type) {
        case NEW_EXPENSE_REQUEST:
            return state = {
                ...state,
                newExpensePending: true
            };

        case NEW_EXPENSE_SUCCESS:
            return state = {
                ...state,
                newExpensePending: false
            };

        case NEW_EXPENSE_ERROR:
            return state = {
                ...state,
                newExpensePending: false
            }
    }

    return state;
}


const newExpenseRequest = () => ({
    type: NEW_EXPENSE_REQUEST
})

const newExpenseSuccess = (newExpense) => ({
    type: NEW_EXPENSE_SUCCESS,
    payload: newExpense
})

const newExpenseError = () => ({
    type: NEW_EXPENSE_ERROR
})

export const addNewExpense = (newExpense) => (dispatch) => {
    dispatch(newExpenseRequest());

    client.post('api/Expense/NewExpense', newExpense).then(response => {

        dispatch(newExpenseSuccess(response.data));

        dispatch(Notifications.success({
            ...notificationOpts,
            message: 'Successfully added expense',
            title: 'SUCCESS'
        }));
        dispatch(reset('expenseNewForm'));

    })
    .catch(error => {
        dispatch(newExpenseError(error));
        console.log(error);
    });
}


