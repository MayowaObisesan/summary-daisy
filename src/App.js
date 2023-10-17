import { RouterProvider } from 'react-router-dom';
import './App.css';
// import NavBar from './components/NavBar';
// import SummaryItem from './components/SearchItems';
import './input.css';
import { router } from './router';

function App() {
  const groupedResult = {
    title: "",
    displayLink: "",
    summary_text: ""
  }
  const hostName = "";
  return (
    <RouterProvider router={router} />
  );
}

export default App;
