import './App.css';
import Header from './Components/Header';
import ShowLogin from './Components/LoginRegister';

function App() {
  return (
    <div className="App">
      <div className="header">
        <Header />
        <ShowLogin />
      </div>
      <div className="Content">
        {/* tabs & content here */}
      </div>
    </div>
  );
}

export default App;
