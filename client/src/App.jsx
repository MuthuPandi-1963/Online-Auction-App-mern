import { Route, Routes } from "react-router-dom";
import Navbar from "./pages/navbar/Navbar";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Categories from "./pages/categories/Categories";
import Hero from "./pages/hero/Hero";
import { useEffect } from "react";
import { fetchUserData } from "./store/Thunks/GetUserThunk";
import { useDispatch, useSelector } from "react-redux";
import ProfileDashboard from "./pages/profile/Profile";
import dummyProfile, { sampleAuctions } from "./utils/DummyProfileData";
import MyAuction from "./pages/auction/Myauction";
import CreateAuction from "./pages/auction/CreateAuction";
import { fetchAuctionsThunk } from "./store/Thunks/AuctionThunk";
import AuctionList from "./pages/auction/AuctionList";
import AuctionDetail from "./pages/auction/AuctionDetails";
import CategoriesList from "./pages/categories/CategoryList";

export default function App() {
  const data = useSelector((state) => state.auth);
  const auctions = useSelector((state) => state.auction);
  console.log(data,auctions);
  
   const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchAuctionsThunk());
  },[dispatch])
  return(
    <Routes>
      <Route path="/" element={<Navbar/>}>
      <Route path="" element={<Hero/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/categories" element={<Categories/>} />
      <Route path="/profile" element={<ProfileDashboard profile={dummyProfile} auctions={sampleAuctions}/> } />

      
      <Route path="/myauction" element={<MyAuction/>} />
      <Route path="/myauction/create" element={<CreateAuction/>} />
      <Route path="/auctions" element={<AuctionList/>} />
      <Route path="/auctions/:id" element={<AuctionDetail/>} />
      <Route path="/categories/:name" element={<CategoriesList/>} />

      </Route>
    </Routes>
  )
}