import React, { Component } from 'react';
import * as d3 from 'd3';

const colors = [
  '#00B050', '#575756', '#FF0000', '#D9D9D9', '#27acaa', '#42c9c2', '#60e6e1', '#93f0e6', 
  '#87d3f2', '#4ebeeb', '#35a4e8', '#188ce5', '#542ea5', '#724bc3', '#9c82d4', '#c981b2', 
  '#b14891', '#ff6d00', '#ff810a', '#ff9831', '#ffb46a', '#ff9a91', '#ff736a', '#f95d54', 
  '#ff4136', '#c4c4cd'
];

class DonutChart extends Component {
    constructor(props) {
        super(props);
        this.chRef = React.createRef();
    }

    // Chart load after component Mount
    componentDidMount() {
        this.drawChart();
    }

    // DrawChart 
    drawChart() {
        const { data, rotation = -90 } = this.props; // Default rotation is -90 degrees (top)
        const svgContainer = d3.select(this.chRef.current).node();
        const width = svgContainer.getBoundingClientRect().width;
        const height = width;
        const margin = 15;
        let radius = Math.min(width, height) / 2 - margin;
        // legend Position
        let legendPosition = d3.arc().innerRadius(radius/1.75).outerRadius(radius);

        // Create SVG
        const svg = d3.select(this.chRef.current)
            .append('svg')
            .attr("width", '100%')
            .attr("height", '100%')
            .attr('viewBox', '0 0 ' + width + ' ' + width)
            .append("g")
            .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")");

        // Convert rotation from degrees to radians
        const rotationRadians = (rotation * Math.PI) / -3300;

        // Create pie layout with rotation
        let pie = d3.pie()
            .value(d => d.value)
            .startAngle(rotationRadians)
            .endAngle(rotationRadians + 2 * Math.PI);
            
        let data_ready = pie(data);

        // Donut partition  
        svg
            .selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(radius / 1.75)  // This is the size of the donut hole
                .outerRadius(radius)
            )
            .attr('fill', (d) => colors[d.index])
            .attr("stroke", "#fff")
            .style("stroke-width", "2")
            .style("opacity", "0.8");

        // Legend group and legend name 
        svg
            .selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('g')
            .attr("transform", d => `translate(${legendPosition.centroid(d)})`)
            .attr("class", 'legend-g')
            .style("user-select", "none")
            .append('text')
            .text(d => d.data.name)
            .style("text-anchor", "middle")
            .style("font-weight", 700)
            .style("fill", '#222')
            .style("font-size", 14);

        //Label for value - only show if value is not 10
        svg
            .selectAll('.legend-g')
            .append('text')
            .text((d) => {
                // Only display value if it's not 10
                return d.data.value !== 10 ? d.data.value : '';
            })
            .style("fill", '#444')
            .style("font-size", 12)
            .style("text-anchor", "middle")
            .attr("y", 16);
    }

    render() {
        return (
            <div ref={this.chRef}></div>
        );
    }
}

export default DonutChart;

