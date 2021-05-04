import React, { useEffect } from "react";

import SideBar from "../../components/SideBar";
import { useRouteMatch } from "react-router-dom";

import { useAuth } from "../../hooks/auth";
import { Container } from "../Landing/styles";

import stepImg from "../../assets/Step-bro.svg";

import SAMPLE_DATA_CL from "../../seed/demoData";
import Topnav from "../../components/Topnav";
import axios from "axios";
import humanize from '../../utils/humanize';

function Showtable() {
  const { user } = useAuth();
  const { name, gender } = user;
  const { params } = useRouteMatch();

  let namec = params.id;
  function getParams() {
    let c = {};
    for (let [i, x] of window.location.search
      .replaceAll("?", "")
      .split("&")
      .map((e) => e.split("="))
      .entries()) {
      if (x[0] && x[1]) {
        c[x[0]] = decodeURIComponent(x[1]);
      }
    }
    return c;
  }
  const queryParams = getParams();

  const SAMPLE_DATA = SAMPLE_DATA_CL(namec);

  let dataTable;
  useEffect(() => {
    setTimeout(function () {
      if (window.$.fn.DataTable.isDataTable("#datatables")) {
        window.$("#datatables").DataTable().destroy();
      }
      dataTable = window.$("#datatables").DataTable({
        bLengthChange: false, //thought this line could hide the LengthMenu
        bInfo: false,
        paging: false,
        dom: "Bfrtip",
        searching: false,
        buttons: {
          dom: {
            button: {
                 className: 'btn'
            }
          },
          buttons: [
            {
                extend: 'excel',
                text: "<img style='width:50px;' src='/excell.png'> Download",
                className: 'btn-lg'
            },
          ] 
        },
        // "dom": 'tB'
      });
    }, 3000);
  }, [SAMPLE_DATA]);



  function applyFilter() {
    return SAMPLE_DATA.filter((e) => {
      return (
        queryParams.length == 0 ||
        Object.entries(queryParams).every(([c, v]) => {
          return v == e[c];
        })
      );
    });
  }

  return (
    <>
      <SideBar />
      <Container>
        <Topnav title={humanize(namec)} />

        <div className="container-fluid">
          <div className="row mx-2">
            <table className="table" id="datatables">
              <thead>
                <tr>
                  {Object.keys(SAMPLE_DATA[0]).map((c, i) => (
                    <th key={i}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {applyFilter(SAMPLE_DATA).map((e, i) => (
                  <tr key={i}>
                    {Object.keys(e).map((c, i) => {
                      return <td key={i}>{e[c]}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Showtable;
