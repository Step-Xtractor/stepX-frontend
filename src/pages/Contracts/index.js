import React, { useState, useEffect } from "react";

import SideBar from "../../components/SideBar";

import { useAuth } from "../../hooks/auth";
import { Container } from "../Landing/styles";

import stepImg from "../../assets/Step-bro.svg";
import Topnav from "../../components/Topnav";

import { useHistory } from "react-router-dom";

import { Bar, HorizontalBar, Pie, Doughnut } from "react-chartjs-2";

import {
  FaArrowRight,
  FaCaretDown,
  FaCaretRight,
  FaCaretUp,
} from "react-icons/fa";

import api from "../../services/api";

import convertToChartJs from "../../utils/convertToChartJs";
import moneyAbbreviation from "../../utils/moneyAbbreviation";
import showTableImg from "../../assets/Show_table.png";
import clearFilterImg from "../../assets/clear_filter.png";
import ButtonGraphGroup from "../../components/ButtonGraphGroup";
import {backgroundColors, getOptions} from '../../utils/chartUtils';
import humanize from '../../utils/humanize';

function Acitivities() {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    currency: "USD",
    currencyDisplay: "code",

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
  });

  const { token } = useAuth();

  const history = useHistory();

  const [agency, setAgency] = useState("");
  const [country, setCountry] = useState("");
  const [actualData, setActualData] = useState({});

  const [reviewTypeGraph, setReviewTypeGraph] = useState([]);
  const [marketApproach, setMarketApproach] = useState([]);
  const [procurementMethod, setProcurementMethod] = useState([]);
  const [procurementCategory, setProcurementCategory] = useState([]);

  const [filterOptions, setFilterOptions] = useState([]);

  const [graphShowType, setGraphShowType] = useState({});

  const [showFilters, setShowFilters] = useState(true);
  const [expand, setExpand] = useState('');

  const [dashboard, setDashboard] = useState({});

  
  useEffect(() => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    api.get("/contracts/filterOptions").then((response) => {
      setFilterOptions(response.data);
    });

    // api.get('/contracts').then(response => {

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
    api.get("/contracts/graph/procurementCategory" + query).then((response) => {
      setProcurementCategory(convertToChartJs(response.data));
    });

    api.get("/contracts/graph/procurementMethod" + query).then((response) => {
      setProcurementMethod(convertToChartJs(response.data));
    });

    api.get("/contracts/graph/marketApproach" + query).then((response) => {
      setMarketApproach(convertToChartJs(response.data));
    });

    api.get("/contracts/graph/reviewType" + query).then((response) => {
      setReviewTypeGraph(convertToChartJs(response.data));
    });

    api.get("/contracts/dashboard"+query).then((response) => {
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
          title="Contracts"
          children={Object.entries(dashboard).map(([title,value])=>({title:humanize(title),value})).map((e, i) => (
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
            <div className='col-11'>
              <div className='row'>


                {showFilters &&
                  filterOptions &&
                  Object.entries(filterOptions)
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
                            <div className="row h-100">
                              <div className="">
                                <div className="row">
                                  <div
                                    className="d-flex flex-column justify-content-end "
                                    style={{ height: "60px" }}
                                  >
                                    <label style={{fontSize:'15px'}}>
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
                      </div>
                    ))}
              </div>
            </div>

            {
              showFilters &&
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
                        let str = "/contracts/showTable/prod?";
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
            <div className={(expand == 'procurementCategory'?'col-10':'col-5')+" mx-auto text-center my-4 animatedContainer"}>
              <div className="alert alert-secondary">
                <div className="row">
                  <div className="col my-auto">
                    <h5 class="my-auto">Procurement Category </h5>
                  </div>
                  <div className="col-3">
                    <div className="btn-group">
                    <ButtonGraphGroup
                        inState={graphShowType.procurementCategory == "$"}
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
                        expandButtonOnClick={()=>{
                          setExpand(expand == 'procurementCategory'?'':'procurementCategory')
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
                <Bar
                  data={{
                    labels: procurementCategory.map((e) => e.label.split(" ")),
                    datasets: [
                      {
                        label: "",
                        data: procurementCategory.map((e) =>
                          graphShowType.procurementCategory == "$"
                            ? e.monetaryValue
                            : e.value
                        ),
                        backgroundColor: backgroundColors(),
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={getOptions(graphShowType.procurementCategory == "$")}
                />
              </div>
            </div>

            <div className={(expand == 'procurementMethod'?'col-10':'col-5')+" mx-auto text-center  my-4 animatedContainer"}>
              <div className="alert alert-secondary">
                <div className="row">
                  <div className="col my-auto">
                    <h5 class="my-auto">Procurement Method </h5>
                  </div>
                  <div className="col-3">
                    <div className="btn-group">
                    <ButtonGraphGroup
                        inState={graphShowType.procurementMethod == "$"}
                        button1OnClick={() => {
                          let x = Object.assign(graphShowType, {
                            procurementMethod: "#",
                          });
                          setGraphShowType({ ...x });
                        }}
                        button2OnClick={() => {
                          let x = Object.assign(graphShowType, {
                            procurementMethod: "$",
                          });
                          setGraphShowType({ ...x });
                        }}
                        expandButtonOnClick={()=>{
                          setExpand(expand == 'procurementMethod'?'':'procurementMethod')
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
                    labels: procurementMethod.map((e) => e.label),
                    datasets: [
                      {
                        label: "",
                        data: procurementMethod.map((e) =>
                          graphShowType.procurementMethod == "$"
                            ? e.monetaryValue
                            : e.value
                        ),
                        backgroundColor: backgroundColors(),
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={getOptions(graphShowType.procurementMethod == "$")}
                />
              </div>
            </div>

            <div className={(expand == 'reviewType'?'col-10':'col-5')+" mx-auto text-center  my-4 animatedContainer"}>
              <div className="alert alert-secondary">
                <div className="row">
                  <div className="col my-auto">
                    <h5 class="my-auto">Review Type</h5>
                  </div>
                  <div className="col-3">
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
                        expandButtonOnClick={()=>{
                          setExpand(expand == 'reviewType'?'':'reviewType')
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

                <Doughnut
                  data={{
                    labels: reviewTypeGraph.slice(1).map((e) => e.label),
                    datasets: [
                      {
                        label: "",
                        data: reviewTypeGraph.slice(1).map((e) =>
                          graphShowType.reviewType == "$"
                            ? e.monetaryValue
                            : e.value
                        ),
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

            <div className={(expand == 'marketApproach'?'col-10':'col-5')+"  mx-auto text-center  my-4 animatedContainer"}>
              <div className="alert alert-secondary">
                <div className="row">
                  <div className="col my-auto">
                    <h5 class="my-auto">Market Approach </h5>
                  </div>
                  <div className="col-3">
                    <div className="btn-group">
                    <ButtonGraphGroup
                        inState={graphShowType.marketApproach == "$"}
                        button1OnClick={() => {
                          let x = Object.assign(graphShowType, {
                            marketApproach: "#",
                          });
                          setGraphShowType({ ...x });
                        }}
                        button2OnClick={() => {
                          let x = Object.assign(graphShowType, {
                            marketApproach: "$",
                          });
                          setGraphShowType({ ...x });
                        }}
                        expandButtonOnClick={()=>{
                          setExpand(expand == 'marketApproach'?'':'marketApproach')
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
                <Bar
                  data={{
                    labels: marketApproach.map((e) => e.label.split(" ")),
                    datasets: [
                      {
                        label: "",
                        data: marketApproach.map((e) =>
                          graphShowType.marketApproach == "$"
                            ? e.monetaryValue
                            : e.value
                        ),
                        backgroundColor: backgroundColors(),
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={getOptions(graphShowType.marketApproach == "$")}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Acitivities;
