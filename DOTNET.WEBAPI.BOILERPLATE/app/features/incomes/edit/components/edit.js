import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { reduxForm, Field } from 'redux-form';

import { TextField, DatePicker } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import { required, number } from '../../../../util/validation';

import colorPalette from '../../../../util/styles/color-pallete';

import { capitalizeFirstLetter } from '../../../../util/normalize';

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
    form: 'editIncomeForm'
})


@Radium
class EditIncome extends React.Component {

    render() {
        const { onCloseEditIncome, handleSubmit } = this.props;

        return (
            <StyleRoot>
                <form onSubmit={handleSubmit}>
                    <h1 style={styles.title} >Income - Edit</h1>
                    <p style={styles.subtitle}>Edit selected income</p>

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
                            onTouchTap={onCloseEditIncome.bind(this)}
                        />

                        <RaisedButton
                            type="submit"
                            label="SAVE"
                            style={styles.buttonWrapper.left}
                            secondary={true}
                        />
                    </div>




                </form>
            </StyleRoot>
        )
    }

}



export default EditIncome;