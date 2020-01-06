import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { reduxForm, Field } from 'redux-form';

// ** material-ui
import { TextField } from 'redux-form-material-ui';
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
    form: 'editUserForm'
})

@Radium
class UserEdit extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { closeDialog, handleSubmit } = this.props;
        return (
            <StyleRoot>
                <form onSubmit={handleSubmit}>
                    <h1 style={styles.title} >User - Edit</h1>
                    <p style={styles.subtitle}>Edit selected user</p>

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

                        <div style={styles.buttonWrapper}>
                            <RaisedButton
                                label="CLOSE"
                                style={styles.buttonWrapper.left}
                                onTouchTap={closeDialog.bind(this)}
                            />

                            <RaisedButton
                                type="submit"
                                label="SAVE"
                                style={styles.buttonWrapper.left}
                                secondary={true}
                            />
                        </div>


                    </div>
                </form>
            </StyleRoot>
        )
    }
}

export default UserEdit;