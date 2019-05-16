import React from 'react';
import FPSStats from "react-fps-stats";
import DeckGL from '@deck.gl/react';
import { PolygonLayer } from '@deck.gl/layers';
import { getCurRect, getRandom } from './util'


// Viewport settings
const viewState = {
    longitude: 0,
    latitude: 0,
    zoom: 3,
    pitch: 50,
    controller: true
    // bearing: 100
};

export class IncreaseLayer extends React.Component {
    constructor(props) {
        super(props);
        this.totalRow = 20;
        this.totalCol = 20;

        this.row = 0
        this.col = 0

        this.state = {
            layers: []
        };
    }

    componentDidMount() {
        this.animate()
    }

    animate() {
        if (this.row === this.totalRow && this.col === this.totalCol) {
            return
        }
        const polygonLayer = new PolygonLayer({
            id: 'polygon-layer' + Date.now(),
            data: [getCurRect(this.row, this.col)],
            pickable: false,
            stroked: true,
            filled: true,
            extruded: false,
            // wireframe: true,
            // lineWidthMinPixels: 1,
            getPolygon: d => d.contour,
            // getElevation: d => d.population / d.area / 10,
            getFillColor: d => {
                var colors = [[79, 134, 236], [217, 80, 63], [242, 189, 66], [88, 165, 92]]
                let num = parseInt(getRandom(4))
                return colors[num] || [0, 0, 0]
            },
            getLineColor: [255, 255, 255],
            getLineWidth: 1,
        })

        if (this.col === this.totalCol) {
            this.row++
            this.col = 0
        } else {
            this.col++
        }

        let layers = [...this.state.layers]

        layers.push(polygonLayer)

        console.time("123")

        this.setState({
            layers: layers
        })
        console.timeEnd("123")


        requestAnimationFrame(() => this.animate());
    }

    render() {
        return (
            <div>
                <FPSStats />
                <DeckGL viewState={viewState} layers={this.state.layers} />
            </div>
        );
    }
}



