import "./App.css";
import "./Resume.css";
import "./button.css";
import ResponsiveAppBar from "./components/navbar";
import DownloadResume from "./components/downloadResume";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <DownloadResume />
    </div>
  );
}

export default App;
