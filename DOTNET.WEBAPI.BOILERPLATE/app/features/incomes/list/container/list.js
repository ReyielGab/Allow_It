import React from 'react';
import Radium, { StyleRoot } from 'radium';
import Subheader from '../../../../shared-components/subheader';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import IncomeList from  '../components/list';


import * as duck from '../duck';


@connect(
    state => state.incomeListReducer,
    dispatch => ({ actions: bindActionCreators(duck, dispatch) })
)

@Radium
class IncomeListContainer extends React.Component {

    componentWillMount() {
        const { params,  actions: { getIncomeByUserId } } = this.props;
        getIncomeByUserId(params.id);
    }
   
    render() {
       const {params, listOfIncome, actions: { getIncomeByUserId, deleteIncomeByUserId, deleteManyIncome } } = this.props;
        console.log(listOfIncome,'container');
       return(            
        <StyleRoot>
            <Subheader />
           <IncomeList
            listOfIncome={listOfIncome}
            deleteIncomeByUserId={deleteIncomeByUserId}
            userId={params.id}
            deleteManyIncome={deleteManyIncome}
           />
        </StyleRoot>
       )
    }
}

export default IncomeListContainer;



