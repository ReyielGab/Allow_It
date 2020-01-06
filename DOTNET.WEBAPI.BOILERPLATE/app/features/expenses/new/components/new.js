import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { reduxForm, Field } from 'redux-form';

import { decimalOnly } from '../../../../util/normalize'

import colorPalette from '../../../../util/styles/color-pallete';

// ** material-ui
import { TextField , SelectField} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { required } from '../../../../util/validation';
import { DatePicker } from 'redux-form-material-ui'
import { MenuItem } from 'material-ui';




const styles = {
    container: {
        width: '100%',
        height: '100%'
    },

    title: {
        color: colorPalette.primaryColor,
        fontWeight: 400,
        fontSize: '18px',
        margin: 0
    },

    subtitle: {
        color: colorPalette.primaryTextColor,
        fontSize: '14px'
    },

    contentWrapper: {
        display: 'flex',
        flexDirection: 'column'
    },

    buttonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: '134px',

        left: {
            marginLeft: '12px'
        }
    }
};

@reduxForm({
    form: 'expenseNewForm',
    initialValues: { expenseDate: new Date() }
})



@Radium
class ExpenseNew extends React.Component {
    render() {
        const { closeNewDialog, handleSubmit } = this.props;
        return(
            <StyleRoot style={styles.container}>
                <form onSubmit={handleSubmit}>

                    <h1 style={styles.title} >Expense - New</h1>
                    <p style={styles.subtitle}>Add new expense</p>


                    <div style={styles.contentWrapper}>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Field
                                name="expenseDate"
                                component={DatePicker}
                                hintText="Date"
                                floatingLabelText="Date"
                                validate={required}
                                format={null}
                            />

                            <Field
                                name="description"
                                component={TextField}
                                hintText="Payment Type"
                                floatingLabelText="Payment Type"
                                validate={required}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Field
                                name="status"
                                component={SelectField}
                                hintText="Status"
                                floatingLabelText="Status"
                                validate={required}
                            >

                                <MenuItem value={0} primaryText="In Progress"/>
                                <MenuItem value={1} primaryText="Submitted"/>
                                <MenuItem value={2} primaryText="Rejected"/>
                                <MenuItem value={3} primaryText="Approved"/>

                            </Field>

                            <Field
                                name="total"
                                component={TextField}
                                hintText="Total Amount"
                                floatingLabelText="Total Amount"
                                validate={required}
                                normalize={decimalOnly}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Field
                                name="remarks"
                                component={TextField}
                                hintText="Remarks"
                                floatingLabelText="Remarks"
                            />
                        </div>
                    </div>


                    <div style={styles.buttonWrapper}>
                        <RaisedButton
                            label="CLOSE"
                            style={styles.buttonWrapper.left}
                            onTouchTap={closeNewDialog.bind(this)}
                        />

                        <RaisedButton
                            type="submit"
                            label="SAVE AND CREATE NEW"
                            style={styles.buttonWrapper.left}
                            secondary={true}
                        />
                    </div>

                </form>
            </StyleRoot>
        )
    }

}


export default ExpenseNew;

