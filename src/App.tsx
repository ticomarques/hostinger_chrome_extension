import { useState, ChangeEvent } from 'react';
import './App.css';

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


import { highchart_data, optionsPie } from "./contestRating_graph_data";

import "./contestRating_graph.css";

import type {Plan} from './typings';

function App() {
  const [key, setKey] = useState('');
  const [data, setData] = useState();
  const [servers, setServers] = useState();

  //Fetch the plan data
  const handleFetchPlan = async () => {
    if (!key) {
      alert('Please enter a key');
      return;
    }
    try {
      const url = 'https://developers.hostinger.com/api/vps/v1/virtual-machines';
      const params = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const info: Plan[] = await response.json();
      console.log(info[0]);
      setData(info[0]);

      //fetch monitoring data
      //const monitoringUrl = 'https://developers.hostinger.com/api/vps/v1/virtual-machines/monitoring';
      HandleFetchMonitoring(info[0].id);

    } catch (error) {
      console.error(error);
    }
  };

  //Fetch the monitoring data
  const HandleFetchMonitoring = async (idPlan: number) => {
    const date_from = '2025-05-28T20%3A00%3A00Z';
    const date_to = '2025-05-29T00%3A00%3A00Z';
    try {
      //const url = `https://developers.hostinger.com/api/vps/v1/virtual-machines/${idPlan}/metrics?date_from=${date_from}&$date_to=${date_to}`;
      const url = `https://developers.hostinger.com/api/vps/v1/virtual-machines/810946/metrics?date_from=2025-05-28T20%3A00%3A00Z&date_to=2025-05-29T00%3A00%3A00Z`
      const params = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const info = await response.json();
      console.log(info);
      setServers(info)

    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmitKey = (e: ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };

  return (
    <>
      <h1>Hostinger</h1>
      
      <input
        type="text"
        id="apikey"
        name="apikey"
        placeholder="Insira sua API KEY"
        onChange={handleSubmitKey}
      />
      <button onClick={handleFetchPlan}>OK</button>

      {data && (
        <div>
          <div className="wrapperPlan">
            <div className="logoCurrentOS">
              <img src="https://hpanel.hostinger.com/assets/images/vpsOnboarding/ubuntu.svg" alt="Ubuntu 24.04 LTS" className="current-os__image" />
            </div>
            <div className="plan">
              <p className="templateOS">{data.template.name}</p>
              <span className="planTitle">{data.plan}</span>
              <span className="cardGreen status">{data.state}</span>
            </div>
          </div>

          <h2>Servers</h2>


          <div className="threeCardsFlexWrapper">
              <div className="box">
                <div style={{ padding: "0px", height: "45.2px" }}>
                  <span className="eachCardHeading">CPU{"\n"}</span>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}> usage </span>
                  <span style={{ fontSize: "12px", fontWeight: "600" }}>%</span>
                </div>
                <div> 
                  <HighchartsReact
                    containerProps={{ className: "dimensions" }}
                    highcharts={Highcharts}
                    options={highchart_data}
                  />
                </div>
              </div>

              <div className="box">
                <div style={{ padding: "0px", height: "45.2px" }}>
                  <span className="eachCardHeading">CPU{"\n"}</span>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}> usage </span>
                  <span style={{ fontSize: "12px", fontWeight: "600" }}>%</span>
                </div>
                <div> 
                  <HighchartsReact
                    containerProps={{ className: "dimensions" }}
                    highcharts={Highcharts}
                    options={highchart_data}
                  />
                </div>
              </div>

              <div className="box">
                <div style={{ padding: "0px", height: "45.2px" }}>
                  <span className="eachCardHeading">Disk{"\n"}</span>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}> usage </span>
                  <span style={{ fontSize: "12px", fontWeight: "600" }}>%</span>
                </div>
                <div> 
                  <HighchartsReact
                    containerProps={{ className: "dimensions" }}
                    highcharts={Highcharts}
                    options={optionsPie}
                  />
                </div>
              </div>
          </div>



          <div className="threeCardsFlexWrapper">
              <div className="box">
                <div style={{ padding: "0px", height: "45.2px" }}>
                  <span className="eachCardHeading">CPU{"\n"}</span>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}> usage </span>
                  <span style={{ fontSize: "12px", fontWeight: "600" }}>%</span>
                </div>
                <div> 
                  <HighchartsReact
                    containerProps={{ className: "dimensions" }}
                    highcharts={Highcharts}
                    options={highchart_data}
                  />
                </div>
              </div>

              <div className="box">
                <div style={{ padding: "0px", height: "45.2px" }}>
                  <span className="eachCardHeading">CPU{"\n"}</span>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}> usage </span>
                  <span style={{ fontSize: "12px", fontWeight: "600" }}>%</span>
                </div>
                <div> 
                  <HighchartsReact
                    containerProps={{ className: "dimensions" }}
                    highcharts={Highcharts}
                    options={highchart_data}
                  />
                </div>
              </div>

              <div className="box">
                <div style={{ padding: "0px", height: "45.2px" }}>
                  <span className="eachCardHeading">Disk{"\n"}</span>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}> usage </span>
                  <span style={{ fontSize: "12px", fontWeight: "600" }}>%</span>
                </div>
                <div> 
                  <HighchartsReact
                    containerProps={{ className: "dimensions" }}
                    highcharts={Highcharts}
                    options={optionsPie}
                  />
                </div>
              </div>
          </div>



        </div>
      )}

    </>
  );
}

export default App;
