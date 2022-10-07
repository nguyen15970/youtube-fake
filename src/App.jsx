import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./components/screenns/homeScreen/HomeScreen";
import { Container } from "react-bootstrap";
import "./App.scss" 
import {  useState } from "react";
import { Login } from "./components/screenns/login/Login";
import {Watch} from "./components/screenns/watch/WatchPage"

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; 
import Search from "./components/screenns/search/Search";

export const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false)
  const handleToggleSidebar = () => toggleSidebar(value => !value)


  return (
    <div className="App">
       <Header handleToggleSidebar={handleToggleSidebar}/>
       <div className="app__container ">
         <Sidebar sidebar={sidebar}/>
         <Container fluid className="App__main ">
             {children}
         </Container>
       </div>
     </div>
  )
}
export const Layout1 = ({ children }) => {
  return (
    <div className="App">
       <Header />
       <div className="app__container ">
         <Container fluid className="App__main ">
             {children}
         </Container>
       </div>
     </div>
  )
}

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" exact element= { <Layout><HomeScreen/></Layout>} />
            <Route path="/login" element= {<Login/>} />
            <Route path="/search" exact element= {<Layout><Search/></Layout>} />
            <Route path="/watch/:id" exact element= {<Layout1><Watch/></Layout1>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
