import React, { useEffect, useState } from "react";

import { FaBell, FaCcStripe } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";

export function clearNotifications() {
  localStorage.removeItem("notifications");
}

export async function loadNotifications(token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  let nots = (await api.get("/userNotifications")).data;
  if (nots) {
    localStorage.setItem("notifications", JSON.stringify(nots));
  }
  return nots;
}

function StepxNotification({}) {
  const { token } = useAuth();
  const MySwal = withReactContent(Swal);
  const [nots, setNots] = useState([]);

  useEffect(() => {
    let cc = localStorage.getItem("notifications");
    if (!cc) {
      // nots = await loadNotifications();
    } else {
      cc = JSON.parse(cc);
    }
    setNots(cc);
  }, []);

  async function showNotifications() {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    let nots = localStorage.getItem("notifications");
    if (!nots) {
      nots = await loadNotifications(token);
    } else {
      nots = JSON.parse(nots);
    }
    setNots(nots);
    MySwal.fire({
      title: "Notificações",
      width: "800px",
      html: (
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th className="text-left p-3">Identificação</th>
                <th className="text-left p-3">Estudo</th>
                <th className="text-left p-3">Mensagem</th>
              </tr>
            </thead>
            <tbody>
              {(nots || []).map((e, index) => (
                <tr
                  key={index}
                  style={{
                    padding: 20,
                    margin: 20,
                  }}
                  className="text-left"
                >
                  <td className=" p-3">
                    {e.estudo.preFixo}
                    {e.estudo.numeroDoProjeto}
                  </td>
                  <td
                    className="p-3"
                    style={{
                      paddingRight: 30,
                    }}
                  >
                    {e.estudo.nomeDoProjeto}
                  </td>
                  <td className="p-3">
                    {e.messages.map((e, index) => (
                      <div key={index}>{e["PT-BR"]}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
      grow: false,
    });
  }

  return (
    <div className="m-2">
      <FaBell
        style={{
          cursor: "pointer",
        }}
        size="17"
        color={
          (nots
            ?.map((e) => e.messages.length)
            ?.reduce((total, num) => total + num, 0) || 0) > 0
            ? "yellow"
            : "white"
        }
        onClick={showNotifications}
      />
    </div>
  );
}

export default StepxNotification;
