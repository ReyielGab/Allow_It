import React from 'react';
import Radium, { StyleRoot } from 'radium';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


@Radium
class MonthPicker extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const { style, handleChange, monthValue } = this.props;
        return (
            <StyleRoot style={style}>
                <DropDownMenu value={ monthValue } onChange={handleChange.bind(this)}>
                    <MenuItem value={0} primaryText="January" />
                    <MenuItem value={1} primaryText="February" />
                    <MenuItem value={2} primaryText="March" />
                    <MenuItem value={3} primaryText="April" />
                    <MenuItem value={4} primaryText="May" />
                    <MenuItem value={5} primaryText="June" />
                    <MenuItem value={6} primaryText="July" />
                    <MenuItem value={7} primaryText="August" />
                    <MenuItem value={8} primaryText="September" />
                    <MenuItem value={9} primaryText="October" />
                    <MenuItem value={10} primaryText="November" />
                    <MenuItem value={11} primaryText="December" />
                </DropDownMenu>
            </StyleRoot>
        )
    }



}


export default MonthPicker;