import Home from './Home';
import Login from './Login';
import Register from './Register';
import React, { useState } from 'react';

import {BrowserRouter, Routes, Route} from "react-router-dom";
import News from './News';
function App() {
  const pageSize = 5;
  const apiKey = "75c2b4880b1244efb81476ef24a51067"
  const [progress, setProgress] = useState(0)
  const currentPage = 1
  return (
    
    <div style={{marginTop : '-3.5rem'}}>
      <BrowserRouter >
        <Routes>
          <Route path="/" element ={<Register/>} />
          <Route path="/register" element ={<Register/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/home" element ={<Home/>} />
          <Route path="/feed" element ={<News setProgress={setProgress} apiKey={apiKey} key="newsForYou" pageSize={pageSize} country="us" category="newsForYou"/>} />
          <Route path="/business" element ={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="us" category="business"/>} />
          <Route exact path="/entertainment" element = {<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="us" category="entertainment"/>}></Route> 
          <Route exact path="/general" element = {<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general"/>}></Route> 
          <Route exact path="/health" element = {<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="us" category="health"/>}></Route> 
          <Route exact path="/science" element = {<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="us" category="science"/>}></Route> 
          <Route exact path="/sports" element = {<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="us" category="sports"/>}></Route> 
          <Route exact path="/technology" element = {<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="us" category="technology"/>}></Route> 

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
