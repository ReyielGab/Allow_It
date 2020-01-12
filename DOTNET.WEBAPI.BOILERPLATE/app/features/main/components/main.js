import React from 'react';
import Radium, { StyleRoot } from 'radium';

import UserListContainer from '../../users/list/container/list';

import UserInfoContainer from '../../userinfo/list/container/list';

import LoginContainer from '../../login/container/login';

import colorPallete from '../../../util/styles/color-pallete';



@Radium
class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <StyleRoot >
                <div>
                    {/* <span style={{
                        fontFamily: 'Brandon Grotesque', color: colorPallete.baseFontColor,
                        fontSize: '40px', textAlign: 'left', paddingLeft: '30px'
                    }}>ALLOWIT</span> */}
                   
                   <UserInfoContainer />

                    {/* <LoginContainer /> */}

                     {/* <UserListContainer /> */}
                </div>
            </StyleRoot>
        )
    }
}

export default Main;
