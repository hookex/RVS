import React from 'react';
import DeckGL from '@deck.gl/react';
import { LineLayer, ScatterplotLayer, ArcLayer } from '@deck.gl/layers';
import { GridLayer, ScreenGridLayer } from '@deck.gl/aggregation-layers';

// Viewport settings
const viewState = {
  longitude: 50,
  latitude: -20,
  zoom: 2,
  // pitch: 100,
  // bearing: 100
};

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
  data: getGridData(),
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
  onHover: ({object, x, y}) => {
    console.log('x, y', x, y)
  }
});

const App = ({ data, viewport }) => {
  return (<DeckGL viewState={viewState} layers={[gridLayer]} />);
}

export default App;


function getGridData() {

  let row = 100;

  let result = [];
  let startX = 0;

  while (row--) {
    startX += 1

    let col = 100;
    let startY = 0;

    while (col--) {
      startY -= 1

      result.push({
        "RACKS": 1,
        "SPACES": 1,
        "COORDINATES": [
          startX,
          startY
        ]
      })
    }
  }

  return result
}