import React, { Component } from 'react';
import * as d3 from 'd3';

// Define specific colors for different types
const COLOR_MAPPING = {
  'Upper': '#00B050',  // Green for Upper
  'Lower': '#FF0000',  // Dark gray for Lower
  'Holiday': '#575756', // Light gray for Holiday
  '': '#FFFFFF' // Light gray for empty type
};

// Default color palette for other values
const defaultColors = [
  '#8ce8ad', '#57e188', '#34c768', '#2db757', '#27acaa', '#42c9c2', '#60e6e1', '#93f0e6', 
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

    // Get color based on data type
getColor(d) {
    // If the data has a type property and it's not empty, use the color mapping
    if (d.data.type && d.data.type !== '' && COLOR_MAPPING[d.data.type]) {
        return COLOR_MAPPING[d.data.type];
    }
    // For empty type or blank name, use light gray
    if (!d.data.type || d.data.type === '' || !d.data.name || d.data.name === '') {
        return '#F0EEE4';
    }
    // Otherwise use the default color palette
    return defaultColors[d.index % defaultColors.length];
}

    // DrawChart 
    drawChart() {
        const { data, rotation = -90 } = this.props; // Default rotation is -90 degrees (top)
        const svgContainer = d3.select(this.chRef.current).node();
        const width = svgContainer.getBoundingClientRect().width;
        const height = width;
        const margin = 15;
        let radius = Math.min(width, height) / 2.1;
        
        // Calculate the inner radius (donut hole size)
        const innerRadius = radius / 1.5;

        // Calculate responsive font sizes based on the inner radius and screen width

        const centerFontSize = Math.max(Math.min(radius * 1.0, 480), 12); // Between 8px and 14px
        const labelFontSize = Math.max(Math.min(radius * 0.07, 138), 11); // Between 8px and 14px
        const valueFontSize = Math.max(Math.min(radius * 0.05, 14), 8); // Between 6px and 12px
        
        // legend Position
        let legendPosition = d3.arc().innerRadius(innerRadius).outerRadius(radius);

        // Create SVG
        const svg = d3.select(this.chRef.current)
            .append('svg')
            .attr("width", '100%')
            .attr("height", '100%')
            .attr('viewBox', `0 0 ${width} ${height}`)
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
                .innerRadius(innerRadius)  // This is the size of the donut hole
                .outerRadius(radius)
            )
            .attr('fill', d => this.getColor(d))
            .attr("stroke", d => (!d.data.name || d.data.name === '' || d.data.value === 0) ? 'transparent' : '#fff')
            .style("stroke-width", "1.5")
            //.style("opacity", "0.8");

        // Add "Q" in the middle of the chart
        // Add "Q" in the middle of the chart
        svg.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .attr("font-size", `${centerFontSize}px`)
            .attr("font-weight", "bold")
            .attr("font-family", "Avenir Next LT Pro, sans-serif")
            .attr("fill", "#333")
            .text(this.props.centerText || "Q"); // Use the centerText prop or default to "Q"

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
            .attr("dy", "0.35em")  // vertical centering
            .style("text-anchor", "middle")
            .style("font-weight", 700)
            .style("fill", '#FFFFFF')
            .style("font-size", `${labelFontSize}px`);

        //Label for value - only show if value is not 10
        svg
            .selectAll('.legend-g')
            .append('text')
            .text((d) => {
                // Only display value if it's not 10
                return d.data.value !== 10 ? d.data.value : '';
            })
            .style("fill", '#444')
            .style("font-size", `${valueFontSize}px`)
            .style("text-anchor", "middle")
            .attr("y", labelFontSize + 2); // Position below the label text
    }

    render() {
        return (
            <div ref={this.chRef}></div>
        );
    }
}

export default DonutChart;