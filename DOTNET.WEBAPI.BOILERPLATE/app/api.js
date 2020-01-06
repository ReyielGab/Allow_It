import axios from 'axios'
import { logoutUserSession, refreshUserSession, unauthorizedResourceAccessedByUser } from './util/auth';

const api = axios.create({
    baseURL: 'http://allowit-app-06.gearhostpreview.com/',
   //baseURL: 'http://localhost:9094/'
})

//Intercept Response Errors
api.interceptors.response.use(undefined, function (error) {

    // Do something with response error
    console.log(`[INTERCEPTED ERROR ${error.response.status}]`);

    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retryRequest) {

        console.log('[REFRESHING TOKEN]')

        originalRequest._retryRequest = true;
        const refreshToken = localStorage.getItem('refreshToken');
        const currentUserId = localStorage.getItem('currentUserId');

        //https://github.com/WebReflection/url-search-params
        var params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', refreshToken);
        params.append('client_id', `AUTH-${currentUserId}`);

        return api.post('/token', params)
            .then(function (response) {
                console.log('[REFRESHING TOKEN SUCCESSFUL]')
                refreshUserSession(response.data.access_token, response.data.refresh_token);
                //Update the original request header

                console.log('[REPLAYING ORIGNAL REQUEST]')
                originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access_token;
                return api(originalRequest);
            })
            .catch(function (error) {
                console.log(error.response);

                if (error.response.config.url.indexOf('/token') > 0) {
                    console.log('REFRESHING TOKEN FAIL - LOGGING OUT USER');
                    logoutUserSession();
                }

                else {
                    console.log('USER HAS A VALID SESSION - BUT IS ACCESSING AN UNAUTHORIZED RESOURCE');
                    unauthorizedResourceAccessedByUser();
                }
            });
    }
    return Promise.reject(error);
});


export default api;
