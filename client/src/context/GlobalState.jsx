///////////////////// Global State////////////// 

// Requiring third party packages
import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// Requiring inbuilt packages
import AppReducer from './AppReducer';

// Initial State
const initialState = {
    users: [],
    transactions: [],
    token: null,
    error: null,
    loading: true
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const getToken = () => {
        return localStorage.getItem('token');
    }

    const getCurrentUser = () => {
        try {
            const jwt = localStorage.getItem('token');
            return jwtDecode(jwt);
        } catch (error) {
            return null;
        }
    }

    axios.defaults.headers.common['x-auth-token'] = getToken();

    const config = {
        headers: { 'Content-Type': 'application/json' }
    };

    async function getTransaction(query) {
        try {
            const res = await axios.get(`/api/transactions/getTransaction/${query}`);
            dispatch({
                type: 'GET_TRANSACTION',
                payload: res.data.data
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data
            });
        }
    }

    async function getTransactions() {
        try {
            const res = await axios.get(`/api/transactions/getTransactions`);
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data
            });
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`/api/transactions/deleteTransactions/${id}`);
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            });
        }
    }

    async function addTransaction(transaction) {
        try {
            await axios.post(`/api/transactions/addTransactions`, transaction, config);
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            });
        }
    }

    async function updateTransaction(id, transaction) {
        try {
            const res = await axios.put(`/api/transactions/updateTransaction/${id}`, transaction, config);
            dispatch({
                type: 'UPDATE_TRANSACTION',
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            });
        }
    }

    function resetTransaction() {
        dispatch({
            type: 'RESET_TRANSACTION'
        })
    }

    async function registerUser(user) {
        try {
            const res = await axios.post('api/users/register', user, config);
            dispatch({
                type: 'REGISTER_USER',
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: 'LOGIN_ERROR',
                payload: error.response.data
            });
        }
    }

    async function loginUser(user) {
        try {
            const res = await axios.post('/api/users/login', user, config);
            dispatch({
                type: 'LOGIN_USER',
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: 'LOGIN_ERROR',
                payload: error.response.data
            });
        }
    }

    async function loadUser() {
        try {
            const res = await axios.get('/api/users/user');
            dispatch({
                type: 'LOAD_USER',
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: 'LOGIN_ERROR',
                payload: error.response
            });
        }
    }

    async function updateUser(id, user) {
        try {
            const res = await axios.put(`/api/users/user/${id}`, user, config);
            dispatch({
                type: 'UPDATE_USER',
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: 'LOGIN_ERROR',
                payload: error.response
            });
        }
    }

    function logoutUser() {
        dispatch({
            type: 'LOGOUT_USER'
        });
    }

    return (
        <GlobalContext.Provider
            value={{
                token: state.token,
                transactions: state.transactions,
                users: state.users,
                error: state.error,
                loading: state.loading,
                getTransaction,
                getTransactions,
                deleteTransaction,
                addTransaction,
                updateTransaction,
                resetTransaction,
                registerUser,
                loginUser,
                loadUser,
                updateUser,
                logoutUser,
                getToken,
                getCurrentUser
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
