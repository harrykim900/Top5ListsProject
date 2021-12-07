import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGIN_GUEST: "LOGIN_GUEST",
    LOGOUT_USER: "LOGOUT_USER",
    ERROR_MESSAGE: "ERROR_MESSAGE",
    CLOSE_ACCOUNT_ERROR_MODAL: "CLOSE_ACCOUNT_ERROR_MODAL",
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorOccurred: false,
        errMsg: "",
        guestLoggedIn: false
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    guestLoggedIn: payload.guestLoggedIn
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }
            case AuthActionType.LOGIN_GUEST: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    guestLoggedIn: true
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    guestLoggedIn: false
                })
            }
            case AuthActionType.ERROR_MESSAGE: {
                return setAuth({
                    errorOccurred: true,
                    errMsg: payload.errMsg
                })
            }
            case AuthActionType.CLOSE_ACCOUNT_ERROR_MODAL: {
                return setAuth({
                    errorOccurred: false,
                    errMsg: payload.errMsg
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            if (response.data.user.username == "Guest"){
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user,
                        guestLoggedIn: true
                    }
                });
            }
            else{
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
            }

        }
    }

    auth.registerUser = async function (userData, store) {
        try {
            const response = await api.registerUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        }
        catch (err) {
            authReducer({
                type: AuthActionType.ERROR_MESSAGE,
                payload: {
                    errMsg: err.response.data.errorMessage
                }
            })
            console.log(err.response.data.errorMessage);
        }
    }

    auth.loginUser = async function (userData, store) {
        try {
            const response = await api.loginUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        }
        catch (err) {
            authReducer({
                type: AuthActionType.ERROR_MESSAGE,
                payload: {
                    errMsg: err.response.data.errorMessage
                }
            })
            console.log(err.response.data.errorMessage);
        }

    }
    auth.loginGuest = async function (userData, store) {
        const response = await api.loginGuest();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGIN_GUEST,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
            store.loadIdNamePairs();
        }


    }
    auth.logoutUser = async function (userData, store) {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGOUT_USER,
                payload: {
                    user: null,
                    loggedIn: false
                }
            })
            history.push("/");

        }
    }

    auth.closeAccountErrorModal = async function () {
        authReducer({
            type: AuthActionType.CLOSE_ACCOUNT_ERROR_MODAL,
            payload: {
                errMsg: auth.errMsg
            }
        })
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };