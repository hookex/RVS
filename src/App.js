import React from 'react';
import FPSStats from "react-fps-stats";

// import { IncreaseLayer } from './increaseLayer';
import { Increase } from './increase'

import { IncreaseScatterPlot } from './increaseScatterPlot'
import {RandomScatterPlot} from './randomScatterPlot.js'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <FPSStats />
        <RandomScatterPlot />
      </div>
    );
  }
}

export default App;