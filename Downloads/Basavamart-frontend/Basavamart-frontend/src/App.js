import './App.css';
// import Main from './components/admin/Main';
import Pages from './components/pages/Pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Pages />
      
    </div>
  );
}

export default App;
