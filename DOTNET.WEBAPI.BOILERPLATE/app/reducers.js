import { reducer as notifications } from 'react-notification-system-redux';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';


import mainPageReducer from './features/main/duck';

import usersListReducer from './features/users/list/duck';
import userEditReducer from './features/users/edit/duck';
import userNewReducer from './features/users/new/duck';

import todoListReducer from './features/todos/list/duck';
import todoNewReducer from './features/todos/new/duck';

import expenseListReducer from './features/expenses/list/duck';
import expenseNewReducer from './features/expenses/new/duck';

import incomeListReducer from './features/incomes/list/duck';
import incomeNewReducer from './features/incomes/new/duck';
import editIncomeReducer from './features/incomes/edit/duck';


const appReducer = combineReducers({
    form,
    notifications,
    routing : routerReducer,
    mainPageReducer,
    usersListReducer,
    todoListReducer,
    userNewReducer,
    todoNewReducer,
    userEditReducer,
    expenseListReducer,
    expenseNewReducer,
    incomeListReducer,
    incomeNewReducer,
    editIncomeReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'APP_USER_LOGOUT') {
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer;