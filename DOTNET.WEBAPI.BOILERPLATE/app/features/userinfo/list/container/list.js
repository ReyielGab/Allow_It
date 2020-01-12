import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as duck from '../duck';
import Subheader from '../../../../shared-components/subheader';

import UserInfo from '../components/list';

@connect(
    (state) => state.userInfoReducer,
    (dispatch) => ({actions: bindActionCreators(duck, dispatch)})
)


@Radium
class UserInfoContainer extends React.Component{

    componentWillMount() {
        const { params, actions: { getUserInfo } } = this.props;
        // const { actions: { getUserInfo } } = this.props;

        // getUserInfo(params.id);
        getUserInfo(params.id);
    }

    render(){
        const { userInfo, actions: { getUserListFiteredByMonth } } = this.props;
        console.log(userInfo, 'container');
        return(
            <StyleRoot>
                <Subheader userInfo={userInfo} />
                <div style={{ marginTop: '36px' }}>
                    <UserInfo
                        userInfo={userInfo}
                        isNewUser={userInfo ? !userInfo.firstname ? true : false : false}
                    // deleteSelectedUser={deleteSelectedUser}
                    // userListRequestPending={userListRequestPending}
                        getUserListFiteredByMonth={getUserListFiteredByMonth}
                    />
                </div>
            </StyleRoot>
        )
    }
}

export default UserInfoContainer;



