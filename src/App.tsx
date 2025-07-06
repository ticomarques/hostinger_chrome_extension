import { useState } from 'react';
import './App.css';

import type {Plan, PlanUsage} from './typings';

import { useLocalStorage } from './hooks/useLocalStorage';

import AddApiKey from './components/AddApiKey';
import BoxPlan from './components/BoxPlan';
import LineGraph from './components/LineGraph';
import PieGraph from './components/PieGraph';

import { SpinnerCircular } from './components/SpinnerCircular';

function App() {
  const {setItem, getItem} = useLocalStorage('apiKey');
  const localStorageKey = getItem();
  

  const [key, setKey] = useState<string>(localStorageKey || '');
  const [data, setData] = useState<Plan>();
  const [servers, setServers] = useState<PlanUsage>();
  const [loading, setLoading] = useState(false);



  //Fetch the plan data
  const handleFetchPlan = async () => {
    if (!key) {
      alert('Please enter a key');
      return;
    }
    setLoading(true);

    try {
      const url = 'https://developers.hostinger.com/api/vps/v1/virtual-machines';
      const params = {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(url, params);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setLoading(false);
      const info: Plan[] = await response.json();
      setData(info[0]);

      //fetch monitoring data
      HandleFetchMonitoring(info[0].id);

    } catch (error) {
      console.error(error);
    }
  };


  //Fetch the monitoring data
  const HandleFetchMonitoring = async (idPlan: number) => {
    const date_to = new Date();

    const nowMilliseconds = date_to.getTime()
    const ReducedMiliseconds = nowMilliseconds - (22 * 60 * 60 *1000)

    const date_from = new Date(ReducedMiliseconds);    

    try {
      const url = `https://developers.hostinger.com/api/vps/v1/virtual-machines/${idPlan}/metrics?date_from=${date_from.toJSON()}&date_to=${date_to.toJSON()}`;
      const params = {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const info:PlanUsage = await response.json();
      setServers(info)
      setItem(key)
      
    } catch (error) {
      console.error(error);
    }
  }


  //set the key on state
  const handleSubmitKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };

  
  //starts the extensior 
  // const init = async () => {
  //   if (key && localStorageKey){
  //     console.log("key valido, executando handleFetchPlan: ", key)
  //     await handleFetchPlan()
  //   }
  //   console.log("enviado, e retornado. ")
  // }
  // init()

  return (
    <>
      <h1>Hostinger</h1>
      
      {!data ? (
         <AddApiKey handleSubmitKey={handleSubmitKey} handleFetchPlan={handleFetchPlan} />
      ): ''}

     {loading ? <SpinnerCircular color='#673de6' secondaryColor='rgba(85, 57, 172, 0.4)'/> : ''}

      {data && servers &&
        <div>
          
          <BoxPlan template={data.template.name} plan={data.plan} state={data.state} />

          <h2>Servers</h2>

          <div className="rowFlex">
            <div className="box">
              <LineGraph unit={servers?.cpu_usage.unit} usage={servers?.cpu_usage.usage} monit={'CPU'}/>
            </div>
            <div className="box">
              <LineGraph unit={servers?.ram_usage.unit} usage={servers?.ram_usage.usage} monit={'Memory'}/>
            </div>
            <div className="box">
              <PieGraph totalDisk={data.disk} usage={servers?.disk_space.usage}/>
            </div>
          </div>


          <div className="rowFlex">
            <div className="box">
              <LineGraph unit={servers?.incoming_traffic.unit} usage={servers?.incoming_traffic.usage} monit={'Incoming'}/>
            </div>
            <div className="box">
              <LineGraph unit={servers?.outgoing_traffic.unit} usage={servers?.outgoing_traffic.usage} monit={'Outgoing'}/>
            </div>
            <div className="box">
              <PieGraph totalDisk={data.disk} usage={servers?.disk_space.usage}/>
            </div>
          </div>

        </div>
      }

    </>
  );
}

export default App;
