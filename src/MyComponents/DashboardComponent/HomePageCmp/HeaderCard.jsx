import React from "react";

function Headercard() {
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
                  <h2 className="d-flex align-items-center mb-0">3,243</h2>
                </div>
                <div className="col-4 text-right">
                  <span>
                    12% <i className="fa fa-arrow-up"></i>
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
                  data-width="25%"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: "25%" }}
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
                  <h2 className="d-flex align-items-center mb-0">15.07k</h2>
                </div>
                <div className="col-4 text-right">
                  <span>
                    9% <i className="fa fa-arrow-up"></i>
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
                  style={{ width: "25%" }}
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
