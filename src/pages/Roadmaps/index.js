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
  FaHourglassEnd,
} from "react-icons/fa";
import api from "../../services/api";

import convertToChartJs from "../../utils/convertToChartJs";
import moneyAbbreviation from "../../utils/moneyAbbreviation";

import showTableImg from "../../assets/Show_table.png";
import clearFilterImg from "../../assets/clear_filter.png";
import ButtonGraphGroup from "../../components/ButtonGraphGroup";

import {backgroundColors, getOptions} from '../../utils/chartUtils';

import humanize from '../../utils/humanize';

import Plot from 'react-plotly.js';

function Roadmaps() {
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

  const [actualData, setActualData] = useState({});

  const [virtualConsultant, setVirtualConsultant] = useState([]);
  const [procurementMethod, setProcurementMethod] = useState([]);
  const [procurementCategory, setProcurementCategory] = useState([]);
  const [activityDurationByCategory, setActivityDurationByCategory] = useState([]);
  const [consultantServices, setConsultantServices] = useState([]);

  const [filterOptions, setFilterOptions] = useState([]);

  const [graphShowType, setGraphShowType] = useState({});
  const [dashboard, setDashboard] = useState({});

  const [showFilters, setShowFilters] = useState(true);

  const [expand, setExpand] = useState('');

  const colors = backgroundColors();


  useEffect(() => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    api.get("/roadmaps/filterOptions").then((response) => {
      setFilterOptions(response.data);
    });

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

    api.get("/roadmaps/dashboard"+query).then((response) => {
      setDashboard(response.data);
    });

    function convert(dt){
      let labels = Array.from(new Set(Object.keys(dt)));
      let fn = labels.map((key, i )=>{
        
        let val = dt[key];
        return val.map((e)=>{
          return {
            y: e.rawData,
            // x: labels,
            name: e.stepName,
            // marker: {color: colors[x++]},
            type: 'box',
            boxmean: 's',
            
          };
        });
      }).flat();
      fn.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      })  
      let x = 0;
      fn = fn.map((e)=>{
        e.marker = {
          color: colors[x++],
        };
        return e;
      });
      return fn;
    }

    api.get("/roadmaps/graph/boxplotRoadmap" + query).then((response) => {
      setProcurementCategory(convert(response.data));
    });

    api.get("/roadmaps/graph/boxplotGroupByProcurementMethod" + query).then((response) => {
      setVirtualConsultant(convert(response.data));
    });

    api.get("/roadmaps/graph/boxplotRoadmapConsultantServices" + query).then((response) => {
      setConsultantServices(convert(response.data));
    });

    api.get("/roadmaps/graph/financialPhysical" + query).then((response) => {
      let ln = Object.keys(response.data.original); 
      ln.sort(function(a, b){return a-b});
      var trace1 = {
        x: ln,
        y: ln.map(e=>response.data.original[e].valuePerYear),
        name: 'Original',
        type: 'bar',
        marker: {color: '#21BBAF'},
        
      };

      let fn = Object.keys(response.data.withAmendments); 
      fn.sort(function(a, b){return a-b});
      var trace2 = {
        x: fn,
        y: fn.map(e=>response.data.withAmendments[e].valuePerYear),
        name: 'Amendment',
        type: 'bar',
        marker: {color: '#F7942E'}
      };
      
      var data = [trace2, trace1];
      setProcurementMethod(data);
    });

    api.get("/roadmaps/graph/activityDurationByCategory" + query).then((response) => {
      let c = response.data.map(e=>{
        return {
          y: e.rawData,
          // x: labels,
          name: e.procurementCategory,
          // marker: {color: colors[x++]},
          type: 'box',
          boxmean: 's',
          
        };
      });
      c.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      })  
      let x = 0;
      c = c.map((e)=>{
        e.marker = {
          color: colors[x++],
        };
        return e;
      });
      setActivityDurationByCategory((c));
    });
    
    // api.get("/roadmaps/graph/boxplotGroupByProcurementMethod" + query).then((response) => {
    //   let labels =  Array.from(new Set(Object.keys(response.data)));
    //   let fn = labels.map((key)=>{
    //     let val = response.data[key];
    //     return val.map((e)=>{
    //       return {
    //         y: e.totalData,
    //         x: labels,
    //         name: e.procurementMethod,
    //         // marker: {color: '#3D9970'},
    //         type: 'box'
    //       };
    //     });
    //   }).flat();  
    //   setProcurementMethod(fn);
    // });
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
          title="Roadmaps"
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
                          let tr = e?.activityId ?? e?.agencyId ?? e?.contractId ?? e?.name ?? e?.projectId ?? e;
                          let ct = e?.description ?? e?.projectId ?? e?.contractId ?? e?.name ?? e;
                          return {
                            value: tr,
                            label: ct?.activityId ?? ct,
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
            {showFilters &&
              <div className="col-sm-1 d-flex align-self-center my-auto">
                <div className="row ">
                  <div className="col my-3 ">
                    <button
                      className="btn  btn-outline-info "
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
                        let str = "/roadmaps/showTable/prod?";
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

          <div className='forcedStylePloty'>


          <div className="row text-center ">
          <div className={('col-10')+" mx-auto text-center my-4 animatedContainer"}>
              <div className="alert alert-secondary">
                <div className="row">
                  <div className="col my-auto">
                    <h5 className='my-auto'>Total</h5>
                  </div>
                  <div className="col-3 d-none">
                    <div className="btn-group">
                      <ButtonGraphGroup
                        inState={graphShowType.activityDurationByCategory == "$"}
                        button1Hide={true}
                        button2Hide={true}
                        button3Hide={true}
                        button1OnClick={() => {
                          let x = Object.assign(graphShowType, {
                            activityDurationByCategory: "#",
                          });
                          setGraphShowType({ ...x });
                        }}
                        button2OnClick={() => {
                          let x = Object.assign(graphShowType, {
                            activityDurationByCategory: "$",
                          });
                          setGraphShowType({ ...x });
                        }}
                        expandButtonOnClick={()=>{
                          setExpand(expand == 'activityDurationByCategory'?'':'activityDurationByCategory')
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{overflowX:'auto'}}>
                {
                  activityDurationByCategory.length > 0 && 
                  <Plot
                    // width={400}
                    // height={400}
                    data={activityDurationByCategory}
                    layout={ {
                      width: 1000,
                      height: 500,
                      showlegend: true,
                      boxmode: 'group',
                      xaxis: {
                        showticklabels: false
                      },
                      // boxpoints: false,
                      // transforms: [{
                      //   type: 'filter',
                      //   target: 'y',
                      //   targetstats: 'std',
                      //   operation: '<',
                      //   multiplier: 2
                      // }]
                    } }
                    config={{
                    }}
                  />
                }

              </div>
            </div>
            <div className={('col-10')+" mx-auto text-center my-4 animatedContainer"}>
              <div className="alert alert-secondary">
                <div className="row">
                  <div className="col my-auto">
                    <h5 className='my-auto'>Works, Goods & Services </h5>
                  </div>
                  <div className="col-3 d-none">
                    <div className="btn-group">
                      <ButtonGraphGroup
                        inState={graphShowType.procurementCategory == "$"}
                        button1Hide={true}
                        button2Hide={true}
                        button3Hide={true}
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
              <div style={{overflowX:'auto'}}>
                {
                  procurementCategory.length > 0 && 
                  <Plot
                    // width={400}
                    // height={400}
                    data={procurementCategory}
                    layout={ {
                      width: 1000,
                      height: 500,
                      showlegend: true,
                      boxmode: 'group',
                      xaxis: {
                        showticklabels: false
                      },
                    } }
                    config={{
                    }}
                  />
                }

              </div>
            </div>

            <div className={('col-10')+" mx-auto text-center my-4 animatedContainer"}>
              <div className="alert alert-secondary">
                <div className="row">
                  <div className="col my-auto">
                    <h5 className='my-auto'>Consultant Services</h5>
                  </div>
                  <div className="col-3 d-none">
                    <div className="btn-group">
                      <ButtonGraphGroup
                        inState={graphShowType.consultantServices == "$"}
                        button1Hide={true}
                        button2Hide={true}
                        button3Hide={true}
                        button1OnClick={() => {
                          let x = Object.assign(graphShowType, {
                            consultantServices: "#",
                          });
                          setGraphShowType({ ...x });
                        }}
                        button2OnClick={() => {
                          let x = Object.assign(graphShowType, {
                            consultantServices: "$",
                          });
                          setGraphShowType({ ...x });
                        }}
                        expandButtonOnClick={()=>{
                          setExpand(expand == 'consultantServices'?'':'consultantServices')
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{overflowX:'auto'}}>
                {
                  consultantServices.length > 0 && 
                  <Plot
                    // width={400}
                    // height={400}
                    data={consultantServices}
                    layout={ {
                      width: 1000,
                      height: 500,
                      showlegend: true,
                      boxmode: 'group',
                      xaxis: {
                        showticklabels: false
                      },
                    } }
                    config={{
                    }}
                  />
                }

              </div>
            </div>

            {/* <div className={('col-10')+" mx-auto text-center  my-4 animatedContainer"}>
              <div className="alert alert-secondary">
                <div className="row">
                  <div className="col my-auto">
                    <h5 className='my-auto'>Consultant Firm</h5>
                  </div>
                  <div className="col-3 d-none">
                    <div className="btn-group">
                      <ButtonGraphGroup
                        inState={graphShowType.reviewType == "$"}
                        button1Hide={true}
                        button2Hide={true}
                        // button
                        button1OnClick={() => {
                          let x = Object.assign(graphShowType, {
                            reviewType: "#",
                          });
                          setGraphShowType({ ...x });
                        }}
                        button3Hide={true}
                        button2OnClick={() => {
                          let x = Object.assign(graphShowType, {
                            reviewType: "$",
                          });
                          setGraphShowType({ ...x });
                        }}
                        expandButtonOnClick={()=>{
                          setExpand((expand == 'reviewType'?'':'reviewType'))
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                  {
                    virtualConsultant.length > 0 && 
                    <Plot
                      // width={400}
                      // height={400}
                      data={virtualConsultant}
                      layout={ {
                        width: 900,
                        height: 650,
                        showlegend: true,
                        boxmode: 'group',
                        xaxis: {
                          showticklabels: false
                        },
                      } }
                      config={{
                      }}
                    />
                  }
              </div>

            </div> */}

            <div className={('col-10')+" mx-auto text-center  my-4 animatedContainer"}>
              <div className="alert alert-secondary">
                <div className="row">
                  <div className="col my-auto">
                    <h5 className='my-auto d-inline'>Financial Phisical Schedule</h5>
                    <div className="btn-group" style={{float:'right',width: 0,
    right: '40px'}}>
                      <ButtonGraphGroup
                        inState={graphShowType.procurementMethod == "$"}
                        button1Hide={true}
                        button2Hide={true}
                        button3Hide={false}
                        button4Hide={true}
                        button3Title={'Please note that the yellow bar is the contract amount without amendment, and the blue bar is the amount with amendment'}
                      />
                    </div>
                  </div>
                </div>
              </div>
                {
                  procurementMethod.length > 0 && 
                  <Plot
                    // width={400}
                    // height={400}
                    data={procurementMethod}
                    layout={ {
                      width: 900,
                      height: 650,
                      showlegend: true,
                      
                      barmode: 'overlay',
                      xaxis: {
                        showticklabels: false
                      },
                    } }
                    config={{
                    }}
                  />
                }
            </div>
            </div>

          </div>
        </div>
      </Container>
    </>
  );
}

export default Roadmaps;
