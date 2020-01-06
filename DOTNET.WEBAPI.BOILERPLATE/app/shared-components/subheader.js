import React from 'react';
import Radium, { StyleRoot } from 'radium';

const styles = {
};

@Radium
class Subheader extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <StyleRoot>
                <div style={{ backgroundColor: 'rgb(0, 188, 212)', height: '60px', textAlign: 'center' }}>
                    <span style={{ color: 'white', fontSize: '24px', paddingTop: '20px' }}>
                        ALLOWIT
                        </span>
                </div>
            </StyleRoot>
        )
    }
}

export default Subheader;