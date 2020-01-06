import React from 'react';
import Radium, { StyleRoot } from 'radium';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ExpenseList from '../components/list';
import Subheader from '../../../../shared-components/subheader';
import * as duck from '../duck';

@connect(
    state => state.expenseListReducer,
    dispatch => ({ actions: bindActionCreators(duck, dispatch )})
)

@Radium
class ExpenseListContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { params, actions: { getAllExpenseByUserId } } = this.props;
        getAllExpenseByUserId(params.id);
    }



    render() {
        const { listOfExpense, params, actions: { deleteExpenseById, deleteManyExpenseById } } = this.props
        console.log(listOfExpense, 'container');
        return(
            <StyleRoot>
                <Subheader />
                <ExpenseList
                    user={params}
                    listOfExpense={listOfExpense}
                    deleteExpenseById={deleteExpenseById}
                    deleteManyExpenseById={deleteManyExpenseById}
                />
            </StyleRoot>
        )
    }





}


export default ExpenseListContainer;