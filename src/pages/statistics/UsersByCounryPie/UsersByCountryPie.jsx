import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useUsersContext } from '../../../context/usersContext.jsx';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const UsersByCountryPieChartComponent = () => {
  const { users } = useUsersContext();
  const countries = users.map((user) => user.country);
  const uniqueCountries = [...new Set(countries)];
  const data = uniqueCountries.map((country) => {
    return {
      name: country,
      value: countries.filter((c) => c === country).length,
    };
  });

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry) => entry.name}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsersByCountryPieChartComponent;
