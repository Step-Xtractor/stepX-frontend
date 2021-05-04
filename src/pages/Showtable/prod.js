import React, { useEffect, useState } from 'react';

import SideBar from '../../components/SideBar';
import { useRouteMatch } from "react-router-dom";

import { useAuth } from '../../hooks/auth';
import { Container } from '../Landing/styles';

import stepImg from '../../assets/Step-bro.svg'

import Topnav from '../../components/Topnav';
import axios from 'axios';
import api from '../../services/api';

import { FixedSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";

import humanize from '../../utils/humanize';


function Showtable() {
  const { token } = useAuth();

  const {params} = useRouteMatch();

  let namec = params.id;

  const [data, setData] = useState([]);

  useEffect(() => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    api.get('/'+namec+window.location.search).then(response => {
      setData(response.data.map(e=>{
        let r = e;
        delete r['_id'];
        if(r.effectivenessDate){
          r.effectivenessDate = new Date(r.effectivenessDate).toLocaleString('EN-US');
        }
        if(r.closingDate){
          r.closingDate = new Date(r.closingDate).toLocaleString('EN-US');
        }
        if(r.approvalDate){
          r.approvalDate = new Date(r.approvalDate).toLocaleString('EN-US');
        }
        if(r.activitySectors){
          r.activitySectors = r.activitySectors?.map(e=>e.Name).join(',');
        }
        if(r.sectors){
          r.sectors = r.sectors?.map(e=>[e.Code, '-',e.Name].filter(e=>!!e).join(' ')).join(',');
        }
        return r;
      }));
    })

  },[token]);

  let dataTable;
  useEffect(()=>{
    if(data.length > 0){
      setTimeout(function(){
        if(window.$.fn.DataTable.isDataTable( '#datatables' )){
          window.$('#datatables').DataTable().destroy();
        }
        dataTable = window.$('#datatables').DataTable({
          "bLengthChange" : false, //thought this line could hide the LengthMenu
          "bInfo":false,  
          paging: false , 
          dom: 'Bfrtip',
          "searching": false,
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

        dataTable.buttons().container().appendTo( window.$('#btnTargetPos') );
      }, 3000);
    }
  }, [data]);

  return (
    <>
      <SideBar />
      <Container>
        <Topnav title={humanize(namec)} children={[
          <>
          <div id='btnTargetPos'>

          </div>
          </>
        ]}/>
        
        <div className='container-fluid'>
          
          <div className='row mx-2'>
            
            <table className='table' id="datatables">
              <thead>
                <tr>
                {
                  data.length > 0 && Object.keys(data[0]).map((c,i)=>(
                    <th key={i}>
                      {humanize(c)}
                    </th>
                  ))
                }
                </tr>
              </thead>
              <tbody>
              {
                data.map((c,i)=>(
                  <tr key={i}>            
                    {
                      Object.keys(data[0]).map((k,i)=>(
                        // <td key={i}>{Array.isArray(c[k]) ? c[k].map(e=>e.Name).join(',') : (c[k]??'') }</td>
                        <td key={i}>
                          {(typeof c[k] === "boolean" ? (c[k] ? 'Yes':'No') : c[k])}
                        </td>
                      ))
                    }
                  </tr>    
                ))
              }
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Showtable;