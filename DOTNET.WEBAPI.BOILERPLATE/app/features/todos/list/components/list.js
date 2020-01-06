import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { browserHistory } from 'react-router';

import TodoListItem from './list-items';

// *** material-ui
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';

import colorPallete from '../../../../util/styles/color-pallete';

import TodoNewContainer from '../../new/container/new';

import BasicDialog from '../../../../shared-components/basic-dialog';
import EmptyPlaceholder from '../../../../shared-components/placeholders/empty'


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

@Radium
class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTodoDialog: false,
            basicDialogOpts: basicDialogOpts
        }
    }

    onDisplayOfTodos() {
        const { todoList, params, doneTodo } = this.props;
        return todoList.map((todo, index) => (
            <TodoListItem
                key={index}
                todo={todo}
                params={params}
                openTodosDeleteDialog={this.onOpenTodosDeleteDialog.bind(this)}
                doneTodo={doneTodo}
                doneImg={'/public/imgs/ic_check_circle_black_24dp_2x.png'}
            />
        ))
    }    

    onOpenTodoDialog() {
        this.setState({
            openTodoDialog: true
        })
    }

    onCloseTodoDialog() {
        this.setState({
            openTodoDialog: false
        })
    }

    onOpenTodosDeleteDialog(todo, event) {
        event.preventDefault();
        this.setState({
            basicDialogOpts: {
                ...basicDialogOpts,
                highlightTitle : `Todo ${todo.todos}`,
                open : true,
                closeDialog : this.onCloseBasicDialog.bind(this),

                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action : this.onDeleteSelectedTodo.bind(this, todo), 
                        secondary : true
                    }
                ]
            }            
        });
    }

    onCloseBasicDialog() {

        this.setState({ 
            basicDialogOpts: { ...basicDialogOpts, open: false } 
        });
    }

    onDeleteSelectedTodo(todo, event) {
        event.preventDefault();
        const { deleteSelectedTodo } = this.props;

        deleteSelectedTodo(todo.id, this.onCloseBasicDialog.bind(this));
    }

    onBack() {
        browserHistory.push('/');
    }

    render() {
        const { params, todoList, getAllTodosPendingRequest } = this.props;
        return (
            <StyleRoot>
            
                <div>
                    <FlatButton hoverColor='none' label="BACK TO LIST OF USERS" onTouchTap={this.onBack.bind(this)} />
                </div>

                <div style={styles.header}>
                    <label style={styles.headerText}> List of To Do's </label>

                    <FloatingActionButton title="ADD TO DO" secondary={true} style={{ marginRight: '10px' }} onTouchTap={this.onOpenTodoDialog.bind(this)}>
                        <ContentAdd />
                    </FloatingActionButton>

                </div>
          
                { todoList.length == 0 ? <EmptyPlaceholder
                                             title="NO TO DO'S YET"
                                             subtitle="Click + to add to do's"
                                        />
                                        : getAllTodosPendingRequest ? <div style={styles.loadingStyle}> <CircularProgress size={80} thickness={5} /> </div> :
                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}>
                        <TableRow>
                            {/* <TableHeaderColumn>ID</TableHeaderColumn> */}
                            <TableHeaderColumn>TO DO</TableHeaderColumn>
                            <TableHeaderColumn>DATE</TableHeaderColumn>
                            <TableHeaderColumn>DONE</TableHeaderColumn>
                            <TableHeaderColumn> </TableHeaderColumn>
                        </TableRow>

                    </TableHeader>

                    <TableBody
                        showRowHover={true}
                        displayRowCheckbox={false}>
                         
                        {this.onDisplayOfTodos()}

                    </TableBody>
                </Table>
                }

                { /** BASIC DIALOG */ } 
                <BasicDialog
                    basicDialogOpts={ this.state.basicDialogOpts }
                    closeDialog={ this.onCloseBasicDialog.bind(this) }
                    // isPending={ basicDialogRequestPending }
                />           

                <TodoNewContainer
                    openDialog={this.state.openTodoDialog}
                    closeDialog={this.onCloseTodoDialog.bind(this)}
                    userId={params.id}
                />
            

            </StyleRoot>
        )
    }
}

export default TodoList;