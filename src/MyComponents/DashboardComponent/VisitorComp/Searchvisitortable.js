import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

// Create a SearchApp Component
class SearchApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }
  handleChange(event) {
    // Get event value
    let searchValue = event.target.value;
    // Set the state to trigger a re-rendering
    this.setState({ search: searchValue });
  }
  render() {
    // Filter the table data
    let visitors = this.props.data,
      searchString = this.state.search.trim().toLowerCase();

    if (searchString.length > 0) {
      // We are searching. Filter the results.
      visitors = visitors.filter(
        (e) =>
          e.name.toLowerCase().match(searchString) ||
          e.email.toLowerCase().match(searchString)
      );
    }

    // Set the `update` property of the `UserInput` element
    return (
      <div className="container" style={{ marginTop: "30px" }}>
        <UserInput update={(e) => this.handleChange(e)} />
        <Table data={visitors} />
      </div>
    );
  }
}
export default SearchApp;

// UserInput component
class UserInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <input
          className="form-control mb-3"
          placeholder="Search Visitor....."
          onChange={(e) => this.props.update(e)}
        />
      </div>
    );
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <table className="table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Address</th>
              <th>visit</th>
              <th>Chk-In D-T</th>
              <th>Chk-Out D-T</th>
              <th>status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(function (d, i) {
              return (
                <tr i={i}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{d.name}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{d.email}</p>
                  </td>
                  <td>
                    <span className="">{d.age}</span>
                  </td>
                  <td>{d.address}</td>
                  <td>{d.purposetovisit}</td>
                  <td>
                    {moment(d.checkindatetime).format("DD/MM/YYYY") ===
                    "01/01/1970"
                      ? ""
                      : moment(d.checkindatetime).format("DD/MM/YYYY") +
                        " - " +
                        moment(d.checkindatetime).format("h:mm a")}
                  </td>
                  <td>
                    {moment(d.checkoutdatetime).format("DD/MM/YYYY") ===
                    "01/01/1970"
                      ? ""
                      : moment(d.checkoutdatetime).format("DD/MM/YYYY") +
                        " - " +
                        moment(d.checkindatetime).format("h:mm a")}
                  </td>
                  <td>
                    {d.status === 1 ? (
                      <span class="badge badge-pill badge-success">
                        Check In
                      </span>
                    ) : (
                      ""
                    )}
                    {moment(d.checkoutdatetime).format("DD/MM/YYYY") ===
                      "01/01/1970" && d.status !== 1 ? (
                      <span className="badge badge-pill badge-info">
                        Registred
                      </span>
                    ) : (
                      ""
                    )}
                    {moment(d.checkoutdatetime).format("DD/MM/YYYY") !==
                    "01/01/1970" ? (
                      <span className="badge badge-pill badge-info">
                        Check Out
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    <Link to={`/dashboard/visitors/visitordetails/${d._id}`}>
                      <button
                        type="button"
                        className="btn btn-link btn-sm btn-danger btn-rounded"
                        _hover={{
                          bg: "blue.500",
                        }}
                      >
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
