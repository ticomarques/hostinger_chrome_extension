import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "../App.css";

interface PieGraphProps {
  totalDisk: number
  usage: { [key: string]: number }
}

function PieGraph({totalDisk, usage}: PieGraphProps) {

  const diskUsage:number = usage[Object.keys(usage)[Object.keys(usage).length -1]]

  const totalUsed:number = ((diskUsage * 100) / (totalDisk * 1000000))
  console.log("total usado em gb: ", totalUsed)

  const totalDiskGb:number = totalDisk / 1024
  console.log("total disco em gb: ",totalDiskGb)

  const totalAvailable = totalDiskGb - totalUsed
  console.log(totalAvailable)



  const optionsPie = {
      chart: {
        type: 'pie',
        colorKey: 'color',
      },
      title: {
        text: '',
      },
      tooltip: {
        enabled: true, // Disable tooltips
        valueSuffix: ` %`,
      },
      plotOptions: {
        pie: {
          dataLabels: {
              enabled: false,
          },
          size: '65px'
        },
      },
      series: [
        {
          name: 'Percentage',
          data: [
            { name: 'available', y: Math.round(totalAvailable), color: '#cfc0fa' },
            { name: 'used', y: Math.round(totalUsed), color: '#673de6' },
          ],
          innerSize: '90%',
        },
      ],
    };

  return (
    <div>
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
  )
}

export default PieGraph