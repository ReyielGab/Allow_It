import React from 'react';
import Radium, { StyleRoot } from 'radium';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EditIncome from '../components/edit';

import * as duck from '../duck';


// *** material-ui components
import Dialog from 'material-ui/Dialog';

const styles = {
    dialogBodyStyle: {
        minHeight: '440px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
    }
};

@connect(
    state => state.editIncomeReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)


@Radium
class EditIncomeContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    onSetDefaultValues(){
        const { selectedIncome } = this.props;
        return selectedIncome == null ? null : { 
            initialValues: {
                description: selectedIncome.description,
                remarks: selectedIncome.remarks,
                incomeDate:  new Date(selectedIncome.date),  
                totalIncome : selectedIncome.total
            }
        }
    }

    onSave(value) {
        const { onCloseEditIncome, selectedIncome, actions: { editIncome } } = this.props;
        value['id'] = selectedIncome.id;
        editIncome(value, onCloseEditIncome);
    }

    render(){
        const { onCloseEditIncome, openEditDialog } = this.props;
   
        return(
            <StyleRoot>
                <Dialog 
                    open={openEditDialog}
                    modal={ false }
                    bodyStyle={styles.dialogBodyStyle}
                    onRequestClose={onCloseEditIncome} >
                        <EditIncome   
                            {...this.onSetDefaultValues()}
                            onCloseEditIncome={onCloseEditIncome}
                            onSubmit={this.onSave.bind(this)}
                        />


                </ Dialog >
                
               
            </StyleRoot>
        )
    }
}


export default EditIncomeContainer;
