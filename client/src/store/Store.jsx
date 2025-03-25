import { configureStore} from '@reduxjs/toolkit';
import AuthSlice from './Slices/AuthSlice.jsx'
import AuctionSlice from './Slices/AuctionSlice.jsx'
const store = configureStore({
    reducer:{
        auth : AuthSlice,
        auction : AuctionSlice
    }
})

export default store;