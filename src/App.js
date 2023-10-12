import Navbar from "./components/Navbar";
import Home from "./views/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./views/CreateReview";
import ReviewDetails from "./components/ReviewDetails";
import NotFound from "./views/NotFound";
import LandingPage from "./views/LandingPage";
import About from "./views/About";
import Contact from "./views/Contact";


function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route exact path="/landing">
              <LandingPage />
            </Route>
            <Route exact path="/">
              <Navbar />
              <Home />
            </Route>
            <Route path="/create">
              <Navbar />
              <Create />
            </Route>
            <Route path="/review/:id">
              <Navbar />
              <ReviewDetails />
            </Route>
            
            <Route path="/About">
            <Navbar />
              <About />
            </Route>

            <Route path="/Contact">
            <Navbar />
              <Contact />
            </Route>


            <Route exact path="/Login">
            <Navbar />
              <LandingPage />
            </Route>



            <Route path="*">
              <Navbar />
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
