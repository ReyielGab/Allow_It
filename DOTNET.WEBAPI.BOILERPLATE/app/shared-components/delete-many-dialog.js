import React from 'react';
import Radium, { StyleRoot } from 'radium';
import moment from 'moment';

// *** material-ui components
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

// *** dumb components
//import LoadingIndicatorPerContainer from './loading-indicator-per-container';

// *** custom css styles
import colorPalette from '../util/styles/color-pallete';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const styles = {
    container : {
        height: '100%',
        width: '100%',        
    },

    title: {
        color: colorPalette.primaryTextColor,
        fontWeight: 400,
        fontSize: '18px',
    },

    bold: {
        color: colorPalette.accentColor
    },

    subtitle: {
        color: colorPalette.secondaryTextColor,
        fontSize: '14px'
    },

    buttonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: '60px',

        left: {
            marginLeft: '12px'
        }
    },

    dialogBodyStyle : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
    },    
};

@Radium
class DeleteManyDialog extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            open: false,
            selectedRows: []
        }
    }

    onDisplayActionButtons() {
        const { deleteManyOpt: { actions } } = this.props;
        return actions.map((action, i) => (
             <RaisedButton key={i}
                           label={action.label}
                           style={ styles.buttonWrapper.left }
                           secondary={ action.secondary }
                           primary={ action.primary }
                           onTouchTap={action.secondary ? action.action.bind(this, this.state.selectedRows) : action.action}             
             />
        ))
    }

    onDisplayDeleteItemList(obj, i) {
       const { deleteManyOpt: { constants } } = this.props;
       return  <TableRow key={i}> { constants.map((x, i) => {
            return  Object.entries(obj).map(([key, val]) => {
                if(key === x)
                    return  <TableRowColumn key={i}>{key == 'date' ? moment(val).format('MM/DD/YYYY') : val }</TableRowColumn>    
                                }) 
                 
        }) }  </TableRow>    
    }

    onCheckRow(selectedRows) {
        console.log(selectedRows, 'selectedsadasdas');
        this.setState({
            selectedRows: selectedRows == 'all' ? selectedRows : [...selectedRows]
        })
    }


    onDisplayDeleteData() {
        const { deleteManyOpt: { tBody, constants } } = this.props;
        console.log(tBody, 'tBody');
        return <div> <Table
                 multiSelectable={true}
                 onRowSelection={this.onCheckRow.bind(this,)}>
                    <TableHeader
                        adjustForCheckbox={true}
                        displaySelectAll={true}
                        enableSelectAll={true}>

                        <TableRow>
                            {constants.map((header, index) =>  
                            <TableHeaderColumn 
                                key={index}>{header == 'description' ? 'CATEGORY' : header.toUpperCase()}
                            </TableHeaderColumn>)    }
                     
                        </TableRow>
                    </TableHeader>
                    
                    <TableBody
                        showRowHover={true}
                        displayRowCheckbox={true}>
                        {    tBody.map((x, i) => (
                                    this.onDisplayDeleteItemList(x, i)
                        ))  }

                    </TableBody>

                </Table>

                <div style={styles.buttonWrapper}>
                    {this.onDisplayActionButtons()}
                </div>
                
             
                </div>;
    }

    render() {
        const { deleteManyOpt: { open } } = this.props
        return(
            <StyleRoot>
                <Dialog
                    //actions={actions}
                    modal={false}
                    open={open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                    bodyStyle={styles.bodyStyle}
                    children={this.onDisplayDeleteData()}

                
                />
            </StyleRoot>
        )
    }



}


export default DeleteManyDialog;