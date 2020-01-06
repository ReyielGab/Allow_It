import React from 'react';
import Radium, { StyleRoot } from 'radium';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** material-ui components
import Dialog from 'material-ui/Dialog';

import TodoNew from '../components/new';

const styles = {
    dialogBodyStyle: {
        minHeight: '440px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
    },
};

@connect(
    state => state.todoNewReducer,
    dispatch => ({ actions: bindActionCreators(duck, dispatch) })
)

@Radium
class TodoNewContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    onSave(value) {
        const { userId, closeDialog, actions: { addNewTodo } } = this.props;

        value['userId'] = userId;
        addNewTodo(value, closeDialog);
    };

    render() {
        const { openDialog, closeDialog } = this.props;
        return (
            <StyleRoot>
                <Dialog
                    open={openDialog}
                    onRequestClose={closeDialog}
                >

                    <TodoNew
                        closeDialog={closeDialog}
                        onSubmit={this.onSave.bind(this)}
                    />

                </Dialog>
            </StyleRoot>
        )
    }
}

export default TodoNewContainer;