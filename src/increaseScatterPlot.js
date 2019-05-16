import React from 'react';
import FPSStats from "react-fps-stats";
import DeckGL from '@deck.gl/react';
import { LineLayer, ScatterplotLayer, ArcLayer, PolygonLayer } from '@deck.gl/layers';
import { GridLayer, ScreenGridLayer } from '@deck.gl/aggregation-layers';
import { getRectData, getRandom, getScatterPlot } from './util'


// Viewport settings
const viewState = {
    longitude: 1,
    latitude: 1,
    // longitude: -122.466233,
    // latitude: 37.6846380,
    zoom: 3,
    pitch: 1,
    // controller: true
    // bearing: 100
};

export class IncreaseScatterPlot extends React.Component {
    constructor(props) {
        super(props);
        this.totalRow = 64;
        this.totalCol = 64;

        this.row = 0
        this.col = 0
    }

    componentDidMount() {
        this.animate()
    }

    animate() {
        if (this.row === this.totalRow && this.col === this.totalCol) {
            return
        }

        if (this.col === this.totalCol) {
            this.row++
            this.col = 0
        } else {
            this.col++
        }

        this.setState({})

        requestAnimationFrame(() => this.animate());
    }

    render() {
        const polygonLayer = new ScatterplotLayer({
            id: 'polygon-layer',
            data: getScatterPlot(this.row, this.col),
            // data: [
            //     { name: 'Colma', passengers: 42140, coordinates: [1, 1] },
            //     { name: 'Civic Center', passengers: 247980, coordinates: [2, 2] },
            // ],
            stroked: true,
            filled: true,
            getPosition: d => d.coordinates,
            getRadius: d => Math.sqrt(d.passengers),
            getFillColor: d => {
                var colors = [[79, 134, 236], [217, 80, 63], [242, 189, 66], [88, 165, 92]]
                let num = parseInt(getRandom(4))
                return colors[num]
            },
        })

        return (
            <div>
                <DeckGL viewState={viewState} layers={[polygonLayer]} />
            </div>
        );
    }
}



