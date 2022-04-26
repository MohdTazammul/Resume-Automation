import ResponsiveAppBar from "./components/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DownloadResume from "./components/downloadResume";
import { useState } from "react";
import UserAuth from "./components/userAuth";
import AddRoute from "./components/routes";

function App() {
  return (
    <div style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}} className="App">
      <ResponsiveAppBar />
      <AddRoute/>
    </div>
  );
}

export default App;
