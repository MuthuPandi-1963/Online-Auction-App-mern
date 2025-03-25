// Slices/AuctionSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createAuctionThunk,
  fetchAuctionsThunk,
  fetchAuctionByIdThunk,
  placeBidThunk,
  fetchAuctionByUserThunk,
  fetchAuctionByCategoryThunk
} from "../Thunks/AuctionThunk";

const initialState = {
  auctions: [],
  currentAuction: null,
  isLoading: false,
  error: null,
  message: null,
};

const HandleAuctionFulfilled = (state, action) => {
  const { success, message, data } = action.payload;
  state.isLoading = false;
  state.error = null;
  state.message = message;
  state.auctions = data;
  // if (Array.isArray(data)) {
  //   state.auctions = data;
  // } else if (data.id) {
  //   state.currentAuction = data;
  // }
};

const HandleAuctionRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload || "An error occurred";
  state.message = null;
};

const auctionSlice = createSlice({
  name: "auctions",
  initialState,
  reducers: {
    resetAuctionState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create Auction
      .addCase(createAuctionThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAuctionThunk.fulfilled, (state, action) => {
        state.auctions.push(action.payload.data);
        HandleAuctionFulfilled(state, action);
      })
      .addCase(createAuctionThunk.rejected, HandleAuctionRejected)

      // Fetch All Auctions
      .addCase(fetchAuctionsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAuctionsThunk.fulfilled, HandleAuctionFulfilled)
      .addCase(fetchAuctionsThunk.rejected, HandleAuctionRejected)

      // Fetch Single Auction
      .addCase(fetchAuctionByIdThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAuctionByIdThunk.fulfilled, HandleAuctionFulfilled)
      .addCase(fetchAuctionByIdThunk.rejected, HandleAuctionRejected)
      .addCase(fetchAuctionByUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAuctionByUserThunk.fulfilled, HandleAuctionFulfilled)
      .addCase(fetchAuctionByUserThunk.rejected, HandleAuctionRejected)
      .addCase(fetchAuctionByCategoryThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAuctionByCategoryThunk.fulfilled, HandleAuctionFulfilled)
      .addCase(fetchAuctionByCategoryThunk.rejected, HandleAuctionRejected)
      // Place Bid
      .addCase(placeBidThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(placeBidThunk.fulfilled, (state, action) => {
        const { data } = action.payload;
        if (state.currentAuction?._id === data._id) {
          state.currentAuction = data;
        }
        state.auctions = state.auctions.map(auction => 
          auction._id === data._id ? data : auction
        );
        HandleAuctionFulfilled(state, action);
      })
      .addCase(placeBidThunk.rejected, HandleAuctionRejected);
  }
});

export const { resetAuctionState } = auctionSlice.actions;
export default auctionSlice.reducer;