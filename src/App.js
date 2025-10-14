import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Header } from './component/Header';
import { MeetupEvents } from './component/MeetupEvents';
import { useState } from 'react';

function App() {
  // Shared states for both component
  const [search, setSearch] = useState( "Tech Conference" );
  const [type, setType] = useState( "Both" )
  return (
    <div className="container bg-color">
      {/* Pass props to both component */ }
      <Header search={ search } setSearch={ setSearch } />
      <hr />
      <MeetupEvents search={ search } type={ type } setType={ setType } />
    </div>
  );
}

export default App;
