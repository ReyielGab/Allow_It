import React from 'react';
import Radium, { StyleRoot } from 'radium';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as duck from '../duck';
import ExpenseNew from '../components/new';

// *** material-ui components
import Dialog from 'material-ui/Dialog';


@connect(
    state => (state.expenseNewReducer),
    dispatch => ({ actions: bindActionCreators(duck, dispatch) })
)


@Radium
class ExpenseNewContainer extends React.Component {

    onSave(value) {
        const { userId, actions: { addNewExpense } } = this.props;
        value['userId'] = userId;
        
        addNewExpense(value);
    }
    
    render() {
        const { openNewDialog, closeNewDialog } = this.props;
        
        return(
            <StyleRoot>            
                <Dialog
                    open={openNewDialog}
                    onRequestClose={closeNewDialog}
                    children={
                        <ExpenseNew 
                        closeNewDialog={closeNewDialog}
                        onSubmit={this.onSave.bind(this)}
                        />
                    }
                
                />
            </StyleRoot>
        )
    }

}

export default ExpenseNewContainer;




