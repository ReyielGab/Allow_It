import React from 'react';
import Radium, { StyleRoot } from 'radium';

import UserInfoListItem from './list-items';

// * material-ui
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';

import BasicDialog from '../../../../shared-components/basic-dialog';
import MonthPicker from '../../../../shared-components/custom-component/month-picker';
import colorPallete from '../../../../util/styles/color-pallete'

import UserInfoNew from '../../new/container/new';
// import UserEditContainer from '../../edit/container/edit';

const styles = {    
    header: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    headerText: {
        color: colorPallete.primaryTextColor,
        fontSize: '24px',
        margin: '10px 0px 0px 10px'
    },
    loadingStyle: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '20px'
    }

};

// *** dialog options
const basicDialogOpts = {
    title : 'Do you want to remove',
    subtitle : 'This User will be permanently removed.',
    highlightTitle : null,
    open : false,
    closeDialog : null,
    actions: []    
};



@Radium
class UserInfoList extends React.Component {
    constructor(props) {
        super(props);

        const d = new Date();

        this.state = {
           // openNewUserDialog: false,
            openEditUserDialog: false,
            selectedUser: null,
            basicDialogOpts: basicDialogOpts,
            monthValue: d.getMonth()
        }
    }

    // componentDidUpdate(prevProps) {
    //     const { userInfo } = this.props;
    //     if(!userInfo.firstname) {
    //         this.setState({
    //             openNewUserDialog: true
    //         })
    //     }
    // }

    onDisplayListOfUsers() {
        const { userInfo } = this.props;
        console.log(userInfo, 'display');

        if(!userInfo) {
            return <div style={styles.loadingStyle}> <CircularProgress size={80} thickness={5} /> </div>
        }
        else {
          return  <UserInfoListItem
                    user={userInfo}
                  />
        }
            
        // return userInfo.map((user, index) => (
        //     <UserInfoListItem
        //         key={index}
        //         user={user}
        //         openEditUserDialog={this.onOpenEditUserDialog.bind(this)}
        //         openDeleteUserDialog={this.onOpenDeleteUserDialog.bind(this)}
        //     />
        // ))
    }

    // onOpenNewUserDialog() {
    //     this.setState({
    //         openNewUserDialog: true
    //     });
    // }

    // onCloseNewUserDialog() {
    //     this.setState({
    //         openNewUserDialog: false
    //     })
    // }

    onOpenEditUserDialog(selectedUser) {
        this.setState({
            openEditUserDialog: true,
            selectedUser: selectedUser
        })
    }

    onCloseEditUserDialog() {
        this.setState({
            openEditUserDialog: false
        })
    }

    onOpenDeleteUserDialog(user, event) {
        event.preventDefault();
        this.setState({
            basicDialogOpts: {
                ...basicDialogOpts,
                highlightTitle : `User - ${user.firstname} ${user.middlename} ${user.lastname}`,
                open : true,
                closeDialog : this.onCloseBasicDialog.bind(this),

                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action : this.onDeleteSelectedUser.bind(this, user), 
                        secondary : true
                    }
                ]
            }
        })
    }

    onDeleteSelectedUser(selectedUser, event) {
        event.preventDefault();
        const { deleteSelectedUser } = this.props;

        deleteSelectedUser(selectedUser.id, this.onCloseBasicDialog.bind(this));

    }

    onCloseBasicDialog() {

        this.setState({ 
            basicDialogOpts: { ...basicDialogOpts, open: false } 
        });
    }

    onSamp(event, month) {
        event.preventDefault();
        const { getUserListFiteredByMonth, userInfo } = this.props;

        var getSelectedMonth = month + 1;

        var selectedMonth = new Date(getSelectedMonth.toString());

        getUserListFiteredByMonth(selectedMonth, userInfo.id);

        this.setState({
            monthValue: month
        });
    }

    render() {
        const { userInfo, userListRequestPending, isNewUser } = this.props;
        return (
            <StyleRoot>
                <div style={styles.header}>
                    {/* <label style={styles.headerText}> List of Users </label> */}

                    <div style={{ display: 'flex' }}>
                        <div>
                            <MonthPicker
                                handleChange={this.onSamp.bind(this)}
                                monthValue={this.state.monthValue}
                            />
                        </div>

                        <div>
                            {/* <FloatingActionButton title="ADD NEW USER" backgroundColor={colorPallete.baseColor} style={{ marginRight: '10px' }} 
                            // onTouchTap={this.onOpenNewUserDialog.bind(this)}
                            >
                                <ContentAdd />
                            </FloatingActionButton> */}
                        </div>
                    </div>
              

                </div>
                {/* <div style={{ width: '100%' }}>
                    <span style={{ marginLeft: '10px' }}> Total of {usersList.length} User/s </span>
                </div> */}

                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}>
                        <TableRow>
                            {/* <TableHeaderColumn>ID</TableHeaderColumn> */}
                            {/* <TableHeaderColumn>FULL NAME</TableHeaderColumn>
                            <TableHeaderColumn>AGE</TableHeaderColumn> */}
                            <TableHeaderColumn>INCOME</TableHeaderColumn>
                            <TableHeaderColumn>EXPENSE</TableHeaderColumn>
                            <TableHeaderColumn>BALANCE</TableHeaderColumn>
                            <TableHeaderColumn>TOTAL EXPENSE ITEM</TableHeaderColumn>
                            <TableHeaderColumn>BALANCE CARRIED OVER</TableHeaderColumn>
                            <TableHeaderColumn> </TableHeaderColumn>
                        </TableRow>

                    </TableHeader>

                    <TableBody
                        showRowHover={true}
                        displayRowCheckbox={false}>
                          
                            { this.onDisplayListOfUsers() }
                        {/* {!userListRequestPending ? this.onDisplayListOfUsers() : <div style={styles.loadingStyle}> <CircularProgress size={80} thickness={5} /> </div> } */}

                    </TableBody>
                </Table>

                { /** BASIC DIALOG */ } 
                <BasicDialog
                    basicDialogOpts={ this.state.basicDialogOpts }
                    closeDialog={ this.onCloseBasicDialog.bind(this) }
                    // isPending={ basicDialogRequestPending }
                />   

                {/* New User */}
                <UserInfoNew
                    openDialog={isNewUser}
                    // closeDialog={this.onCloseNewUserDialog.bind(this)}
                    userInfo={userInfo}
                />

                {/* Edit User */}

               {/* { 
                   this.state.selectedUser != null ?
               <UserEditContainer
                    openDialog={this.state.openEditUserDialog}
                    closeDialog={this.onCloseEditUserDialog.bind(this)}
                    selectedUser={this.state.selectedUser}
                />
                :null
                } */}


            </StyleRoot>
        )
    }
}

export default UserInfoList;