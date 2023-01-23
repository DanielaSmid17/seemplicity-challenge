import './App.css';
import Findings from './components/Findings';
import NavBar from './components/NavBar'
import Footer from './components/Footer';

function App() {
  return (
    <div className="App" style={{backgroundColor: '#F9F9FB'}}>
      <NavBar />
      <Findings />
      <Footer />
    </div>
  );
}

export default App;
