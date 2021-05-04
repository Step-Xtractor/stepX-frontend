import React, { useEffect, useState } from "react";

import SideBar from "../../components/SideBar";

import { useAuth } from "../../hooks/auth";
import { Container } from "../Landing/styles";

import stepImg from "../../assets/Step-bro.svg";
import Topnav from "../../components/Topnav";

import { useHistory } from "react-router-dom";

import { Bar, Doughnut, HorizontalBar, Line } from "react-chartjs-2";

import {
  FaArrowRight,
  FaCaretDown,
  FaCaretRight,
  FaCaretUp,
  FaHourglassEnd,
  FaPercentage,
} from "react-icons/fa";

import moneyAbbreviation from "../../utils/moneyAbbreviation";
import showTableImg from "../../assets/Show_table.png";
import clearFilterImg from "../../assets/clear_filter.png";
import api from "../../services/api";
import convertToChartJs from "../../utils/convertToChartJs";
import ButtonGraphGroup from "../../components/ButtonGraphGroup";

import { backgroundColors, getOptions } from '../../utils/chartUtils';

import humanize from '../../utils/humanize';


function Amendments() {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    currency: "USD",
    currencyDisplay: "code",

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
  });

  const { user } = useAuth();
  const { name, gender } = user;

  const history = useHistory();

  const [agency, setAgency] = useState("");
  const [country, setCountry] = useState("");
  const [actualData, setActualData] = useState({});

  const [graphShowType, setGraphShowType] = useState({});


  const [showFilters, setShowFilters] = useState(true);

  const [reviewTypeGraph, setReviewTypeGraph] = useState([]);
  const [marketApproach, setMarketApproach] = useState([]);
  const [amendmentTypeGraph, setAmendmentTypeGraph] = useState([]);
  const [procurementCategory, setProcurementCategory] = useState([]);
  const [amendmentContract, setAendmentContract] = useState([]);
  const [amendmentContractByCategory, setAmendmentContractByCategory] = useState([]);
  
  const [filterOptions, setFilterOptions] = useState([]);

  const { token } = useAuth();

  const [dashboard, setDashboard] = useState({});
  const [expand, setExpand] = useState('');


  useEffect(() => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    api.get("/amendments/filterOptions").then((response) => {
      setFilterOptions(response.data);
    });

    // api.get('/activities').then(response => {

    // })

    loadGraph();
  }, [token]);

  function loadGraph() {
    let query = [];
    Object.keys(actualData).forEach((e) => {
      query.push(e + "=" + actualData[e]);
    });
    query = "?" + query.join("&");
    if(query == '?'){
      query = '';
    }
    api
      .get("/amendments/graph/procurementCategory" + query)
      .then((response) => {
        setProcurementCategory(convertToChartJs(response.data));
      });

    api.get("/amendments/graph/amendmentTypeGraph" + query).then((response) => {
      setAmendmentTypeGraph(convertToChartJs(response.data));
    });

    api.get("/amendments/graph/marketApproach" + query).then((response) => {
      setMarketApproach(convertToChartJs(response.data));
    });

    api.get("/amendments/graph/reviewType" + query).then((response) => {
      setReviewTypeGraph(convertToChartJs(response.data));
    });

    api.get("/amendments/graph/amendedContractsByAmendmentType" + query).then((response) => {
      setAendmentContract(convertToChartJs(response.data));
    });

    api.get('/amendments/graph/amendedContractsByCategory'+query).then((response)=>{
      setAmendmentContractByCategory(convertToChartJs(response.data));
    });

    api.get("/amendments/dashboard"+query).then((response) => {
      setDashboard(response.data);
    });
  }

  useEffect(
    function () {
      loadGraph();
    },
    [actualData]
  );

  return (
    <>
      <SideBar />
      <Container>
        <Topnav
          title="Amendments"
          children={Object.entries(dashboard).map(([title, value]) => ({ title: humanize(title), value })).map((e, i) => (
            <div key={i} className="col-3">
              <div className="h-100 py-1">
                <div className="h-100">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="row ">
                        <div className="col  d-flex justify-content-between">
                          <small>{e.title}</small>
                          {/* </div>
                      <div className="col-6 text-end"> */}
                          <h6>{moneyAbbreviation(e.value)}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        />

        <div className="container-fluid">
          <div className="row mx-2">
            <div className="col-12 text-start">
              {showFilters && (
                <FaCaretDown
                  size={30}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setShowFilters(false);
                  }}
                />
              )}
              {!showFilters && (
                <FaCaretUp
                  size={30}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setShowFilters(true);
                  }}
                />
              )}
            </div>

            <div className="col-11">
              <div className="row">
                {showFilters &&
                  (actualData == null || actualData != null) &&
                  filterOptions && Object.entries(filterOptions)
                    .map(([key, val]) => {
                      return {
                        get: function () {
                          let c = actualData || {};
                          let r = c[key];
                          return r || "";
                        },
                        set: function (c) {
                          let d = actualData || {};
                          d[key] = c.target.value;
                          if (!d[key]) {
                            delete d[key];
                          }
                          setActualData({ ...d });
                        },
                        options: val.map((e) => {
                          return {
                            value: e?.projectId ?? e?.agencyId ?? e?.name ?? e,
                            label: e?.projectId ?? e?.name ?? e,
                          };
                        }),
                        title: humanize(key),
                        selectPl: humanize(key),
                      };
                    })
                    .map((e, i) => (
                      <div key={i} className="col-2 my-1">
                        <div className=" h-100">
                          <div className=" h-100">
                            <div className="">
                              <div className="row">
                                <div
                                  className="d-flex flex-column justify-content-end"
                                  style={{ height: "60px" }}
                                >
                                  <label style={{ fontSize: '15px' }}>
                                    <b>{e.selectPl}</b>
                                  </label>
                                </div>
                                <div className="w-100">
                                  <select
                                    onChange={e.set}
                                    value={e.get()}
                                    className="form-select p-1"
                                  >
                                    <option value="">Select</option>
                                    {e.options.map((c, i) => {
                                      return (
                                        <option key={i} value={c.value}>
                                          {c.label}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                {/* </div> */}
              </div>
            </div>
            {showFilters &&
              <div className="col-sm-1 d-flex align-self-center my-auto">
                <div className="row ">
                  <div className="col my-3">
                    <button
                      className="btn btn-outline-info"
                      title="Clear filters"
                      onClick={() => {
                        setActualData({});
                      }}
                    >
                      <img src={clearFilterImg} style={{ width: "20px" }}></img>
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-outline-info"
                      title="Show table"
                      onClick={() => {
                        let str = "/amendments/showTable/prod?";
                        let query = [];
                        Object.keys(actualData).forEach((e) => {
                          query.push(e + "=" + actualData[e]);
                        });
                        history.push(str + query.join("&"));
                      }}
                    >
                      <img src={showTableImg} style={{ width: "20px" }}></img>
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>

          <div className="row text-center ">
            <div className={(expand == 'procurementCategory' ? 'col-10' : 'col-5') + " mx-auto text-center my-4 animatedContainer"}>
              <div className="alert alert-secondary">
                <div className="row">
                  <div className="col my-auto">
                    <h5 className="my-auto">Procurement Category </h5>
                  </div>
                  <div className="col-4 text-end">
                    <div className="btn-group">
                      <ButtonGraphGroup
                        inState={graphShowType.procurementCategory+String("")}
                        button1OnClick={() => {
                          let x = Object.assign(graphShowType, {
                            procurementCategory: "#",
                          });
                          setGraphShowType({ ...x });
                        }}
                        button2OnClick={() => {
                          let x = Object.assign(graphShowType, {
                            procurementCategory: "$",
                          });
                          setGraphShowType({ ...x });
                        }}
                        button5OnClick={() => {
                          let x = Object.assign(graphShowType, {
                            procurementCategory: "%",
                          });
                          setGraphShowType({ ...x });
                        }}
                        expandButtonOnClick={() => {
                          setExpand(expand == 'procurementCategory' ? '' : 'procurementCategory')
                        }}
                        button3Hide={false}
                        button5Hide={false}

                        button3Title={graphShowType.procurementCategory == '%' ? 'Please note that the percentage in this graph is related to the total of amendments, and not to the percentage of amended contracts.' : 'Please note that in this graph only the count of absolute values is made.'}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{
                position: 'relative',
                width: '100%'
              }}>

                <Bar
                  data={{
                    labels: (graphShowType.procurementCategory == '%' ? procurementCategory.slice(1) : procurementCategory).map((e) => e.label.split(" ")),
                    datasets: [
                      {
                        label: "",
                        data: graphShowType.procurementCategory != '%' ? (procurementCategory.map((e) =>
                          graphShowType.procurementCategory == "$"
                            ? e.monetaryValue
                            : e.value)) : (
                              procurementCategory.slice(1).map((e) => e.percentage)
                            ),
                        backgroundColor: backgroundColors(),
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={Object.assign(getOptions(graphShowType.procurementCategory == "$"), graphShowType.procurementCategory == '%' ? {
                      tooltips: {
                        callbacks: {
                          label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + "%";
                          },
                        },
                      },
                      scales: {
                        xAxes: [
                          {
                            ticks: {
                              maxRotation: 0,
                              // Include a dollar sign in the ticks
                              // callback: function (value, index, values) {
                              //   return value+"%";
                              // },
                            },
                          },
                        ],
                        yAxes: [
                          {
                            ticks: {
                              maxRotation: 0,
                              // Include a dollar sign in the ticks
                              callback: function (value, index, values) {
                                return value ;
                              },
                            },
                          },
                        ],
                      }
                    } :  graphShowType.procurementCategory == '#' ? {
                      tooltips: {
                        callbacks: {
                          label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                          },
                        },
                      },
                      scales: {
                        xAxes: [
                          {
                            ticks: {
                              maxRotation: 0,
                              // Include a dollar sign in the ticks
                              // callback: function (value, index, values) {
                              //   return value+"%";
                              // },
                            },
                          },
                        ],
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
                      }
                    }: {})}
                />

              </div>
            </div>

            <div className={(expand == 'amendmentContractByCategory' ? 'col-10' : 'col-5') + " mx-auto text-center my-4 animatedContainer"}>
              <div className="alert alert-secondary">
                <div className="row">
                  <div className="col my-auto">
                    <h5 className="my-auto">Amended Contracts</h5>
                  </div>
                  <div className='col-4 text-end'>
                    <div className='btn-group'>

                      <ButtonGraphGroup
                        button2Title="Percentage"
                        button2Content={<FaPercentage />}
                        expandButtonOnClick={() => {
                          setExpand(expand == 'amendmentContractByCategory' ? '' : 'amendmentContractByCategory')
                        }}
                        button1Hide={false}
                        button2Hide={false}
                        button3Hide={false}
                        button3Title={'The information in this graph is related to the number of contracts with amendments in each procurement category.'}
                        inState={graphShowType.amendmentContractByCategory == "$"}
                        button1OnClick={() => {
                          let x = Object.assign(graphShowType, {
                            amendmentContractByCategory: "#",
                          });
                          setGraphShowType({ ...x });
                        }}
                        button2OnClick={() => {
                          let x = Object.assign(graphShowType, {
                            amendmentContractByCategory: "$",
                          });
                          setGraphShowType({ ...x });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{
                position: 'relative',
                width: '100%'
              }}>

                <HorizontalBar
                  data={{
                    labels: amendmentContractByCategory.slice(1).map((e) => humanize(e.label)),
                    datasets: [
                      {
                        label: "",
                        data: (amendmentContractByCategory.slice(1).map((e) =>  graphShowType.amendmentContractByCategory == "$" ? e.percentage : e.value)),
                        backgroundColor: backgroundColors(),
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={Object.assign(getOptions(false), graphShowType.amendmentContractByCategory == "$"? {
                      tooltips: {
                        callbacks: {
                          label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + "%";
                          },
                        },
                      },
                      scales: {
                        xAxes: [
                          {
                            ticks: {
                              maxRotation: 0,
                              callback: function (value, index, values) {
                                return value + "%";
                              },
                            },
                          },
                        ],
                      }
                    }:{tooltips: {
                      callbacks: {
                        label: function (tooltipItem, data) {
                          return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + " | Total: "+amendmentContractByCategory[tooltipItem.index+1].total;
                        },
                      },
                    },
                    scales: {
                      xAxes: [
                        {
                          ticks: {
                            maxRotation: 0,
                            callback: function (value, index, values) {
                              return value + "";
                            },
                          },
                        },
                      ],
                    }})}
                />
              </div>
            </div>

            <div className={(expand == 'amendmentTypeGraph' ? 'col-10' : 'col-5') + " mx-auto text-center my-4 animatedContainer"}>
              <div className="alert alert-secondary">
                <div className="row">
                  <div className="col my-auto">
                    <h5 className="my-auto">Amendment Type</h5>
                  </div>
                  <div className='col-4 text-end'>
                  <div className='btn-group'>
                    <ButtonGraphGroup
                      button2Title="Percentage"
                      button2Content={<FaPercentage />}
                      inState={graphShowType.amendmentType == "$"}
                      expandButtonOnClick={() => {
                        setExpand(expand == 'amendmentTypeGraph' ? '' : 'amendmentTypeGraph')
                      }}
                      button1OnClick={() => {
                        let x = Object.assign(graphShowType, {
                          amendmentType: "#",
                        });
                        setGraphShowType({ ...x });
                      }}
                      button2OnClick={() => {
                        let x = Object.assign(graphShowType, {
                          amendmentType: "$",
                        });
                        setGraphShowType({ ...x });
                      }}
                      button3Hide={false}
                      button3Title={graphShowType.amendmentType == "$"?'Please note that the percentage in this graph is related to the total of amendments, and not to the percentage of amended contracts.':'Please note that in this graph only the count of absolute values is made.'}
                    />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{
                position: 'relative',
                width: '100%'
              }}>

                <HorizontalBar
                  data={{
                    labels: amendmentTypeGraph.slice(1).map((e) => humanize(e.label)),
                    datasets: [
                      {
                        label: "",
                        data: (amendmentTypeGraph.slice(1).map((e) =>  graphShowType.amendmentType == "$" ? e.percentage : e.value)),
                        backgroundColor: backgroundColors(),
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={Object.assign(getOptions(false), graphShowType.amendmentType == "$"? {
                      tooltips: {
                        callbacks: {
                          label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + "%";
                          },
                        },
                      },
                      scales: {
                        xAxes: [
                          {
                            ticks: {
                              maxRotation: 0,
                              callback: function (value, index, values) {
                                return value + "%";
                              },
                            },
                          },
                        ],
                      }
                    }:{
                      tooltips: {
                        callbacks: {
                          label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + "";
                          },
                        },
                      },
                      scales: {
                        xAxes: [
                          {
                            ticks: {
                              maxRotation: 0,
                              callback: function (value, index, values) {
                                return value + "";
                              },
                            },
                          },
                        ],
                      }
                    })}
                />
              </div>
            </div>


            <div className={(expand == 'amendmentContract' ? 'col-10' : 'col-5') + " mx-auto text-center my-4 animatedContainer"}>
              <div className="alert alert-secondary">
                <div className="row">
                  <div className="col my-auto">
                    <h5 className="my-auto">Amended Contracts</h5>
                  </div>
                  <div className='col-4 text-end'>
                    <div className='btn-group'>

                      <ButtonGraphGroup
                        button2Title="Percentage"
                        button2Content={<FaPercentage />}
                        expandButtonOnClick={() => {
                          setExpand(expand == 'amendmentContract' ? '' : 'amendmentContract')
                        }}
                        button1Hide={false}
                        button2Hide={false}
                        button3Hide={false}
                        button3Title={'In this graph, the number of amendments is divided by the number of amended contracts.'}
                        inState={graphShowType.amendmentContract == "$"}
                        button1OnClick={() => {
                          let x = Object.assign(graphShowType, {
                            amendmentContract: "#",
                          });
                          setGraphShowType({ ...x });
                        }}
                        button2OnClick={() => {
                          let x = Object.assign(graphShowType, {
                            amendmentContract: "$",
                          });
                          setGraphShowType({ ...x });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{
                position: 'relative',
                width: '100%'
              }}>

                <HorizontalBar
                  data={{
                    labels: amendmentContract.slice(1).map((e) => humanize(e.label)),
                    datasets: [
                      {
                        label: "",
                        data: (amendmentContract.slice(1).map((e) =>  graphShowType.amendmentContract == "$" ? e.percentage : e.value)),
                        backgroundColor: backgroundColors(),
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={Object.assign(getOptions(false), graphShowType.amendmentContract == "$"? {
                      tooltips: {
                        callbacks: {
                          label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + "%";
                          },
                        },
                      },
                      scales: {
                        xAxes: [
                          {
                            ticks: {
                              maxRotation: 0,
                              callback: function (value, index, values) {
                                return value + "%";
                              },
                            },
                          },
                        ],
                      }
                    }:{tooltips: {
                      callbacks: {
                        label: function (tooltipItem, data) {
                          return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + "";
                        },
                      },
                    },
                    scales: {
                      xAxes: [
                        {
                          ticks: {
                            maxRotation: 0,
                            callback: function (value, index, values) {
                              return value + "";
                            },
                          },
                        },
                      ],
                    }})}
                />
              </div>
            </div>


            <div className={(expand == 'reviewType' ? 'col-10' : 'col-5') + " mx-auto text-center my-4 animatedContainer"}>
              <div className="alert alert-secondary">
                <div className="row">
                  <div className="col my-auto">
                    <h5 className="my-auto">Review Type</h5>
                  </div>
                  <div className="col-4 text-end">
                    <div className="btn-group">
                      <ButtonGraphGroup
                        inState={graphShowType.reviewType == "$"}
                        button1OnClick={() => {
                          let x = Object.assign(graphShowType, {
                            reviewType: "#",
                          });
                          setGraphShowType({ ...x });
                        }}
                        button2OnClick={() => {
                          let x = Object.assign(graphShowType, {
                            reviewType: "$",
                          });
                          setGraphShowType({ ...x });
                        }}
                        expandButtonOnClick={() => {
                          setExpand(expand == 'reviewType' ? '' : 'reviewType')
                        }}
                        button3Hide={false}
                        button3Title={'Please note that in this graph only the count of absolute values is made.'}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{
                position: 'relative',
                width: '100%'
              }}>


                <Doughnut
                  data={{
                    labels: reviewTypeGraph.slice(2).map((e) => e.label),
                    datasets: [
                      {
                        label: "",
                        data: (reviewTypeGraph.slice(2).map((e) =>
                          graphShowType.reviewType == "$"
                            ? e.monetaryValue
                            : e.value)),
                        backgroundColor: backgroundColors(),
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={{
                    ...Object.assign(getOptions(graphShowType.reviewType == "$", true), {
                      scales: {
                        xAxes: [
                          {
                            ticks: {
                              display: false,
                            },
                            gridLines: {
                              display: false,
                            },
                          },
                        ],
                        yAxes: [
                          {
                            ticks: {
                              display: false,
                            },
                            gridLines: {
                              display: false,
                            },
                          },
                        ],
                      },
                    }),
                  }}
                />
              </div>
            </div>
            <div className={(expand == 'reviewType%' ? 'col-10' : 'col-5') + " mx-auto text-center my-4 animatedContainer"}>
              <div className="alert alert-secondary">
                <div className="row">
                  <div className="col my-auto">
                    <h5 className="my-auto">Review Type in %</h5>
                  </div>
                  <div className='col-4 text-end'>
                  <div className='btn-group'>
                    <ButtonGraphGroup
                      inState={graphShowType.reviewType == "$"}
                      button1Hide={true}
                      button2Hide={true}
                      expandButtonOnClick={() => {
                        setExpand(expand == 'reviewType%' ? '' : 'reviewType%')
                      }}
                      button3Hide={false}
                        button3Title={'Please note that the percentage in this graph is related to the total of amendments, and not to the percentage of amended contracts.'}
                    />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{
                position: 'relative',
                width: '100%'
              }}>

                <Doughnut
                  data={{
                    labels: reviewTypeGraph.slice(2).map((e) => e.label),
                    datasets: [
                      {
                        label: "",
                        data: (reviewTypeGraph.slice(2).map((e) => e.percentage)),
                        backgroundColor: backgroundColors(),
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={{
                    ...Object.assign(getOptions(true, true), {
                      tooltips: {
                        callbacks: {
                          label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + "%";
                          },
                        },
                      },
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              display: false,
                            },
                            gridLines: {
                              display: false,
                            },
                          },
                        ],
                        xAxes: [
                          {
                            gridLines: {
                              display: false,
                            },
                            ticks: {
                              display: false,

                              maxRotation: 0,
                              // Include a dollar sign in the ticks
                              callback: function (value, index, values) {
                                return value + "%";
                              },
                            },
                          },
                        ],
                      }
                    }),
                  }}
                />
              </div>
            </div>


          </div>
        </div>
      </Container>
    </>
  );
}

export default Amendments;
