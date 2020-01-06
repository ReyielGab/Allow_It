import client from '../../../api.js';
import Notifications from 'react-notification-system-redux';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 6
};

const NEW_INCOME_REQUEST = 'NEW_INCOME_REQUEST';
const NEW_INCOME_SUCCESS = 'NEW_INCOME_SUCCESS';
const NEW_INCOME_ERROR = 'NEW_INCOME_ERROR';


export default (state ={
    newIncomeRequestPending: false
}, action ) => {
    switch(action.type) {
        case NEW_INCOME_REQUEST:
            return state = {
                ...state,
                newIncomeRequestPending: true
            }

        case NEW_INCOME_SUCCESS:
            return state = {
                ...state,
                newIncomeRequestPending: false,
            }

        case NEW_INCOME_ERROR:
            return state ={
                ...state,
                newIncomeRequestPending: false
            }

    }
    return state;
}


const newIncomeRequest = () => ({
    type: 'NEW_INCOME_REQUEST'
})

const newIncomeSuccess = (income) => ({
    type: 'NEW_INCOME_SUCCESS',
    payload: income
})

const newIncomeError = () => ({
    action: 'NEW_INCOME_ERROR'
})


export const addNewIncome = (newIncome, closeDiag) => (dispatch) => {
    dispatch(newIncomeRequest());

    const income = {
        date: newIncome.incomeDate,
        total: newIncome.totalIncome,
        description: newIncome.description,
        remarks: newIncome.remarks,
        userId: newIncome.userId
    }

    client.post('api/Income/NewIncome', income)
    .then(response => {
        dispatch(newIncomeSuccess(response.data));

        dispatch(Notifications.success({
            ...notificationOpts,
            message: 'Successfully deleted selected income ',
            title: 'SUCCESS'
        }));

        closeDiag();
    }).catch(error => {
        console.log(error)
    })
}