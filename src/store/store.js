import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice';

const store = configureStore({
    reducer : {
        // fill later
        auth : authSlice
    }
})

export default store;