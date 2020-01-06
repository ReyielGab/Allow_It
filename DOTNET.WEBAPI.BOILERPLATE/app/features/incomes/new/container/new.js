import React from 'react';
import Radium, { StyleRoot } from 'radium';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import IncomeNew from '../components/new.js';

import * as duck from '../duck.js';

// *** material-ui components
import Dialog from 'material-ui/Dialog';

@connect(
    state => (state.incomeNewReducer),
    dispatch => ({ actions: bindActionCreators(duck, dispatch) })
)


@Radium
class NewIncomeContainer extends React.Component{    

    onSave(value) {
        const { userId, actions: { addNewIncome } } = this.props;
        value['userId'] = userId;
        
        addNewIncome(value);
    }

    render(){
        const { openNewIncomeDialog, closeNewIncomeDialog } = this.props;
        return(
            <StyleRoot> 
                <Dialog
                open={openNewIncomeDialog}
                onRequestClose={closeNewIncomeDialog}
                children={
                    <IncomeNew 
                    closeNewIncomeDialog={closeNewIncomeDialog}
                    onSubmit={this.onSave.bind(this)}
                    />
                }
            
                />
            </StyleRoot>
        )
    }
}


export default NewIncomeContainer;
