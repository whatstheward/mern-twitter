import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Root from './components/root' // need to make this component
import configureStore from './store/store'
import jwt_decode from 'jwt-decode'
import { setAuthToken } from './util/session_api_util' 
import { logout } from './actions/session_actions' // need to create this action

document.addEventListener('DOMContentLoaded', ()=> {
    console.log('loaded')
    let store
    // If a return user has a session token stored in localStorage
    if(localStorage.jwtToken){
        // set the token as a common header for all axios requests
        setAuthToken(localStorage.jwtToken)
        // decode the token
        const decodedUser = jwt_decode(localStorage.jwtToken);
        //create a preconfigured state we can immediately add to our store
        const preloadedState = { session: { isAuthenticated: true, user: decodedUser}}
        
        store = configureStore(preloadedState)
        
        const currentTime = Date.now()/1000
        if(decodedUser.exp < currentTime){
            // logout the user and redirect to login
            store.dispatch(logout())
            window.location.href = '/login'
        }
    }else{
        // if this is a first time user store start empty
        store = configureStore({})
    }
    // render our root component and pass in the store as a prop 
    const root = document.getElementById('root')
    ReactDOM.render(<Root store={store}/>, root);
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
