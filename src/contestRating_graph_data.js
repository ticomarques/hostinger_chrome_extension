const obj = {
			"1748394938": 0.85,
			"1748396732": 1.86,
			"1748398510": 0.85,
			"1748400303": 0.87,
			"1748402136": 0.84,
			"1748403904": 1.26,
			"1748405715": 0.85,
			"1748407513": 0.85,
			"1748409311": 0.87,
			"1748411131": 1.14,
			"1748412928": 0.85,
			"1748414711": 1.31,
			"1748416506": 0.89,
			"1748418331": 1.2,
			"1748420123": 0.88,
			"1748421902": 0.83,
			"1748423710": 0.85,
			"1748425525": 1.15,
			"1748427310": 0.84,
			"1748429104": 0.84,
			"1748430933": 0.84,
			"1748432715": 0.81,
			"1748434521": 2.48,
			"1748436307": 0.83,
			"1748438135": 0.83,
			"1748439906": 0.83,
			"1748441710": 1.03,
			"1748443533": 0.85,
			"1748445304": 0.83,
			"1748447112": 0.85,
			"1748448914": 1.19,
			"1748450704": 0.84,
			"1748452515": 0.82,
			"1748454307": 0.82,
			"1748456123": 1.07,
			"1748457907": 0.84,
			"1748459707": 0.83,
			"1748461531": 0.83,
			"1748463314": 1.18,
			"1748465107": 0.84,
			"1748466927": 0.84,
			"1748468715": 0.81,
			"1748470528": 1.04,
			"1748472304": 0.83,
			"1748474109": 0.84,
			"1748475916": 0.82
		}

const entries = Object.entries(obj);
console.log(entries);

export const highchart_data = {
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
    valueSuffix: " %",
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
      name: "CPU usage %",
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


export const optionsPie = {
    chart: {
      type: 'pie',
      colorKey: 'color',
    },
    title: {
      text: '',
    },
    tooltip: {
      enabled: true // Disable tooltips
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
        name: 'Share',
        data: [
          { name: 'available', y: 80, color: '#cfc0fa' },
          { name: 'used', y: 20 , color: '#673de6' },
        ],
      },
    ],
  };
