import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { browserHistory } from 'react-router';

//import TodoListItem from './list-items';

// *** material-ui
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';

import colorPallete from '../../../../util/styles/color-pallete';

import ExpenseNewContainer from '../../new/container/new';
import ExpenseListItem from '../components/list-items';

import BasicDialog from '../../../../shared-components/basic-dialog';
import EmptyPlaceholder from '../../../../shared-components/placeholders/empty'
import DeleteManyDialog from '../../../../shared-components/delete-many-dialog';

import constants from '../../../../util/constants/constants';


const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    headerText: {
        color: colorPallete.primaryTextColor,
        fontSize: '24px',
        margin: '10px 0px 0px 10px'
    }
};

// *** dialog options
const basicDialogOpts = {
    title : 'Do you want to remove',
    subtitle : 'This Todo will be permanently removed.',
    highlightTitle : null,
    open : false,
    closeDialog : null,
    actions: []    
};

const deleteManyOpt = {
    open: false,
    tBody: [],
    constants: constants.expenseHeader,
    actions: []
}

@Radium
class ExpenseList extends React.Component {

    constructor() {
        super();

        this.state = {
            basicDialogOpts: basicDialogOpts,
            openNewDialog: false,
            openDeleteManyDialog: false,
            deleteManyOpt: deleteManyOpt
        }
    }

    onBack() {
        const { user } = this.props;
        browserHistory.push(`/users/${user.id}`);
    }

    onOpenAddExpenseDialog() {
        this.setState({
            openNewDialog: true
        })
    }

    onCloseAddExpenseDialog() {
        this.setState({
            openNewDialog: false
        })
    }

    onDeleteSelectedExpense(expense) {
        const { deleteExpenseById } = this.props;

        deleteExpenseById(expense.id, this.onCloseBasicDialog.bind(this));

    }

    onOpenExpenseDeleteDialog(expense, event) {
        event.preventDefault();
        this.setState({
            basicDialogOpts: {
                ...basicDialogOpts,
                highlightTitle : `Expense ${expense.description}`,
                open : true,
                closeDialog : this.onCloseBasicDialog.bind(this),

                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action : this.onDeleteSelectedExpense.bind(this, expense), 
                        secondary : true
                    }
                ]
            }            
        });
    }

    onOpenExpenseDeleteManyDialog() {
        const { listOfExpense } = this.props;

        this.setState({
            deleteManyOpt: {
                ...deleteManyOpt,
                open: true,
                tBody: listOfExpense,
                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseExpenseDeleteManyDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action : this.onDeleteManyExpense.bind(this), 
                        secondary : true
                    }
                ]
            }
        });
    }

    onCloseExpenseDeleteManyDialog() {
        this.setState({
            deleteManyOpt: {...deleteManyOpt, open: false}
        })
    }

    onDeleteManyExpense(expenses) {
        const  { listOfExpense, deleteManyExpenseById } = this.props;
        let exist = false;
        let expenseToRemove = expenses == 'all' ? listOfExpense.map(x => x) : listOfExpense.filter((x, i) => {
           exist = expenses.some((xx) => (xx == i))
            if(exist) {
                return x.id;
            }
        });
        
        deleteManyExpenseById(expenseToRemove, this.onCloseExpenseDeleteManyDialog.bind(this));
    }

    onDisplayExpenses() {
        const { listOfExpense } = this.props;
       return listOfExpense.map( (x, index) => (
          <ExpenseListItem 
                key={index}
                expense={x}
                onOpenExpenseDeleteDialog={this.onOpenExpenseDeleteDialog.bind(this)}
                onOpenExpenseDeleteManyDialog={this.onOpenExpenseDeleteManyDialog.bind(this)}
           />
       ));
    }

    onCloseBasicDialog() {
        this.setState({ 
            basicDialogOpts: { ...basicDialogOpts, open: false } 
        });
    }

    render() {
        const { user } = this.props;
        return(
            <StyleRoot>
                <div>
                    <FlatButton hoverColor='none' label="BACK TO LIST OF USERS" onTouchTap={this.onBack.bind(this)} />
                </div>

                <div style={styles.header}>
                    <label style={styles.headerText}> List of Expense </label>

                    <FloatingActionButton 
                    title="ADD EXPENSE"
                    backgroundColor={colorPallete.baseColor}
                    style={{ marginRight: '10px' }} 
                    onTouchTap={this.onOpenAddExpenseDialog.bind(this)}
                    >
                        <ContentAdd />
                    </FloatingActionButton>

                </div>


                {/* { todoList.length == 0 ? <EmptyPlaceholder
                                             title="NO TO DO'S YET"
                                             subtitle="Click + to add to do's"
                                        />
                                        : getAllTodosPendingRequest ? <div style={styles.loadingStyle}> <CircularProgress size={80} thickness={5} /> </div> : */}
                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}>
                        <TableRow>
                            {/* <TableHeaderColumn>ID</TableHeaderColumn> */}
                            <TableHeaderColumn>DATE</TableHeaderColumn>
                            <TableHeaderColumn>CATEGORY</TableHeaderColumn>
                            <TableHeaderColumn>REMARKS</TableHeaderColumn>
                            <TableHeaderColumn>STATUS</TableHeaderColumn>
                            <TableHeaderColumn>TOTAL AMOUNT</TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                        </TableRow>

                    </TableHeader>

                    <TableBody
                        showRowHover={true}
                        displayRowCheckbox={false}>
                         
                        {/* {this.onDisplayOfTodos()} */}
                        {this.onDisplayExpenses()}

                    </TableBody>
                </Table>

                {/* } */}

                { /** BASIC DIALOG */ } 
                <BasicDialog
                    basicDialogOpts={ this.state.basicDialogOpts }
                    closeDialog={ this.onCloseBasicDialog.bind(this) }
                    // isPending={ basicDialogRequestPending }
                />  

                <ExpenseNewContainer 
                    openNewDialog={this.state.openNewDialog}
                    closeNewDialog={this.onCloseAddExpenseDialog.bind(this)}
                    userId={user.id}
                />

                <DeleteManyDialog
                    deleteManyOpt={this.state.deleteManyOpt}                    
                />



                
            </StyleRoot>
        )
    }



}



export default ExpenseList;