import React from 'react';
import FPSStats from "react-fps-stats";
import DeckGL from '@deck.gl/react';
import { LineLayer, ScatterplotLayer, ArcLayer, PolygonLayer } from '@deck.gl/layers';
import { GridLayer, ScreenGridLayer } from '@deck.gl/aggregation-layers';

import { RandomColor } from './randomColor.js'
import { Increase } from './increase.js';
import { IncreaseLayer } from './increaseLayer';

// Data to be used by the LineLayer
const data = [{ sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781] }];

const lineLayer = new LineLayer({ id: 'line-layer', data });
const scatterLayer = new ScatterplotLayer({
  id: 'bart-stations',
  data: '/bart-stations.json',
  getRadius: d => Math.sqrt(d.entries) / 100,
  getPosition: d => d.coordinates,
  getFillColor: [255, 228, 0],
})

const arcData = [{
  from: {
    coordinates: [0, 0]
  },
  to: {
    coordinates: [1, 1]
  }
}];


const arcLayer = new ArcLayer({
  id: 'arc-layer',
  data: { COORDINATES: [-122.42177834, 37.78346622] },
  pickable: false,
  getWidth: 100,
  getSourcePosition: d => d.from.coordinates,
  getTargetPosition: d => d.to.coordinates,
  getSourceColor: d => [Math.sqrt(d.inbound), 140, 0],
  getTargetColor: d => [Math.sqrt(d.outbound), 140, 0],
})

const gridLayer = new ScreenGridLayer({
  id: 'screen-grid-layer',
  data,
  pickable: false,
  opacity: 1,
  cellSizePixels: 40,
  colorRange: [
    [0, 25, 0, 25],
    [0, 85, 0, 85],
    [0, 127, 0, 127],
    [0, 170, 0, 170],
    [0, 190, 0, 190],
    [0, 255, 0, 255]
  ],
  getPosition: d => d.COORDINATES,
  getWeight: d => d.SPACES,
  onHover: ({ object, x, y }) => {

  }
});

const polygonData =
  [
    // {
    //   // Simple polygon (array of coords)
    //   contour: [[-122.4, 37.7], [-122.4, 37.8], [-122.5, 37.8], [-122.5, 37.7]],
    // },
    {
      // Simple polygon (array of coords)
      contour: [[1, 1], [1, 2], [2, 2], [2, 1]],
    },
  ]





// Viewport settings
const viewState = {
  longitude: 0,
  latitude: 0,
  zoom: 2,
  pitch: 50,
  controller: true
  // bearing: 100
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.animate()
  }

  animate() {
    this.setState({})
    requestAnimationFrame(() => this.animate());
  }

  render() {
    const polygonLayer = new PolygonLayer({
      id: 'polygon-layer',
      data: getRectData(),
      pickable: false,
      stroked: false,
      filled: true,
      extruded: true,
      // wireframe: true,
      // lineWidthMinPixels: 1,
      getPolygon: d => d.contour,
      // getElevation: d => d.population / d.area / 10,
      getFillColor: d => {
        var colors = [[79, 134, 236], [217, 80, 63], [242, 189, 66], [88, 165, 92]]
        let num = parseInt(getRandom(4))
        return colors[num] || [0, 0, 0]
      },
      // getLineColor: [255, 255, 255],
      // getLineWidth: 0,
      // onHover: ({ object, x, y }) => {
      //   // const tooltip = `${object.zipcode}\nPopulation: ${object.population}`;
      //   /* Update tooltip
      //      http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
      //   */
      // }
    })

    return (
      <div>
        <FPSStats />
        {/* <RandomColor/> */}
        <IncreaseLayer />
      </div>
    );
  }
}

export default App;


function getRectData() {
  let row = 128;
  let border = 0.1;

  let result = [];
  let startX = -row / 2;

  while (row--) {
    startX += 1

    let col = 128;
    let startY = -col / 2;

    while (col--) {
      startY += 1

      result.push({
        contour: [[startX + border, startY + border], [startX + 1 - border, startY + border], [startX + 1 - border, startY + 1 - border], [startX + border, startY + 1 - border]],
      })
    }
  }

  return result
}

function getRandom(num1, num2) {
  if (num1 !== undefined && num2 !== undefined) {
    return num1 + Math.random() * (num2 - num1);
  } else if (num1 !== undefined && num2 === undefined) {
    return Math.random() * num1;
  } else {
    return Math.random();
  }
}