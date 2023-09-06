import './App.css';
import Header from './Components/Header';
import ShowLogin from './Components/LoginRegister';
import Tabs from './Components/Tabs';

function App() {
  return (
    <div className="App">
      <div className="header">
        <Header />
        <ShowLogin />
      </div>
      <div className="Content">
        <Tabs />
      </div>
    </div>
  );
}

export default App;
