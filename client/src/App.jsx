import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import User from './Routes/User'
import Admin from './Routes/Admin'
import Host from './Routes/Host'



function App() {
  return (
    <div>
    
   <Router>
    <Routes>
      <Route  path='/*' element={<User/>}/>
      <Route path='/admin/*' element={<Admin/>}/>
      <Route path='/host/*' element={<Host/>}/>

    </Routes>

   </Router>
  </div>
  );
}

export default App;