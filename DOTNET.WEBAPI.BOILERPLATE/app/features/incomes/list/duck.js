import client from '../../../api.js';
import Notifications from 'react-notification-system-redux';

import axios from 'axios';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 6
};

const GET_INCOME_BY_USER_ID_REQUEST = 'GET_INCOME_BY_USER_ID_REQUEST';
const GET_INCOME_BY_USER_ID_SUCCESS = 'GET_INCOME_BY_USER_ID_SUCCESS';
const GET_INCOME_BY_USER_ID_ERROR = 'GET_INCOME_BY_USER_ID_ERROR';

const DELETE_INCOME_BY_USER_ID_REQUEST = 'DELETE_INCOME_BY_USER_ID_REQUEST';
const DELETE_INCOME_BY_USER_ID_SUCCESS = 'DELETE_INCOME_BY_USER_ID_SUCCESS';
const DELETE_INCOME_BY_USER_ID_ERROR = 'DELETE_INCOME_BY_USER_ID_ERROR';

const DELETE_MANY_INCOME_BY_IDS_REQUEST = 'DELETE_MANY_INCOME_BY_IDS_REQUEST';
const DELETE_MANY_INCOME_BY_IDS_SUCCESS = 'DELETE_MANY_INCOME_BY_IDS_SUCCESS';
const DELETE_MANY_INCOME_BY_IDS_ERROR = 'DELETE_MANY_INCOME_BY_IDS_ERROR'; 

//foreign action type
const NEW_INCOME_REQUEST = 'NEW_INCOME_REQUEST';
const NEW_INCOME_SUCCESS = 'NEW_INCOME_SUCCESS';
const NEW_INCOME_ERROR = 'NEW_INCOME_ERROR';
const EDIT_INCOME_SUCCESS = 'EDIT_INCOME_SUCCESS';




export default (state= {
    listOfIncome: [],
    getIncomeByUserIdRequestPending: false,
    deleteIncomeByUserIdRequestPending: false,
    newIncomeRequestPending: false
}, action) => {
    switch(action.type) {

        case GET_INCOME_BY_USER_ID_REQUEST :
            return state = {
                ...state,
                getIncomeByUserIdRequestPending: true
            };

        case GET_INCOME_BY_USER_ID_SUCCESS : 
            return state = {
                ...state,
                listOfIncome: action.payload,
                getIncomeByUserIdRequestPending: false
            }
        
        case GET_INCOME_BY_USER_ID_ERROR : 
            return state = {
                ...state,
                getIncomeByUserIdRequestPending: false
            }

        case DELETE_INCOME_BY_USER_ID_REQUEST :
            return state = {
                ...state,
                deleteIncomeByUserIdRequestPending: true
            }

        case DELETE_INCOME_BY_USER_ID_SUCCESS :
            return state = {
                ...state,
                listOfIncome: state.listOfIncome.filter(x => x.id !== action.payload)
            }

        case NEW_INCOME_REQUEST : 
            return state = {
                ...state,
                newIncomeRequestPending: true
            }

        case NEW_INCOME_SUCCESS: 
            return state = {
                ...state,
                newIncomeRequestPending: false,
                listOfIncome: [...state.listOfIncome, action.payload]
            }

        case NEW_INCOME_ERROR:
            return state = {
                ...state,
                newIncomeRequestPending: false
            }

        case DELETE_MANY_INCOME_BY_IDS_REQUEST:
            return state = {
                ...state,                
            }
        
        case DELETE_MANY_INCOME_BY_IDS_SUCCESS:
            return state = {
                ...state,
                listOfIncome: state.listOfIncome.filter(x => {
                    let exist = false;
                    exist = action.payload.some(id => id == x.id);
                    if(!exist){
                        return x;
                    }
                })
            }

        case DELETE_MANY_INCOME_BY_IDS_ERROR:
            return state = {
                ...state,              
            }

        case EDIT_INCOME_SUCCESS:
            return state = {
                ...state,
                listOfIncome: state.listOfIncome.map(income => {               
                    if(income.id == action.payload.id){
                        return action.payload;
                    }

                    return income;
                })
            }

        default: return state;
    }

};



const getIncomeByUseIdRequest = () => ({
    type: 'GET_INCOME_BY_USER_ID_REQUEST'
});

const getIncomeByUserIdSuccess = (listOfIncome) => ({ 
    type: 'GET_INCOME_BY_USER_ID_SUCCESS',
    payload: listOfIncome
});

const getIncomeByUserIdError = () => ({
    type: 'GET_INCOME_BY_USER_ID_ERROR',

})

