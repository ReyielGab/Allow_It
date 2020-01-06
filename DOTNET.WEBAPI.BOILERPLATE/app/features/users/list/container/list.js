import React from 'react';
import Radium, { StyleRoot } from 'radium';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UsersList from '../components/list'
import * as duck from '../duck';

const styles = {

};

@connect(
    state => state.usersListReducer,
    dispatch => ({ actions: bindActionCreators(duck, dispatch) })
)

@Radium
class UsersListContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { actions: { getListOfUsers } } = this.props;

        getListOfUsers();
    }

    render() {
        const { usersList, userListRequestPending, actions: { deleteSelectedUser, getUserListFiteredByMonth } } = this.props;
        return (
            <StyleRoot>
                <div style={{marginTop: '36px'}}>                    
                               
                    <UsersList
                        usersList={usersList}
                        deleteSelectedUser={deleteSelectedUser}
                        userListRequestPending={userListRequestPending}
                        getUserListFiteredByMonth={getUserListFiteredByMonth}
                    />
                    
                </div>

            </StyleRoot>
        )
    }
}

export default UsersListContainer;