import React from 'react';
import Radium, { StyleRoot } from 'radium';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as duck from '../duck';

import Subheader from '../../../../shared-components/subheader';
import TodoList from '../components/list';

import colorPallete from '../../../../util/styles/color-pallete';


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

@connect(
    state => state.todoListReducer,
    dispatch => ({ actions: bindActionCreators(duck, dispatch) })
)

@Radium
class TodoListContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { params, actions: { getAllTodos } } = this.props;

        getAllTodos(params.id)
    }

    render() {
        const { params, todoList, getAllTodosPendingRequest, actions: { deleteSelectedTodo, doneTodo } } = this.props;
        return (
            <StyleRoot>
                <div>
                    <Subheader />
                    <TodoList
                        params={params}
                        todoList={todoList}
                        deleteSelectedTodo={deleteSelectedTodo}
                        doneTodo={doneTodo}
                        getAllTodosPendingRequest={getAllTodosPendingRequest} />


                </div>
            </StyleRoot>
        )
    }
}

export default TodoListContainer;