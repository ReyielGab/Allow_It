import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';
import Radium, { StyleRoot } from 'radium';


import Main from '../components/main';
import Subheader from '../../../shared-components/subheader';

const styles = {

};

@connect(
    (state) => state.mainPageReducer,
    (dispatch) => ({ actions: bindActionCreators(duck, dispatch) })
)

@Radium
class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <StyleRoot>
                <div>
                    <Subheader />
                <Main />
                </div>
               

            </StyleRoot>
        )
    }
}
export default MainContainer;