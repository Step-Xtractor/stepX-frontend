import React, { useState } from "react";
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
  FaArrowRight,
} from "react-icons/fa";

import { useAuth } from "../../hooks/auth";

import { ButtonCircle } from "../Form/styles";

import logo from "../../assets/stepx.png";
import activity from "../../assets/activity.png";
import contractAmendment from "../../assets/contract_amendment.png";
import contract from "../../assets/contract.png";
import logoutIcon from "../../assets/logout.png";
import roadmaps from "../../assets/roadmaps.png";
import Settings from "../../assets/Settings.png";

import useWindowDimensions from "../../hooks/dimension";

const Aside = ({ toggled, handleToggleSidebar }) => {
  const { signOut } = useAuth();
  const history = useHistory();

  const [collapsed, setCollapsed] = useState(localStorage.getItem('collapseState') == 'true');

  function logout() {
    localStorage.removeItem("@Step:exec_studyToken");
    localStorage.removeItem("@Step:studyToken");
    signOut();
  }

  const { height, width } = useWindowDimensions();

  return (
    <div className="row">
      <div className="col-11" style={{ margin: 0, padding: 0 }}>
        <ProSidebar
          breakPoint="md"
          toggled={toggled}
          onToggle={(v) => {
            handleToggleSidebar(v);
            setCollapsed(v);
            localStorage.setItem('collapseState', v);
          }}
          collapsed={width > 768 ? collapsed : toggled && collapsed}
          collapsedWidth={100}
        >
          <SidebarHeader>
            <div className="row">
              <div className="col-12">
                <div style={{ display: "inline-block" }}>
                  <div
                    style={{
                      paddingLeft: "24px",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      fontSize: 24,
                      letterSpacing: "1px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      lineHeight: 2,
                      display: "inline-block",
                    }}
                  >
                    <Link
                      to="/landing"
                      style={{
                        marginRight: "40px",
                      }}
                    >
                      <img src={logo} width="200"></img>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <Menu iconShape="circle">
              <MenuItem
                style={{
                  paddingLeft: 15,
                }}
                icon={
                  collapsed ? (
                    <FaArrowRight size={18} />
                  ) : (
                    <FaArrowLeft size={18} />
                  )
                }
              >
                {collapsed ? "Expand" : "Collapse"}
                <Link
                  to="#"
                  onClick={() => {
                    setCollapsed(!collapsed);
                    localStorage.setItem('collapseState', !collapsed);
                  }}
                />
              </MenuItem>

              <MenuItem
                style={{
                  paddingLeft: 15,
                }}
                icon={ <img src={activity} width="30"></img> }
                active={window.location.pathname.startsWith("/activities")}
              >
                Activities
                <Link to="/activities" />
              </MenuItem>

              <MenuItem
                style={{
                  paddingLeft: 15,
                }}
                icon={ <img src={contract} width="30"></img> }
                active={window.location.pathname.startsWith("/contracts")}
              >
                Contracts
                <Link to="/contracts" />
              </MenuItem>

              <MenuItem
                style={{
                  paddingLeft: 15,
                }}
                icon={ <img src={contractAmendment} width="30"></img> }
                active={window.location.pathname.startsWith("/amendments")}
              >
                Amendments
                <Link to="/amendments" />
              </MenuItem>

              <MenuItem
                style={{
                  paddingLeft: 15,
                }}
                icon={ <img src={roadmaps} width="30"></img> }
                active={window.location.pathname.startsWith("/roadmaps")}
              >
                Roadmaps
                <Link to="/roadmaps" />
              </MenuItem>

              <MenuItem
                style={{
                  paddingLeft: 15,
                }}
                icon={ <img src={Settings} width="30"></img> }
              >
                Settings
                <Link to="#" />
              </MenuItem>

              <MenuItem
                style={{
                  paddingLeft: 15,
                }}
                icon={ <img src={logoutIcon} width="30"></img> }
              >
                Logout
                <Link to="#" onClick={logout} />
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    </div>
  );
};

export default Aside;
