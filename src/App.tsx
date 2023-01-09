import "./App.css";
import MainPage from './components/MainPage';
import SiteBuilder from "./components/SiteBuilder";

function App() {
  return (
    <div className="App" data-testid="app-container">
      <MainPage />
      <SiteBuilder/>
    </div>
  );
}

export default App;
