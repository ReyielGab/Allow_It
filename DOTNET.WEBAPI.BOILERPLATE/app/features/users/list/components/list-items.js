import React from 'react';
import Radium, { StyleRoot } from 'radium';

// ** material-ui
import { TableRow, TableRowColumn } from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

import { browserHistory } from 'react-router';

// *** material-ui icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
// import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ViewIcon from 'material-ui/svg-icons/action/visibility';
import EditIcon from 'material-ui/svg-icons/editor/border-color';
import ManageIncomeIcon from 'material-ui/svg-icons/editor/attach-money';


const styles = {

    actionWrapper: {
        textAlign: 'right'
    }
};

@Radium
class UserListItem extends React.Component {
    constructor(props) {
        super(props);
    }
 

    addExpense() {
        const { user } = this.props;
        browserHistory.push(`/view-expense/${user.id}`);
    }

    manageIncome() {
        const { user } = this.props;
        browserHistory.push(`/view-income/${user.id}`);
    }

    // onDisplayIncome() {
    //     const { user } = this.props;

    //     return user.income.length == 0 ? <TableRowColumn> 0 </TableRowColumn> : user.income.map((x) => {
    //         return <TableRowColumn> {x.total} </TableRowColumn>
   // conasdasdasdasdasdas
    //     })
    // }
    
    render() {
        const { user, openEditUserDialog, openDeleteUserDialog } = this.props;
        return (

                <TableRow hoverable={true}>
                    {/* <TableRowColumn> {user.id}  </TableRowColumn> */}

                    <TableRowColumn> {user.firstname} {user.middlename} {user.lastname}  </TableRowColumn>

                    <TableRowColumn> {user.age}  </TableRowColumn>
                    <TableRowColumn> {!user.totalIncome ? 0 : user.totalIncome}  </TableRowColumn>
                    {/* {this.onDisplayIncome()} */}

                    <TableRowColumn> {user.totalExpenseCost ? user.totalExpenseCost : 0}  </TableRowColumn>

                    <TableRowColumn> {!user.balance ? 0 : user.balance} </TableRowColumn>

                    <TableRowColumn> {user.totalExpenseItem} </TableRowColumn>

                    <TableRowColumn> NO  </TableRowColumn>

                    <TableRowColumn style={styles.actionWrapper}>
                        <IconMenu
                            iconButtonElement={
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}>

                            <MenuItem
                                leftIcon={<ViewIcon />}
                                primaryText="Manage Expense"
                                onClick={this.addExpense.bind(this)}
                               // onClick={this.viewTodos.bind(this)}
                            />

                            <MenuItem
                                leftIcon={<ManageIncomeIcon />}
                                primaryText="Manage Income"
                                onClick={this.manageIncome.bind(this)}
                            // onClick={this.viewTodos.bind(this)}
                            />

                            <MenuItem
                                leftIcon={<EditIcon />}
                                primaryText="Edit"
                                onClick={openEditUserDialog.bind(this, user)}
                            />

                             <MenuItem
                                leftIcon={<DeleteIcon />}
                                primaryText="Delete"
                                onClick={openDeleteUserDialog.bind(this, user)}
                            />
                            

                        </IconMenu> 
                        
                    </TableRowColumn>
                </TableRow>

        )
    }
}

export default UserListItem;