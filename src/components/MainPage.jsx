import "./MainPage.css";
import logo from "../assets/logo.svg";

const MainPage = () => {
  const handleStartButtonClick = () => {
    window.scrollTo(0, document.documentElement.clientHeight);
  };

  return (
    <div>
      <h1 className="site-logo">
        <img
          src={logo}
          alt="Tesla Logo"
          aria-label="Tesla Logo"
          draggable="false"
        />
      </h1>

      <div className="main-container">
        <h1 className="site-title">Build Your Energy Battery Site</h1>

        <button className="start-button" onClick={handleStartButtonClick}>
          Start Building
        </button>
      </div>
    </div>
  );
};

export default MainPage;
