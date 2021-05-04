import moneyAbbreviation from './moneyAbbreviation';

function backgroundColors(){
    return [
        // COLOR FROM LOGO
        "#F7942E",
        "#21BBAF",
        "#5C449A",
        "#414143",
        // COLOR FROM ANYWHERE
        "#2be7d5",
        "#976945",
        "#214ed5",
        "#d249ae",
        "#cc8963",
        "#ad59b5",
        "#bd759a",
        "#d4f2d8",
      ];
}

function getOptions(formatMoney = false,legend=false) {
  let options = {};
  let x = {
    legend: {
      display: legend
    },
    responsive: true,
    maintainAspectRatio: true,
  };
  if (formatMoney) {
    x.tooltips = {
      callbacks: {
        label: function (tooltipItem, data) {
          let d =
            data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          return moneyAbbreviation(d);
        },
      },
    };

    x.scales = {
      yAxes: [
        {
          ticks: {
            maxRotation: 0,
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return moneyAbbreviation(value);
            },
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            maxRotation: 0,
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return moneyAbbreviation(value);
            },
          },
        },
      ],
    };
  } else {
    x.scales = {
      yAxes: [
        {
          ticks: {
            maxRotation: 0,
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return value;
            },
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            maxRotation: 0,
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return value;
            },
          },
        },
      ],
    };
  }
  return { ...Object.assign(options, x) };
}

export {
    backgroundColors,
    getOptions
} 