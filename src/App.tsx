import './globals.css';
import {Route, Routes} from 'react-router-dom';
import SigninForm from './_auth/forms/SigninForm';
import {
    Home,
    Explore,
    PostDetails,
    Profile,
    EditPost,
    UpdateProfile,
    AllUsers,
    CreatePost,
    LikePosts,
    Saved
} from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import SignupForm from './_auth/forms/SignupForm';
import RootLayout from './_root/RootLayout';
import {Toaster} from "@/components/ui/toaster";
import React from "react";

const App = () => {
    return (
        <main className="flex h-screen">
            <Routes>
                {/* Public Routes */}
                <Route element={<AuthLayout/>}>
                    <Route path="/sign-in" element={<SigninForm/>}/>
                    <Route path="/sign-up" element={<SignupForm/>}/>
                </Route>
                {/*Priveate Routes */}
                <Route element={<RootLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/explore" element={<Explore/>}/>
                    <Route path="/saved" element={<Saved/>}/>
                    <Route path="/all-users" element={<AllUsers/>}/>
                    <Route path="/create-post" element={<CreatePost/>}/>
                    <Route path="/update-post/:id" element={<EditPost/>}/>
                    <Route path="/posts/:id" element={<PostDetails/>}/>
                    <Route path="/profile/:id/*" element={<Profile/>}/>
                    <Route path="/update-profile/:id/" element={<UpdateProfile/>}/>
                </Route>
            </Routes>
            <Toaster/>
        </main>
    )
}

export default App;