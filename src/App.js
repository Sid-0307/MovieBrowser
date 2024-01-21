import "./App.css";
import Navbar from "./components/navbar";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./components/Search";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/search/:movie" element={<Search />} />
          <Route exact path="/genre/:movie" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
