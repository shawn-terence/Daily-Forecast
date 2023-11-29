import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer,Cell } from 'recharts';

const RadialChart = ({ data}) => {
    const componentColors = {
      co: '#8884d8',
      no: '#83a6ed',
      no2: '#8dd1e1',
      o3: '#82ca9d',
      so2: '#a4de6c',
      pm2_5: '#d0ed57',
      pm10: '#ffc658',
      nh3: '#ff7300',
    };
  
    return (
      <ResponsiveContainer width={400} height={400}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: '#000000' }}
            background
            clockWise
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={componentColors[entry.name.toLowerCase()]} />
            ))}
          </RadialBar>
          <Legend iconSize={10} layout="horizontal" verticalAlign="right" />
        </RadialBarChart>
      </ResponsiveContainer>
    );
  };
  
  export default RadialChart;
