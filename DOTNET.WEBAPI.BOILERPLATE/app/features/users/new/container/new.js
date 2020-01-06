import React from 'react';
import Radium, { StyleRoot } from 'radium';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** material-ui components
import Dialog from 'material-ui/Dialog';

import UserNew from '../components/new';

const styles = {
        dialogBodyStyle: {
        minHeight: '440px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
    },
};

@connect(
    state => state.userNewReducer,
    dispatch => ({ actions: bindActionCreators(duck, dispatch) })
)


@Radium
class UserNewContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { openDialog, closeDialog, newUserPendingRequest } = this.props;
        return (
            <StyleRoot>
                <Dialog
                    open={openDialog}
                    modal={false}
                    bodyStyle={styles.dialogBodyStyle}
                    onRequestClose={closeDialog}
                >
                <UserNew 
                closeDialog={closeDialog}
                onSubmit={this.onSave.bind(this)}
                newUserPendingRequest={newUserPendingRequest}
                />
                </Dialog>
            </StyleRoot>
        )
    }
onSave(values) {
    const { closeDialog , actions : { newUser } } = this.props;

    newUser({
        ...values
    }, closeDialog)

}

}

export default UserNewContainer;