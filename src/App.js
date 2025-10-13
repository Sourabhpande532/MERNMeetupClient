import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Header } from './component/Header';
import { MeetupEvents } from './component/MeetupEvents';
function App() {
  return (
    <div className="container bg-color">
     <Header/>
     <hr/>
     <MeetupEvents/>
    </div>
  );
}

export default App;
