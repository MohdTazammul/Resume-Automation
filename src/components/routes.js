import {Route, Routes} from "react-router-dom";
import UserAuth from "../components/userAuth"
import SignIn from "../components/signin"
import SignUp from "./signup";
import DownloadResume from "./downloadResume";

export default function AddRoute(){

    return (
        <>
            <Routes>
                <Route path="/" element={<UserAuth/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/downloadresume" element={<DownloadResume/>}/>
            </Routes>
            
        </>
    )

}

