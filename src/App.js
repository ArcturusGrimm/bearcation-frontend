import React from 'react';
import './App.css';

import {Route, Routes, BrowserRouter} from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import NPSComponent from './oldComponents/NPSComponent';
import Home from "./components/LoadSearch";
import NewLogin from "./components/NewLogin";
import Explore from "./components/Explore";
import NewSignUp from './components/NewSignUp';
import NewForgotPassword from './components/NewForgotPassword';
import Facility from './components/Facility';
import LocationPage from './components/LocationPage';
import ReviewPage from './components/ReviewPage';
import HeaderBar from './components/HeaderBar';
import CustomerDashboard from './components/CustomerDashboard';
import OwnerDashboard from './components/OwnerDashboard';

function App() {
    return (
        <div className="App">
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<NewLogin/>}/>
                <Route path='/signup' element={<NewSignUp/>}/>
                <Route path='/forgot-password' element={<NewForgotPassword/>}/>
                <Route path='/nps' element={<NPSComponent/>}/>
                <Route path='/search' element={<Home/>}/>
                <Route path='/explore' element={<Explore/>}/>
                <Route path='/facility' element={<Facility/>}/>
                <Route path='/location' element={<LocationPage/>}/>
                <Route path='/review' element={<ReviewPage/>}/>
                <Route path='/header-bar' element={<HeaderBar/>}/>
                <Route path='/customer-dashboard' element={<CustomerDashboard/>}/>
                <Route path='/owner-dashboard' element={<OwnerDashboard/>}/>
            </Routes>
        </BrowserRouter>
    </div>

  );
}
export default App;
