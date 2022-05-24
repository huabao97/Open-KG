import './App.css';
import "../node_modules/antd/dist/antd.css";
import React from 'react';
import NavBar from './components/NavBar';
import { BackTop } from 'antd'

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <NavBar />
          <BackTop style={{ Color: "skyblue" }} />
        </div>
      </div>

    );
  }
}

export default App;
