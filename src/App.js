
import ResponsiveAppBar from "./components/navbar";
import DownloadResume from "./components/downloadResume";
import { useState } from "react";
import UserAuth from "./components/userAuth";
import AddRoute from "./components/routes";

function App() {
  const [login, setLogin] = useState(false)
  return (
    <div style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}} className="App">
      <ResponsiveAppBar />
      <AddRoute/>
      {/* { login ? <DownloadResume /> :  <UserAuth/>} */}
    </div>
  );
}

export default App;
