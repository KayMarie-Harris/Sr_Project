import './App.css';
import Header from './Components/Header';
import Tabs from './Components/Tabs';

function App() {
  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
      <div className="page-content">
        <Tabs />
      </div>
    </div>
  );
}

export default App;
