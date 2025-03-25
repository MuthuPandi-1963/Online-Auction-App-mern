// Thunks/AuctionThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/AxiosInstance';

// Create Auction
export const createAuctionThunk = createAsyncThunk(
  'auctions/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('api/auctions', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get All Auctions
export const fetchAuctionsThunk = createAsyncThunk(
  'auctions/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('api/auctions');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get Single Auction
export const fetchAuctionByIdThunk = createAsyncThunk(
  'auctions/fetchById',
  async (auctionId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`api/auctions/${auctionId}`);
      console.log(response);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const fetchAuctionByUserThunk = createAsyncThunk(
  'auctions/fetchByUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`api/auctions/user/${id}`);
      console.log(response);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchAuctionByCategoryThunk = createAsyncThunk(
  'auctions/fetchByCategoryThunk',
  async (name, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`api/auctions/category/${name}`);
      console.log(response);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// Place Bid
export const placeBidThunk = createAsyncThunk(
  'auctions/placeBid',
  async ({ auctionId, amount }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/auctions/${auctionId}/bid`,
        { amount },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);