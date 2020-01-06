import React from 'react';
import Radium, { StyleRoot } from 'radium';
import moment from 'moment';
import constantHelper from '../../../../util/constants/constants';


import { TableRow, TableRowColumn } from 'material-ui/Table';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import DoneIcon from 'material-ui/svg-icons/action/done';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import EditIcon from 'material-ui/svg-icons/editor/border-color';




class IncomeListItem extends React.Component {

    render() {
        const { income, onOpenDeleteIncome, onOpenIncomeDeleteManyDialog, onOpenEditIncome } = this.props;
        return (
            <TableRow>
                <TableRowColumn>{moment(income.date).format('MM/DD/YYYY')}</TableRowColumn>
                <TableRowColumn>{income.description}</TableRowColumn>
                <TableRowColumn>{income.remarks}</TableRowColumn>
                <TableRowColumn>{income.total}</TableRowColumn>

                <TableRowColumn
                    children={
                        <IconMenu
                            iconButtonElement={
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                            targetOrigin={{ horizontal: 'right', vertical: 'top' }}>
                                
                            <MenuItem
                                leftIcon={<EditIcon />}
                                primaryText="Edit"
                                onClick={onOpenEditIncome.bind(this, income)}
                            />       

                            <MenuItem
                                leftIcon={<DeleteIcon />}
                                primaryText="Delete"
                                onClick={onOpenDeleteIncome.bind(this, income)}
                            />

                            <MenuItem
                                leftIcon={<DeleteIcon />}
                                primaryText="Delete Many"
                                onClick={onOpenIncomeDeleteManyDialog.bind(this)}
                            />



                        </IconMenu>
                    }
                />

            </TableRow>

        )
    }
}


export default IncomeListItem;