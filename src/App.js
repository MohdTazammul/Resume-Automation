// import ResponsiveAppBar from "./components/navbar";
// import DownloadResume from "./components/DownloadResume/downloadResume";
import Form from "./components/Form";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import DownloadResume from "./components/downloadResume";
import "./App.css";


function App() {
  return (
  <BrowserRouter>
    <div className="App">
    {/* <ResponsiveAppBar /> */}
     <Routes>
     {/* <Route path="/home" element={<DownloadResume />}>
     </Route>   */}
     
     <Route path="/form" element={<Form />}>
     </Route>
     </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
