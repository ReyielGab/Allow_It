import React from 'react';
import Radium, { StyleRoot } from 'radium';
import moment from 'moment';
import constantHelper from '../../../../util/constants/constants';


import { TableRow, TableRowColumn } from 'material-ui/Table';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import DeleteManyIcon from 'material-ui/svg-icons/content/delete-sweep';
import DoneIcon from 'material-ui/svg-icons/action/done';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';



class ExpenseListItem extends React.Component {


    checkStatus(status) {
        switch(status) {
            case 0:
                return 'In Progress'
            case 1:
                return 'Submitted';
            case 2:
                return 'Rejected';
            case 3:
                return 'Approved';
            default: 
                break;
        }
    }

    render() {
        const { expense, onOpenExpenseDeleteDialog, onOpenExpenseDeleteManyDialog } = this.props;
        return (

            <TableRow>
                <TableRowColumn>{moment(expense.date).format('MM/DD/YYYY')}</TableRowColumn>
                <TableRowColumn>{expense.description}</TableRowColumn>
                <TableRowColumn>{expense.remarks}</TableRowColumn>
                {/* <TableRowColumn>{expense.status}</TableRowColumn> */}
                <TableRowColumn> {this.checkStatus(expense.status)} </TableRowColumn>
                <TableRowColumn>{expense.total}</TableRowColumn>
                
                <TableRowColumn 
                    children= {
                        <IconMenu
                        iconButtonElement={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}>

                        <MenuItem
                            leftIcon={<DeleteIcon />}
                            primaryText="Delete"
                            onClick={onOpenExpenseDeleteDialog.bind(this, expense)}
                        />

                        <MenuItem
                            leftIcon={<DeleteManyIcon />}
                            primaryText="Delete Many"
                            onClick={onOpenExpenseDeleteManyDialog.bind(this, expense)}
                        />

                        {/* {
                            !todo.done ?  <MenuItem
                              leftIcon={<DoneIcon />}
                              primaryText="Done"
                              onClick={doneTodo.bind(this, todo.id)}
                          /> : null
                        } */}
                      


                        </IconMenu>
                    }
                
                />

            </TableRow>

        )
    }

}


export default ExpenseListItem;