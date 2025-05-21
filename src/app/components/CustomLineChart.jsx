import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  LabelList
} from 'recharts';

function CustomLineChart({
  data,
  targetValue,
  yDomain = [0, 100],
  decimalPlaces = 1,
  higherIsBetter = true,
  tooltipSuffix = '',
  daysToShow = 0, // 0 means show all data
  highlightAboveTarget = false
}) {
  // Filter data if daysToShow is specified
  const displayData = daysToShow > 0 ? data.slice(-daysToShow) : data;

  return (
    <div className="max-w-4xl">
      <div className="bg-white p-0">
        <div className="h-30">
          <ResponsiveContainer width="100%" height="115%">
            <LineChart data={displayData} margin={{ top: 10, right: 10, left: 1, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />

              {/* Conditional green area based on highlightAboveTarget */}
              <ReferenceArea
                y1={highlightAboveTarget ? targetValue : yDomain[0]}
                y2={highlightAboveTarget ? yDomain[1] : targetValue}
                strokeOpacity={0}
                fill="green"
                fillOpacity={0.2}
              />
              <XAxis
                dataKey="name"
                type="category"
                scale="point"
                tickFormatter={(tick) => tick.split('/')[0].padStart(2, '0')}
                tick={{ fontSize: 8 }}
              />
              <YAxis
                width={20}
                domain={yDomain}
                tick={{ fontSize: 8 }}
              />
              <Tooltip
                contentStyle={{ fontSize: '8px' }}
                labelStyle={{ fontSize: '8px' }}
                itemStyle={{ fontSize: '8px' }}
                formatter={(value) => [`${value.toFixed(decimalPlaces)}${tooltipSuffix}`, 'Value']}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#151515"
                activeDot={{ r: 5 }}
                dot={(props) => {
                  const { cx, cy, value, index } = props;
                  const isGood = higherIsBetter
                    ? value >= targetValue
                    : value <= targetValue;

                  return (
                    <circle
                      key={`dot-${index}`}
                      cx={cx}
                      cy={cy}
                      r={3}
                      fill={isGood ? 'green' : 'red'}
                    />
                  );
                }}
              >
                <LabelList
                  dataKey="value"
                  position="top"
                  content={(props) => {
                    const { x, y, value, index } = props;
                    return (
                      <text
                        key={`label-${index}`}
                        x={x}
                        y={y - 4}
                        fontSize={8}
                        textAnchor="middle"
                        fill="#000"
                      >
                        {value.toFixed(decimalPlaces)}
                      </text>
                    );
                  }}
                />
              </Line>
              <ReferenceLine
                y={targetValue}
                stroke="black"
                strokeDasharray="3 3"
                label={({ viewBox }) => {
                  const { x, width, y } = viewBox;
                  return (
                    <text
                      x={x + width}
                      y={y - 5}
                      fontSize={8}
                      textAnchor="end"
                      fill="red"
                    >
                      {targetValue.toFixed(decimalPlaces)}
                    </text>
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default CustomLineChart;
