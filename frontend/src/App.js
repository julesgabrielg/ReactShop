
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import React from "react";
import ProductScreen from './screens/ProductScreen';


function App() {
  return (
    <BrowserRouter>
    <div>
      <header>
      <Link to="/">Tindahan</Link>
      </header>
      <main>
        <Routes>
          <Route path="/product/:slug" element={<ProductScreen/>}/>
          <Route path ="/" element={<HomeScreen />}/>
        </Routes>
        
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
