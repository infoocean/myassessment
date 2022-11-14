import React, { useEffect, useState } from "react";
import { api } from "../../../API/APIToken";
import auth_token from "../../../API/APIToken";
import axios from "axios";
const getreceptionistendpoint = "getreceptionist";
const getvisitorsendpoint = "getvisitors";

function Headercard() {
  const [totalreceptionist, settotalreceptionist] = useState(0);
  const [totalrecentvisitors, settotalrecentvisitors] = useState(0);

  const getreceptionistdata = () => {
    var config = {
      method: "get",
      url: `${api}${getreceptionistendpoint}`,
      headers: {
        token: auth_token,
      },
    };
    axios(config)
      .then(function (response) {
        //console.log(response.data);
        settotalreceptionist(response.data.data.length);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getvisitorsdata = () => {
    var config = {
      method: "get",
      url: `${api}${getvisitorsendpoint}`,
      headers: {
        token: auth_token,
      },
    };
    axios(config)
      .then(function (response) {
        //console.log(response.data);
        settotalrecentvisitors(response.data.data.length);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getreceptionistdata();
    getvisitorsdata();
  }, []);

  return (
    <>
      <div className="row ">
        <div className="col-xl-3 col-lg-6">
          <div className="card l-bg-cherry">
            <div className="card-statistic-3 p-4">
              <div className="card-icon card-icon-large">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <div className="mb-4">
                <h5 className="card-title mb-0">Total Receptionist</h5>
              </div>
              <div className="row align-items-center mb-2 d-flex">
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0">
                    {totalreceptionist}
                  </h2>
                </div>
                <div className="col-4 text-right">
                  <span>
                    {totalreceptionist}% <i className="fa fa-arrow-up"></i>
                  </span>
                </div>
              </div>
              <div
                className="progress mt-1 "
                data-height="8"
                style={{ height: "8px" }}
              >
                <div
                  className="progress-bar l-bg-cyan"
                  role="progressbar"
                  data-width={totalreceptionist + "%"}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: totalreceptionist + "%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className="card l-bg-blue-dark">
            <div className="card-statistic-3 p-4">
              <div className="card-icon card-icon-large">
                <i className="fas fa-users"></i>
              </div>
              <div className="mb-4">
                <h5 className="card-title mb-0">Recent Checking Visitors</h5>
              </div>
              <div className="row align-items-center mb-2 d-flex">
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0">
                    {totalrecentvisitors}
                  </h2>
                </div>
                <div className="col-4 text-right">
                  <span>
                    {totalrecentvisitors}% <i className="fa fa-arrow-up"></i>
                  </span>
                </div>
              </div>
              <div
                className="progress mt-1 "
                data-height="8"
                style={{ height: "8px" }}
              >
                <div
                  className="progress-bar l-bg-green"
                  role="progressbar"
                  data-width="25%"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: totalrecentvisitors + "%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Headercard;
