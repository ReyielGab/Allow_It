import client from '../../../api.js';
import Notifications from 'react-notification-system-redux';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 6
};

const EDIT_INCOME_REQUEST = 'EDIT_INCOME_REQUEST';
const EDIT_INCOME_SUCCESS = 'EDIT_INCOME_SUCCESS';
const EDIT_INCOME_ERROR = 'EDIT_INCOME_ERROR'; 



export default (state = {
    
}, action) => {
    switch(action.type) {
        case EDIT_INCOME_REQUEST:
            return state = {
                ...state
            }
        
        case EDIT_INCOME_SUCCESS:
            return state = {
                ...state
            }

        case EDIT_INCOME_ERROR:
            return state = {
                ...state
            }
        
    }


    return state;
}



const editIncomeRequest = () => ({
    type: 'EDIT_INCOME_REQUEST'
})

const editIncomeSuccess = (income) => ({
    type: 'EDIT_INCOME_SUCCESS',
    payload: income
})

const editIncomeError = () => ({
    type: 'EDIT_INCOME_ERROR'
})


export const editIncome = (selectedIncome, closeDiag) => (dispatch) => {
    dispatch(editIncomeRequest());

    const data = {
        income: {
            description: selectedIncome.description,
            remarks: selectedIncome.remarks,
            date: selectedIncome.incomeDate,
            total: selectedIncome.totalIncome,
            id: selectedIncome.id
        }
    }

    client.put('api/Income/EditIncome?Income', data).then(response => {
        dispatch(editIncomeSuccess(response.data));

        dispatch(Notifications.success({
            ...notificationOpts,
            title: 'SUCCESS',
            message: `Sucessfully edit ${response.data.description}`
        }));

        closeDiag();

    }).catch(error => {
        console.log(error)
    })

}