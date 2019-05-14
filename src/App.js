import React from 'react';
import DeckGL from '@deck.gl/react';
import { LineLayer, ScatterplotLayer, ArcLayer } from '@deck.gl/layers';

// Viewport settings
const viewState = {
  longitude: -122.41669,
  latitude: 37.781,
  zoom: 15,
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
  inbound: 72633,
  outbound: 74735,
  from: {
    name: '19th St. Oakland (19TH)',
    coordinates: [-122.269029, 37.80787]
  },
  to: {
    name: '12th St. Oakland City Center (12TH)',
    coordinates: [-122.271604, 37.803664]
  }
}];


const arcLayer = new ArcLayer({
  id: 'arc-layer',
  data: arcData,
  pickable: true,
  getWidth: 12,
  getSourcePosition: d => d.from.coordinates,
  getTargetPosition: d => d.to.coordinates,
  getSourceColor: d => [Math.sqrt(d.inbound), 140, 0],
  getTargetColor: d => [Math.sqrt(d.outbound), 140, 0],
  onHover: ({ object, x, y }) => {
    const tooltip = `${object.from.name} to ${object.to.name}`;
  }
})

const App = ({ data, viewport }) => {
  return (<DeckGL viewState={viewState} layers={[lineLayer]} />);
}

export default App;


