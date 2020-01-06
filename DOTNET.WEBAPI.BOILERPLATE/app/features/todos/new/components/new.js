import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { reduxForm, Field } from 'redux-form';

// ** material-ui
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import { required } from '../../../../util/validation';

import colorPalette from '../../../../util/styles/color-pallete';

import { DatePicker } from 'redux-form-material-ui'



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
    form: 'newTodoForm'
})

@Radium
class TodoNew extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { closeDialog, handleSubmit } = this.props;
        return (
            <StyleRoot style={styles.container}>
                <form onSubmit={handleSubmit}>
                    <h1 style={styles.title} >To Do - New</h1>
                    <p style={styles.subtitle}>Create new to do</p>

                    <div style={styles.contentWrapper}>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Field
                                name="todos"
                                component={TextField}
                                hintText="To Do"
                                floatingLabelText="To Do"                                
                                validate={required}
                            />

                            <Field
                                name="todoDate"
                                component={DatePicker}
                                hintText="Date"
                                floatingLabelText="Date"
                                format={null}
                            />
                        </div>
                    </div>

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
                    </div>
                </form>
            </StyleRoot>
        )
    }
}

export default TodoNew;