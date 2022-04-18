import { useState } from "react";
// import SignIn from "./components/signin";
import SignUp from "./signup";

export default function UserAuth(){
    const [logged, setLog] = useState(false);
    return <SignUp/>
}