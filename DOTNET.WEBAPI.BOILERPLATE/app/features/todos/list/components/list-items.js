import React from 'react';
import Radium, { StyleRoot } from 'radium';
import moment from 'moment';

// ** material-ui
import { TableRow, TableRowColumn } from 'material-ui/Table';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import DoneIcon from 'material-ui/svg-icons/action/done';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


import Avatar from 'react-avatar';

const styles = {
};

@Radium
class TodoListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { todo, params, openTodosDeleteDialog, doneTodo, doneImg } = this.props;
        return (

            <TableRow hoverable={true}>
                {/* <TableRowColumn> {todo.id}  </TableRowColumn> */}

                <TableRowColumn> {todo.todos}  </TableRowColumn>

                <TableRowColumn> {moment(todo.todoDate).format('MM/DD/YYYY')}  </TableRowColumn>

                <TableRowColumn>
                    {todo.done ? 
                    <Avatar
                        size={23}
                        round={true}
                        src={doneImg}
                        title={'Done'}
                    /> : null}


                </TableRowColumn>

                <TableRowColumn style={{ textAlign: 'right' }}>
                    {/* <IconButton onTouchTap={openTodosDeleteDialog.bind(this, todo)}>
                        <DeleteIcon />

                    </IconButton> */}
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
                            onClick={openTodosDeleteDialog.bind(this, todo)}
                        />

                        {
                            !todo.done ?  <MenuItem
                              leftIcon={<DoneIcon />}
                              primaryText="Done"
                              onClick={doneTodo.bind(this, todo.id)}
                          /> : null
                        }
                      


                    </IconMenu>


                </TableRowColumn>

            </TableRow>
        )
    }
}

export default TodoListItem;