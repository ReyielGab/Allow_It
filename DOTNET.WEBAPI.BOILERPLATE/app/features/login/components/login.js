import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
// ** material-ui
import RaisedButton from 'material-ui/RaisedButton';

import { required, confirmPassword } from '../../../util/validation';

import colorPallete from '../../../util/styles/color-pallete';

import CircularProgress from 'material-ui/CircularProgress';

import { browserHistory } from 'react-router';


const styles = {
    container: {
        backgroundColor: colorPallete.baseColor
    },
}


@reduxForm({
    form: 'loginForm',
    initialValues: 
    { 
        userName: '',
        password: '',
        confirmpassword: ''
    }
})


@Radium 
class Login extends React.Component{
    constructor(props){
        super(props);

     
    }

    render() {
        const { handleSubmit, loginUserRequestPending, onSignUp, isSignUp } = this.props;
        return(
            <StyleRoot style={{padding: '20px'}}>
                <form onSubmit={handleSubmit}>
                    <div style={{ margin: '0 auto', width: '700px' }}>
                        <div style={{ borderRadius: '8px', border: 'solid 1.5px #ffffff' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <span style={{ color: colorPallete.baseFontColor, 
                                    fontFamily: 'Brandon Grotesque', fontSize: '40px' }}>Login</span>
                                </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Field
                                    name="userName"
                                    component={TextField}
                                    hintText="User Name"
                                    floatingLabelText="User Name"
                                    validate={required}
                                    hintStyle={{ color: 'white' }}
                                    floatingLabelStyle={{ color: 'white' }}
                                    underlineStyle={{ borderColor: colorPallete.baseFontColor }}
                                    inputStyle={{ color: 'white' }}
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Field
                                    name="password"
                                    component={TextField}
                                    hintText="Password"
                                    floatingLabelText="Password"
                                    validate={required}
                                    hintStyle={{ color: 'white' }}
                                    floatingLabelStyle={{ color: 'white' }}
                                    underlineStyle={{ borderColor: colorPallete.baseFontColor }}
                                    inputStyle={{ color: 'white' }}
                                    type="password"
                                />
                            </div>

                            {isSignUp ? <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Field
                                    name="confirmpassword"
                                    component={TextField}
                                    hintText="Confrim Password"
                                    floatingLabelText="Confrim Password"
                                    validate={required}
                                    hintStyle={{ color: 'white' }}
                                    floatingLabelStyle={{ color: 'white' }}
                                    underlineStyle={{ borderColor: colorPallete.baseFontColor }}
                                    inputStyle={{ color: 'white' }}
                                    type="password"
                                    validate={confirmPassword}
                                />
                            </div> : null}

                            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '15px' , paddingBottom: '10px' }}>
                            {!loginUserRequestPending ? <RaisedButton type="submit" backgroundColor='#1a2938' 
                                labelColor='white' label={!isSignUp ? 'LOGIN' : 'SIGNUP'} /> 
                                : <div> <CircularProgress size={80} thickness={5} /> </div>}
                                   
                            </div>

                            <div style={{ display: 'flex', color: colorPallete.baseFontColor,fontStyle: 'Italic' , 
                             fontFamily: 'Brandon Grotesque',
                             fontSize: '20px',
                             justifyContent: 'center', paddingTop: '15px' , paddingBottom: '10px',
                             cursor: 'pointer' }}>
                                <span onTouchTap={onSignUp.bind(this)}  >Don't have account?. Sign up here</span>
                            </div>
                        
                                
                        </div>
                    </div>



                </form>
            </StyleRoot>
        )
    }
}


export default Login;