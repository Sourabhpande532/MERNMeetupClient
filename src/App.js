import "bootstrap/dist/css/bootstrap.min.css"
import { Header } from './component/Header';
import { MeetupEvents } from './component/MeetupEvents';

function App({search,setSearch,type,setType}) {
  // const [search, setSearch] = useState( "" );
  // const [type, setType] = useState( "Both" );
  return (
    <div className="container bg-color">
      {/* Pass props to both component */ }
      <MeetupEvents search={ search } type={ type } setType={ setType } />
    </div>
  );
}

export default App;
