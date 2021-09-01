
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Movie from "./Pages/Movie";
import Details from "./Component/Details";
import Series from "./Pages/Series";
import NotFound from "./Pages/NotFound";
import Home from "./Pages/Home";
import About from "./Pages/About";
import NavBar from "./Component/NavBar";
import Footer from "./Component/Footer";
import UpBtn from "./Component/upBtn";
import HashLoader from "react-spinners/HashLoader";
import { useEffect, useState } from 'react';

function App() {

  let [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000)

  }, []);

  return (
    <>
      {

        loading ?
          <>
            <div className="w-100 d-flex justify-content-center align-items-center" style={{
              height: "100vh",
              background: "#18222b"
            }}>
              <HashLoader color={"#2196f3"} loading={loading} size={150} />
            </div>
          </>
          :
          <Router>
            <div className="App">
              <NavBar />
              <div className="Content ">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/About" component={About} />
                  <Route path="/Movie" component={Movie} />
                  <Route path="/Series" component={Series} />
                  <Route path="/Boxing/:type/:id">
                    <Details any="ahmed" />
                  </Route>
                  <Route path="*" component={NotFound} />
                </Switch>
              </div>
              <UpBtn />
              <Footer />
            </div>
          </Router>
      }
    </>
  );
}

export default App;
