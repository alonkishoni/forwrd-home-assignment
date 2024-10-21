import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useUsersContext } from '../../../context/usersContext.jsx';
import { chartColors } from '../../../consts/consts.js';

const UsersByCountryPieChartComponent = () => {
  const { users } = useUsersContext();

  const data = useMemo(() => {
    const usersToCountries = users.map((user) => user.country);
    const uniqueCountries = [...new Set(usersToCountries)];
    return uniqueCountries.map((country) => ({
      name: country,
      value: usersToCountries.filter((c) => c === country).length,
    }));
  }, [users]);

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
              <Cell
                key={`cell-${index}`}
                fill={chartColors[index % chartColors.length]}
              />
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
