import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { reduxForm, Field } from 'redux-form';

// ** material-ui
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import { TextField } from 'redux-form-material-ui';
import { DatePicker } from 'redux-form-material-ui'

import { required, number } from '../../../../util/validation';

import { decimalOnly } from '../../../../util/normalize'

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
        marginTop: '120px',

        left: {
            marginLeft: '12px'
        }
    }
};

@reduxForm({
    form: 'newUserForm',
    initialValues: { incomeDate: new Date() }
})

@Radium
class UserNew extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { closeDialog, handleSubmit, newUserPendingRequest } = this.props;
        return (
            <StyleRoot style={styles.container}>
                <form onSubmit={handleSubmit}>
                    <h1 style={styles.title} >User - New</h1>
                    <p style={styles.subtitle}>Create new user</p>

                    <div style={styles.contentWrapper}>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Field
                                name="firstname"
                                component={TextField}
                                hintText="First Name"
                                floatingLabelText="First Name"                                
                                validate={required}
                                normalize={capitalizeFirstLetter}
                            />

                            <Field
                                name="middlename"
                                component={TextField}
                                hintText="Middle Name"
                                floatingLabelText="Middle Name"
                                validate={required}
                                normalize={capitalizeFirstLetter}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Field
                                name="lastname"
                                component={TextField}
                                hintText="Last Name"
                                floatingLabelText="Last Name"
                                validate={required}
                                normalize={capitalizeFirstLetter}
                            />

                            <Field
                                name="age"
                                component={TextField}
                                hintText="Age"
                                floatingLabelText="Age"
                                validate={[required, number]}
                            />
                        </div>                       

                    </div>

                    <div style={{ marginTop: '15px' }}></div>
                    <h1 style={styles.title} >Income - New</h1>
                    <p style={styles.subtitle}>Income details</p>

                    <div style={styles.contentWrapper}>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Field
                                name="description"
                                component={TextField}
                                hintText="Description"
                                floatingLabelText="Description"
                                validate={required}
                                normalize={capitalizeFirstLetter}
                            />

                            <Field
                                name="total"
                                component={TextField}
                                hintText="Total Income"
                                floatingLabelText="Total Income"
                                validate={[required, number]}
                                normalize={decimalOnly}
                            />
                        </div>

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
                                name="remarks"
                                component={TextField}
                                hintText="Remarks"
                                floatingLabelText="Remarks"
                            />
                        </div>
                    </div>

                    {!newUserPendingRequest ?
                        <div style={styles.buttonWrapper}>
                            <RaisedButton
                                label="CLOSE"
                                style={styles.buttonWrapper.left}
                                onTouchTap={closeDialog.bind(this)}
                            />

                            <RaisedButton
                                type="submit"
                                label="SAVE AND CREATE NEW"
                                style={styles.buttonWrapper.left}
                                secondary={true}
                            />
                        </div> :
                        <div style={styles.loadingStyle}> <CircularProgress size={80} thickness={5} /> </div>}

            

                </form>
            </StyleRoot>
        )
    }
}

export default UserNew;