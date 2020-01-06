import React from 'react';
import Radium, { StyleRoot } from 'radium';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** material-ui components
import Dialog from 'material-ui/Dialog';

import UserEdit from '../components/edit';


const styles = {
    dialogBodyStyle: {
        minHeight: '440px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
    }
};

@connect(
    state => state.userEditReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)

@Radium
class UserEditContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    onSetDefaultValues() {
        const { selectedUser } = this.props;
        console.log(selectedUser, 'selectedUser')

        return {
            initialValues : {
                firstname: selectedUser.firstname,
                middlename: selectedUser.middlename,
                lastname: selectedUser.lastname,
                age: selectedUser.age                
            }
        }
    }

    onSave(value) {
        const { selectedUser, closeDialog, actions: { editSelectedUser } } = this.props;

        value['id'] = selectedUser.id;

        editSelectedUser(value, closeDialog);
    }

    render() {
        const { closeDialog, openDialog, selectedUser } = this.props;
        return (
            <StyleRoot>
                <Dialog
                open={openDialog}
                modal={ false }
                bodyStyle={styles.dialogBodyStyle}
                onRequestClose={closeDialog}>

                <UserEdit
                    { ...this.onSetDefaultValues() }
                    onSubmit={this.onSave.bind(this)}
                    closeDialog={closeDialog}
                />

                </Dialog>

            </StyleRoot>
        )
    }
}

export default UserEditContainer;