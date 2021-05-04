import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import { Link, useHistory } from "react-router-dom";
import {
  FaSignOutAlt,
  FaUserMd,
  FaMicroscope,
  FaPills,
  FaTasks,
  FaList,
  FaChartBar,
  FaNotesMedical,
  FaArrowLeft,
} from "react-icons/fa";

import { useAuth } from "../../hooks/auth";

import { ButtonCircle } from "../Form/styles";

import logo from "../../assets/stepx.png";

function Topnav({ title = "", children = [] }) {
  const { user } = useAuth();
  const { name, gender } = user;

  const date = new Date("2021-04-27T18:26:02.193Z");

  return (
    <>
      <div className="container-fluid px-4 py-3">
        <div className="row">
          <div className="col-sm-12 col-md-3">
            {" "}
            <h1>{title}</h1>
            Hello, {name}
            <br></br>
            <small className="text-muted">
              Last updated on {date.toLocaleString("en-US")}
            </small>
          </div>

          <div className="col-sm-12 col-md-9">
            <div className="row">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topnav;
