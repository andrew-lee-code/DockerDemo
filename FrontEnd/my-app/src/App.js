import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography} from '@material-ui/core';
import { VictoryChart, VictoryAxis, VictoryTheme, VictoryLine, VictoryTooltip, VictoryScatter} from 'victory'
import moment from 'moment';

function App() {
  //CONSTANTS
  const BASE_URL = "/data"
    
  //HOOKS
  const [data, setData] = useState();

  //Call getData on initial rendering only
  useEffect( () => {
      getData()
  }, []
  )

  //FUNCTIONS
  function getData()
  {
      axios.get(BASE_URL)
      .then((response) => {
        let response_data = response.data;

        //convert date strings to date objects
        for (let i in response_data){
          response_data[i]["Month"] = moment(response_data[i]["Month"], 'YYYY-MM')
        }
        setData(response_data)
      });
  }

  return (
    <div>
      <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className="title-text">Welcome to the Docker Demo!</Typography>
            </Toolbar>
      </AppBar>
      <div className="chart-area">
      <div className="chart-title">Interest in Docker Over Time (2013 - 2020)</div>
            <VictoryChart
                // adding the material theme provided with Victory
                theme={VictoryTheme.material}
                domainPadding={10}
                width={"1500"}
                height={"500"}
            >   
                <VictoryAxis 
                    label="Date" 
                    tickFormat={(date) => moment(date).format('MM/YYYY')}
                    tickCount={12}
                    style={{
                        axisLabel: {fontSize: 20, padding: 30},
                    }}
                />
                <VictoryAxis 
                    dependentAxis 
                    label="Interest"
                    domain={[0, 100]}
                    style={{
                        axisLabel: {fontSize: 20, padding: 30},
                    }}
                />
                <VictoryScatter
                    data={data}
                    x="Month"
                    y="Interest"
                    sortKey="Month"
                    labels={({ datum }) => datum.Month.format('YYYY-MM') + "\nInterest:" + datum.Interest}
                    labelComponent={<VictoryTooltip/>}
                    size={3}
                />
                <VictoryLine
                    data={data}
                    x="Month"
                    y="Interest"
                    sortKey="Month"
                    size={3}
                />
            </VictoryChart>
    </div>
    </div>
  );
}
export default App;
