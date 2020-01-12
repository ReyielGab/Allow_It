import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { browserHistory } from 'react-router';

import IncomeListItem from '../components/list-item'
import IncomeNew from '../../new/container/new';
import EditIncome from '../../edit/container/edit';

// *** material-ui
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';

import colorPallete from '../../../../util/styles/color-pallete';

import BasicDialog from '../../../../shared-components/basic-dialog';
import DeleteManyDialog from '../../../../shared-components/delete-many-dialog';
import EmptyPlaceholder from '../../../../shared-components/placeholders/empty'
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
    constants: constants.incomeHeader,
    actions: []
}


@Radium
class IncomeList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            basicDialogOpts: basicDialogOpts,
            openNewIncomeDialog: false,
            deleteManyOpt: deleteManyOpt,
            openEditIncomeDialog: false,
            selectedIncome: null
        }
    }

    onBack() {
        browserHistory.push('/users');
    }

    onCloseBasicDialog() {
        this.setState({
            basicDialogOpts: {...basicDialogOpts, open: false}
        });
    }

    onDeleteSelectedIncome(income) {
        const { deleteIncomeByUserId } = this.props;

        deleteIncomeByUserId(income.id, this.onCloseBasicDialog.bind(this));
    }
    

    onOpenDeleteIncome(income) {
        event.preventDefault();
        this.setState({
            basicDialogOpts: {
                ...basicDialogOpts,
                highlightTitle : `Income ${income.description}`,
                open : true,
                closeDialog : this.onCloseBasicDialog.bind(this),

                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action : this.onDeleteSelectedIncome.bind(this, income), 
                        secondary : true
                    }
                ]
            }            
        });
    }

    onDisplayIncome() {
        const { listOfIncome } = this.props;

        return listOfIncome.map((income, index) => (
            <IncomeListItem
                key={index}
                income={income}   
                onOpenDeleteIncome={this.onOpenDeleteIncome.bind(this)}
                onOpenIncomeDeleteManyDialog={this.onOpenIncomeDeleteManyDialog.bind(this)}
                onOpenEditIncome={this.onOpenEditIncome.bind(this)}         
            />
        ))
    }

    onOpenNewIncomeDialog() {
        this.setState({
            openNewIncomeDialog: true
        })
    }

    onCloseNewIncomeDialog() {
        this.setState({
            openNewIncomeDialog: false
        })
    }

    onOpenIncomeDeleteManyDialog() {
        const { listOfIncome } = this.props;

        this.setState({
            deleteManyOpt: {
                ...deleteManyOpt,
                open: true,
                tBody: listOfIncome,
                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseIncomeDeleteManyDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action : this.onDeleteManyIncome.bind(this), 
                        secondary : true
                    }
                ]
            }
        });
    }

    onCloseIncomeDeleteManyDialog() {
        this.setState({
            deleteManyOpt: {...deleteManyOpt, open: false}
        })
    }

    onDeleteManyIncome(incomes) {
        const  { listOfIncome, deleteManyIncome } = this.props;
        let exist = false;
        let incomeToRemove = incomes == 'all' ? listOfIncome.map(x => x) : listOfIncome.filter((x, i) => {
           exist = incomes.some((xx) => (xx == i))
            if(exist) {
                return x.id;
            }
        });
        
        deleteManyIncome(incomeToRemove, this.onCloseIncomeDeleteManyDialog.bind(this));
    }

    onOpenEditIncome(selectedIncome) {
        this.setState({
            openEditIncomeDialog: true,
            selectedIncome: selectedIncome
        })
    }

    onCloseEditIncome() {
        this.setState({
            openEditIncomeDialog: false
        })
    }


    render(){
        const { userId } = this.props;

        return(
            <StyleRoot>
                <div>
                    <FlatButton hoverColor='none' label="BACK TO LIST OF USERS"
                     onTouchTap={this.onBack.bind(this)}
                    />
                </div>

                <div style={styles.header}>
                    <label style={styles.headerText}> List of Income </label>

                    <FloatingActionButton
                        title="Add Income"
                        backgroundColor={colorPallete.baseColor}
                        style={{ marginRight: '10px' }}
                        onTouchTap={this.onOpenNewIncomeDialog.bind(this)}
                    >
                        <ContentAdd />
                    </FloatingActionButton>

                </div>

                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}>
                        <TableRow>
                            {/* <TableHeaderColumn>ID</TableHeaderColumn> */}
                            <TableHeaderColumn>DATE</TableHeaderColumn>
                            <TableHeaderColumn>CATEGORY</TableHeaderColumn>
                            <TableHeaderColumn>REMARKS</TableHeaderColumn>
                            <TableHeaderColumn>TOTAL AMOUNT</TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                        </TableRow>

                    </TableHeader>

                    <TableBody
                        showRowHover={true}
                        displayRowCheckbox={false}>
                         
                        {this.onDisplayIncome()}

                    </TableBody>
                </Table>

                { /** BASIC DIALOG */ } 
                <BasicDialog
                    basicDialogOpts={ this.state.basicDialogOpts }
                    closeDialog={ this.onCloseBasicDialog.bind(this) }
                    // isPending={ basicDialogRequestPending }
                />  

                <IncomeNew
                    openNewIncomeDialog={this.state.openNewIncomeDialog}
                    closeNewIncomeDialog={this.onCloseNewIncomeDialog.bind(this)}
                    userId={userId}
                />

                <DeleteManyDialog
                    deleteManyOpt={this.state.deleteManyOpt}
                />

                <EditIncome
                    openEditDialog={this.state.openEditIncomeDialog}
                    onCloseEditIncome={this.onCloseEditIncome.bind(this)}
                    selectedIncome={this.state.selectedIncome}
                />


            </StyleRoot>
        )
    }
}

export default IncomeList;