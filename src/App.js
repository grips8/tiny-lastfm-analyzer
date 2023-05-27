import './App.css';
import MainForm from "./MainForm";
import {Route, Routes} from "react-router-dom";
import MainFrame from "./MainFrame";
import Artist from "./Artist";
import Album from "./Album";
import Song from "./Song";
import {Container} from "react-bootstrap";

function App() {
  return <>
      <Container
          fluid={true}
          className='vh-100 d-flex align-items-center'
          style={{overflow: "auto",
              background: 'linear-gradient(140deg, rgba(246,161,146,1) 0%, rgba(246,217,146,1) 100%)'}}
      >
          <Routes>
              <Route path='/' element={<MainForm/>}/>
              <Route element={<MainFrame/>}>
                  <Route path='/artist' element={<Artist/>}/>
                  <Route path='/album' element={<Album/>}/>
                  <Route path='/song' element={<Song/>}/>
              </Route>
          </Routes>
      </Container>
    </>
}

export default App;
