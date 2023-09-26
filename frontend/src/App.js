import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './homepage/HomePage';
import HoodInstance from './instances/Hoods';
import CenterInstance from './instances/TestCenter';
import MedicalInstance from './instances/Facilities';
import React from 'react';



function App() {

  // var routes = [];
  // const t_names = [{name: "test", comp: CenterInstance}, {name: "medical", comp: MedicalInstance}, {name: "hoods", comp: HoodInstance}]

  // for (var i=0; i < 3; i++) {
  //   for (var j=0; j < 3; j++) {
  //     routes.push({ path: "/" + t_names[i].name + "/" + j, exact: true, component: React.cloneElement(t_names[i].comp, {index: j})})
  //   }
  // }

  return (
    <div className="App">
      <Router>
        <div />
        <div>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
          </Routes>
        </div>
      </Router>
      <div />
    </div>


  );
}

export default App;
