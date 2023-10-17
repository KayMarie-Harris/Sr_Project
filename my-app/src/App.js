import './App.css';
import { AuthProvider } from './Components/AuthContex';
import Header from './Components/Header';
import Tabs from './Components/Tabs';

function App() {

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