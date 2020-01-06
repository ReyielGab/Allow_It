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
    form: 'incomeNewForm',
    initialValues: { incomeDate: new Date() }
})

@Radium
class IncomeNew extends React.Component{

    render() {
        const { handleSubmit, closeNewIncomeDialog } = this.props;

        return(
            <StyleRoot style={styles.container}>
                <form onSubmit={handleSubmit}>
                    <h1 style={styles.title} >Income - New</h1>
                    <p style={styles.subtitle}>Add new income</p>

                    <div style={styles.contentWrapper}>
                         <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Field
                                name="incomeDate"
                                component={DatePicker}
                                hintText="Date"
                                floatingLabelText="Date"
                                validate={required}
                                format={null}
                            />

                            <Field
                                name="description"
                                component={TextField}
                                hintText="Category"
                                floatingLabelText="Category"
                                validate={required}
                            />
                        </div>
                    </div>

                    <div style={styles.contentWrapper}>
                         <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Field
                                name="totalIncome"
                                component={TextField}
                                hintText="Total Income"
                                floatingLabelText="Total Income"
                                validate={required}
                            />

                            <Field
                                name="remarks"
                                component={TextField}
                                hintText="Remarks"
                                floatingLabelText="Remarks"
                                validate={required}
                            />
                        </div>
                    </div>

                    <div style={styles.buttonWrapper}>
                        <RaisedButton
                            label="CLOSE"
                            style={styles.buttonWrapper.left}
                            onTouchTap={closeNewIncomeDialog.bind(this)}
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


export default IncomeNew;