import './App.css';
import InfoBar from './components/infoBar/infoBar';
import Navbar from './components/shared/navbar/navbar';
import ListLayout from './components/trelloList/listLayout/listLayout';
import Router from './router/Router';


function App() {

  return (
    <>
      <Navbar />
      <Router />
    </>
  )
}

export default App;
