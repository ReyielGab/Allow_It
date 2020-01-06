import Radium from 'radium';

//pop-up
const popUp = Radium.keyframes({
    '0%': { opacity: 0, transform: 'scale(0.3)' },
    '50%': { opacity: 1, transform: 'scale(1.05)' },
    '70%': { transform: 'scale(0.9)' },
    '100%': { transform: 'scale(1)' }
}, 'pop-up');


//fade-in
const fadeIn = Radium.keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
}, 'fade-in');

//fade-out
const fadeOut = Radium.keyframes({
    '0%': { opacity: 1 },
    '100%': { opacity: 0 },
});
//slide-in
const slideIn = Radium.keyframes({
    '0%' : { opacity: 0, transform: 'translate3d(100vw, 0 , 0)'},                
    '100%' : { transform: 'translate3d(0vw,0,0)'}
});
//slide-out
const slideOut = Radium.keyframes({
    '0%' : {  opacity: 0, transform: 'translate3d(0vw, 0, 0)'},        
    '100%' : { transform: 'translate3d(100vw,0,0)'}
});

const pulse = Radium.keyframes({
    '0%' : { backgroundColor: 'rgba(225,225,225,0.2)' },
    '50%' : { backgroundColor: 'rgba(225,225,225,0.4)' },
    '100%' : { backgroundColor: 'rgba(225,225,225,0.2)' }
});

const slideUp = Radium.keyframes({
    '0%' : { opacity: 0, transform: 'translate3d(0, -100vh, 0)'},
    '100%' : {transform : 'translate3d(0, 0vw, 0)'}
});


const rotate = Radium.keyframes({
    '0%' : {transform: 'rotate(60deg)'},
    '25%' : {transform : 'rotate(180deg)'},
    '50%' : {transform: 'rotate (270deg)'},
    '100%' : {transform: 'rotate(360deg)'}
});

const glide = Radium.keyframes({    
    '0%' : {transform: 'translateY(0px)'},
    '55%' : {transform: 'translateY(10px)'},
    '60%' : {transform : 'translateY(10px)'},        
    '100%' : {transform: 'translateY(0px)'}
});

export default  {
    popUp: {
        animation: 'x 1.5s ease 0s',
        animationName: popUp,
    },
    fadeIn: {
        animation: 'x 0.5s ease 0s',
        animationName: fadeIn,
    },    
    fadeOut: {
        animation: 'x 0.5s ease 0s',
        animationName: fadeOut
    },
    slideIn: {
        animation: 'x 1s ease 0s',
        animationName: slideIn 
    },
    slideOut: {
        animation: 'x 1s ease 0s',
        animationName: slideOut 
    },
    pulse: {
        animation: '1s infinite',
        animationName : pulse
    },
    slideUp : {
        animation: 'x 0.5s ease 0s',
        animationName : slideUp
    },
    rotate : {
        animation: '1s infinite',
        animationName : rotate
    },
    glide : {
        animation : '2s infinite linear',
        animationName: glide
    }
};
