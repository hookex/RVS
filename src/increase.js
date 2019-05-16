import React from 'react';
import FPSStats from "react-fps-stats";
import DeckGL from '@deck.gl/react';
import { LineLayer, ScatterplotLayer, ArcLayer, PolygonLayer } from '@deck.gl/layers';
import { GridLayer, ScreenGridLayer } from '@deck.gl/aggregation-layers';
import { getRectData, getRandom } from './util'


// Viewport settings
const viewState = {
    longitude: 0,
    latitude: 0,
    zoom: 2,
    pitch: 50,
    controller: true
    // bearing: 100
};

export class Increase extends React.Component {
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
        const polygonLayer = new PolygonLayer({
            id: 'polygon-layer',
            data: getRectData(this.row, this.col, 0, 0),
            pickable: false,
            stroked: false,
            filled: true,
            // extruded: false,
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
                <DeckGL viewState={viewState} layers={[polygonLayer]} />
            </div>
        );
    }
}



