import React from 'react';
import Radium, { StyleRoot } from 'radium';
import colorPallete from '../util/styles/color-pallete';

const styles = {
};

@Radium
class Subheader extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { userInfo } = this.props
        return (
            <StyleRoot>
                <div style={{ backgroundColor: colorPallete.baseColor, height: '60px' }}>
                    <div style={{textAlign: 'center'}}>
                        <span style={{ color: colorPallete.baseFontColor, fontFamily: 'Brandon Grotesque', fontSize: '24px' }}>
                            ALLOWIT
                    </span>
                    </div>

                    <div style={{textAlign: 'right'}}>
                        <span style={{ color: colorPallete.baseFontColor,marginRight: '40px' , fontFamily: 'Brandon Grotesque', fontSize: '17px' }}>
                            { userInfo ? `Hi ${userInfo.firstname}` : null }
                        </span>
                    </div>
                </div>
            </StyleRoot>
        )
    }
}

export default Subheader;