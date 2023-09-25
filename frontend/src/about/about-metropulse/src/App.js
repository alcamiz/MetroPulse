import logo from './logo.svg';
import './App.css';
import { Button } from "react-bootstrap";
//import "bootstrap/dist/css/boostrap.min.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/Aps</code> and save to reload.
        </p>
        <Button> Sample Button </Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          OK!
        </a>
      </header>
    </div>
  );
}

export default App;
