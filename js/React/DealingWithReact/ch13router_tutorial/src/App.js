import {Routes,Route,Link} from 'react-router-dom'
import About from './About'
import Home from './Home'
import Profiles from './Profiles'
import Profile from './Profile'

function App() {
  return (
    <>
      <Routes>
        <Route path ="/" element={<Home/>}></Route>
        <Route path ="/about" element={<About />}></Route>
        <Route path = "/profiles" element= {<Profiles/>}>
          <Route path=":username" element={<Profile />} />
        </Route>
        
      </Routes>
      <p><Link to="/">홈</Link></p>
      <p><Link to="/about">소개  </Link></p>
      <p><Link to="/profiles">프로필  </Link></p>
    </>
  );
}

export default App;