const deleteIncomeByUserIdRequest = () => ({
    type: 'DELETE_INCOME_BY_USER_ID_REQUEST'
})

const deleteIncomeByUserIdSuccess = (incomeId) => ({
    type: 'DELETE_INCOME_BY_USER_ID_SUCCESS',
    payload: incomeId
})

const deleteManyIncomeRequest = () => ({
    type: 'DELETE_MANY_INCOME_BY_IDS_REQUEST'
})

const deleteManyIncomeSuccess = (listOfIds) => ({
    type: 'DELETE_MANY_INCOME_BY_IDS_SUCCESS',
    payload: listOfIds
})

const deleteManyIncomeError = () => ({
    type: 'DELETE_MANY_INCOME_BY_IDS_ERROR'
})


export const deleteManyIncome = (incomeToRemove, closeDialog) => (dispatch) => {
    dispatch(deleteManyIncomeRequest());
    const data = {
        income: incomeToRemove
    }

    client.post('api/Income/DeleteManyIncomeByIds', data).then(response => {
        dispatch(deleteManyIncomeSuccess(response.data));

        dispatch(Notifications.success({
            ...notificationOpts,
            message: 'Successfully deleted selected expense ',
            title: 'SUCCESS'
        }));
        closeDialog();
    }).catch(error => {
        console.log(error);
    })


}


export const getIncomeByUserId = (userId) => (dispatch) => {
    dispatch(getIncomeByUseIdRequest());

    client.get(`api/Income/GetIncomeByUserId?UserId=${userId}`).then(response => {
        dispatch(getIncomeByUserIdSuccess(response.data));

    }).catch(error => {
        console.log(error);
    })
}


export const deleteIncomeByUserId = (incomeId, closeDiag) => (dispatch) => {
    dispatch(deleteIncomeByUserIdRequest());

    client.delete(`api/Income/DeleteIncomeByIncomeId?IncomeId=${incomeId}`)
        .then(response => {
            dispatch(deleteIncomeByUserIdSuccess(response.data));

            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Successfully deleted selected income ',
                title: 'SUCCESS'
            }));

            closeDiag();

        }).catch(error => {
            console.log(error);
        })    
}















// export const getIncomeByUserId = (userId) => (dispatch) => {
//         dispatch(getIncomeByUseIdRequest());

//         /***  SAMPLE interactions with graphql using axios http mutation  */
//         // const someBookName = '"samplebook6"';
//         // const someAuthorId = 10;
//         // const query = `mutation{addBook(name: ${someBookName}, authorId: ${parseInt(someAuthorId)}){
//         //     name
//         // }}`

//         // axios({
//         //     method: "POST",
//         //     url: "http://localhost:4000/graphql",
//         //     data: {
//         //         query: query
//         //     } 
//         // }).then(response => {
//         //     console.log(response, 'hahaha');
//         // })
        


//          /***  SAMPLE interactions with graphql using axios http with args  */
//         // axios({
//         //         method: "POST",
//         //         url: "http://localhost:4000/graphql",
//         //         data: {
//         //             query: `{
//         //                 book(id: 1){
//         //                     name
//         //                     author{
//         //                         name
//         //                       }
//         //                 }
//         //             }`
//         //         }
//         // }).then( response => {
//         //     console.log(response, 'hahaha');
//         // })


//         /***  SAMPLE interactions with graphql using axios http   */
        
//         // axios({
//         //         method: "POST",
//         //         url: "http://localhost:4000/graphql",
//         //         data: {
//         //             query: `{
//         //                 books{
//         //                     name
//         //                 }
//         //             }`
//         //         }
//         // }).then( response => {
//         //      console.log(response, 'hahaha');
//         // })
      

//         // try {
//         //     async axios.get(
//         //         'http://localhost:4000/graphql?query={book(id:1){name}}',
                
//         //         ).then(  (response) => {
//         //             await console.log(response, 'hey');
//         //     })`
//         // }
//         // catch (e) {

//         // }



//         // axios({
//         //     // url: 'http://localhost:4000/graphql?query={book(id:1){name}}',
//         //     url: 'http://localhost:4000/graphql',
//         //     method: 'get',
//         //     data: {
//         //       query: `
//         //         query Query {
//         //           book(id: 1) {
//         //             name
//         //             }
//         //           }
//         //         `
//         //     }
//         // }).then(response => {
//         //     console.log(response, 'heeeey');
//         // })

//         // client.get(`api/Income/GetIncomeByUserId?UserId=${userId}`)
//         // .then( response => {
//         //     console.log(response.data);
//         // }).catch(error => {
//         //     console.log(error);
//         // });
// }

