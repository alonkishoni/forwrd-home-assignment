import { useUsersContext } from '../../../context/usersContext.jsx';
import { useMemo } from 'react';
import ResponsivePieChart from '../../../components/PieChart/PieChart.jsx';
import { Grid } from '@mui/material';

const getFirstStringAfterSpace = (str) => {
  return str?.split(' ')?.[1]?.toLowerCase();
};
const Charts = () => {
  const { users } = useUsersContext();

  const familyNameData = useMemo(() => {
    const familyNames = users.map((user) => getFirstStringAfterSpace(user.name));
    const uniqueArr = [...new Set(familyNames)];
    return uniqueArr.map((item) => ({
      name: item,
      value: familyNames.filter((c) => c === item).length,
    }));
  }, [users]);

  const countryData = useMemo(() => {
    const countries = users.map((user) => user.country);
    const uniqueArr = [...new Set(countries)];
    return uniqueArr.map((item) => ({
      name: item,
      value: countries.filter((c) => c === item).length,
    }));
  }, [users]);

  return (
    <>
      <Grid>
        <Grid item>
          <ResponsivePieChart data={countryData} />
        </Grid>
        <Grid item>
          <ResponsivePieChart data={familyNameData} />
        </Grid>
      </Grid>
    </>
  );
};
export default Charts;
