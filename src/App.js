import React from 'react';
import { AuthProvider } from "./context/AuthProvider";
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
import EditSettings from './components/EditSettings'
import CustomerDetails from "./components/CustomerDetails";
import RequireAuth from './components/RequireAuth';

function App() {
    return (
        <div className="App">
        <BrowserRouter>
          <AuthProvider>
                <Routes>
                    <Route exact path='/' element={<NewLogin/>}/>
                    <Route path='/signup' element={<NewSignUp/>}/>
                    <Route path='/forgot-password' element={<NewForgotPassword/>}/>
                    <Route path='/explore' element={<Explore/>}/>
                    <Route path='/location' element={<LocationPage/>}/>
                    <Route path='/customer' element={<CustomerDetails/>}/>

                    <Route element={<RequireAuth allowedRoles={["Owner"]}/>}>
                        <Route path='/owner-dashboard' element={<OwnerDashboard/>}/>
                        <Route path='/facility' element={<Facility/>}/>
                    </Route>

                    <Route element={<RequireAuth allowedRoles={["Customer"]}/>}>
                        <Route path='/customer-dashboard' element={<CustomerDashboard/>}/>
                        <Route path='/review' element={<ReviewPage/>}/>
                    </Route>

                    <Route element={<RequireAuth allowedRoles={["Owner", "Customer"]}/>}>
                        <Route path='/settings' element={<EditSettings/>}/>
                    </Route>

                    <Route path='/header-bar' element={<HeaderBar/>}/>
                    <Route path='/nps' element={<NPSComponent/>}/>
                    <Route path='/search' element={<Home/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </div>

  );
}
export default App;
