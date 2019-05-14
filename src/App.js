import React from 'react';
import DeckGL from '@deck.gl/react';
import { LineLayer, ScatterplotLayer, ArcLayer } from '@deck.gl/layers';

// Viewport settings
const viewState = {
  longitude: 0.5,
  latitude: 0.5,
  zoom: 1,
  pitch: 0,
  bearing: 0
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
  data: arcData,
  pickable: false,
  getWidth: 100,
  getSourcePosition: d => d.from.coordinates,
  getTargetPosition: d => d.to.coordinates,
  getSourceColor: d => [Math.sqrt(d.inbound), 140, 0],
  getTargetColor: d => [Math.sqrt(d.outbound), 140, 0],
})

const App = ({ data, viewport }) => {
  return (<DeckGL viewState={viewState} layers={[arcLayer]} />);
}

export default App;


