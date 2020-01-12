import React from 'react';
import Radium, { StyleRoot } from 'radium';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** material-ui components
import Dialog from 'material-ui/Dialog';

import UserInfoNew from '../components/new';

const styles = {
        dialogBodyStyle: {
        minHeight: '440px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
    },
};

@connect(
    state => state.userInfoNewReducer,
    dispatch => ({ actions: bindActionCreators(duck, dispatch) })
)


@Radium
class UserNewInfoContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { openDialog, closeDialog, newUserInfoRequestPending } = this.props;
        return (
            <StyleRoot>
                <Dialog
                    open={openDialog}
                    modal={false}
                    bodyStyle={styles.dialogBodyStyle}
                    // onRequestClose={closeDialog}
                >
                <UserInfoNew 
                closeDialog={closeDialog}
                onSubmit={this.onSave.bind(this)}
                newUserInfoRequestPending={newUserInfoRequestPending}
                />
                </Dialog>
            </StyleRoot>
        )
    }
onSave(values) {
    const { closeDialog, userInfo , actions : { newUserInfo } } = this.props;
    

    values['Id'] = userInfo.id;
    newUserInfo({
        ...values
    }, closeDialog)

}

}

export default UserNewInfoContainer;