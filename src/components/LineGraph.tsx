import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "../App.css";

interface LineGraphProps {
  unit: string 
  usage: { [key: string]: number }
  monit: string
}

function LineGraph({unit, usage, monit}: LineGraphProps) {



const entries = Object.entries(usage);

 const highchart_data = {
  chart: {
    type: "spline",
    scrollablePlotArea: {
      minWidth: 210,
      scrollPositionX: 1,
    },
  },
  yAxis: {
    title: null,
    visible: false,
  },
  xAxis: {
    visible: false,
  },

  title: {
    text: null,
  },
  tooltip: {
    valueSuffix: ` ${unit}`,
  },
  plotOptions: {
    series: {
      color: "rgb(103, 61, 230)",
    },
    spline: {
      lineWidth: 2,
      states: {
        hover: {
          lineWidth: 3,
        },
      },
      marker: {
        enabled: false,
      },
      pointInterval: 3600000, // one hour
      pointStart: Date.UTC(2018, 1, 13, 0, 0, 0),
    },
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      name: `${monit} usage ${unit}`,
      showInLegend: false,
      data: entries,
    },
  ],
  navigation: {
    menuItemStyle: {
      fontSize: "10px",
    },
  },
};



  return (
    <div>
      <div style={{ padding: "0px", height: "45.2px" }}>
        <span className="eachCardHeading">{monit}{"\n"}</span>
        <span style={{ fontSize: "16px", fontWeight: "600" }}> usage </span>
        <span style={{ fontSize: "12px", fontWeight: "600" }}>{unit}</span>
      </div>
      <div> 
        <HighchartsReact
          containerProps={{ className: "dimensions" }}
          highcharts={Highcharts}
          options={highchart_data}
        />
      </div>
    </div>
  )
}

export default LineGraph