import React from 'react';
import Radium, { StyleRoot } from 'radium';

import UserListContainer from '../../users/list/container/list';

import colorPallete from '../../../util/styles/color-pallete';

const styles = {

};

@Radium
class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <StyleRoot>
                <div>
                    <UserListContainer />
                </div>
            </StyleRoot>
        )
    }
}

export default Main;
