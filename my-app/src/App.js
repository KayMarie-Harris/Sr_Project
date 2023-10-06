import './App.css';
import Header from './Components/Header';
import Tabs from './Components/Tabs';

function App() {
  const [isLoggedIn, setIsLoggedin] = useState(false);

  const handleLogin = () => {
    setIsLoggedin(true)
  }

  const handleLogout = () => {
    setIsLoggedin(false)
  }

  return (
    <div className="App">
      <div className="header">
        <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      </div>
      <div className="page-content">
        <Tabs isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}

export default App