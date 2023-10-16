import './App.css';
import { AuthProvider } from './Components/AuthContex';
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
    <AuthProvider>
      <div className="App">
        <div className="header">
          <Header />
        </div>
        <div className="page-content">
          <Tabs />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App