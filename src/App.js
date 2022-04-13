import "./App.css";
import "./Resume.css";
import "./button.css";
import ResponsiveAppBar from "./components/navbar";
import DownloadResume from "./components/downloadResume";
import Form from "./components/form";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <DownloadResume />
      {/* <Form /> */}
    </div>
  );
}

export default App;
