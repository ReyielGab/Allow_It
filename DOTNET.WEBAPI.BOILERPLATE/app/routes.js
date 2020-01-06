import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

//App

import MainContainer from './features/main/container/main';
import UsersListContainer from './features/users/list/container/list';
//import TodoListContainer from './features/todos/list/container/list';
import ExpenseListContainer from './features/expenses/list/container/list';
import IncomeListContainer from './features/incomes/list/container/list';


import { syncHistoryWithStore } from 'react-router-redux'
import store from './store';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

export default () => {
    return (
        <Router history={history}>

            <Route path="/" component={MainContainer}>
                <IndexRoute component={UsersListContainer} />
            </Route>

            {/* <Route path="/view-todos/:id" component={TodoListContainer} /> */}
            <Route path="/view-expense/:id" component={ExpenseListContainer}/>
            <Route path="/view-income/:id" component={IncomeListContainer} />
        </Router>
    );
}