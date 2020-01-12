import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Radium, { StyleRoot } from 'radium';

import { browserHistory } from 'react-router';

import Login from '../components/login';
import * as duck from '../duck';

import colorPallete from '../../../util/styles/color-pallete';

const styles = {
    container: {
        width: '100%',
        height: '753px',
        backgroundColor: colorPallete.baseColor,
        // padding: '20px'
    },
}

@connect(
    (state) => state.loginReducer,
    (dispatch) => ({ actions: bindActionCreators(duck, dispatch) })
)


@Radium
class LoginContainer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isSignUp: false
        }
    }

    onSignUp() {
        this.setState({
            isSignUp: true
        })
    }

    onSignedUp() {
        this.setState({
            isSignUp: false
        })
    }

    

    componentDidUpdate(prevProps) {
        console.log(this.props)
        // Typical usage (don't forget to compare props):
        if (this.props.userInfo) {             
             browserHistory.push(`/users/${this.props.userInfo.id}`);
        }
      }

    render() {
        const { loginUserRequestPending, signUpSuccess } = this.props;
        return(
            <StyleRoot style={styles.container}>
                <span style={{
                    fontFamily: 'Brandon Grotesque', color: colorPallete.baseFontColor,
                    fontSize: '40px', textAlign: 'left', paddingLeft: '30px'
                }}>ALLOWIT</span>
                <Login
                    onSubmit={this.onSave.bind(this)}
                    loginUserRequestPending={loginUserRequestPending}
                    signUpSuccess={signUpSuccess}
                    onSignUp={this.onSignUp.bind(this)}
                    isSignUp={this.state.isSignUp}
                />
            </StyleRoot>
        )
    }

    onSave(values) {
        const { closeDialog , actions : { signUpNewUser, loginUser } } = this.props;
        console.log(this.props, 'logincontainer');
        if (!values.confirmpassword) {
            loginUser({
                ...values
            })
        }
        else {
            signUpNewUser({
                ...values
            }, this.onSignedUp.bind(this))
        }
        
    
    }
}



export default LoginContainer;