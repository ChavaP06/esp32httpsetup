import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import "./App.css";
import { httpClient } from "./utils/HttpClient";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevRowCount: 0,
      rowCount: 1,
      prevAlarmRowCount: 0,
      alarmRowCount: 1,
      prevProdRowCount: 0,
      prodRowCount: 1,
      data: [{ id: 1, values: ["", "", "0"] }],
      alarmData: [{ id: 1, values: ["", "", "1"] }],
      prodData: [{ id: 1, values: ["", "", "2"] }],
    };
  }

  componentDidMount = async () => {
    let data = await httpClient.get("api/getTable");
    this.setState(data.data);
  };

  handleInputChange = (id, columnIndex, e, num) => {
    if (num === 0) {
      const newData = this.state.data.map((row) => {
        if (row.id === id) {
          const newValues = [...row.values];
          if (columnIndex === 2) {
            newValues[columnIndex] = Number(num);
          } else {
            newValues[columnIndex] = e.target.value;
          }

          return { ...row, values: newValues };
        }
        return row;
      });

      this.setState({
        data: newData,
      });
    } else if (num === 1) {
      const newData = this.state.alarmData.map((row) => {
        if (row.id === id) {
          const newValues = [...row.values];
          if (columnIndex === 2) {
            newValues[columnIndex] = Number(num);
          } else {
            newValues[columnIndex] = e.target.value;
          }

          return { ...row, values: newValues };
        }
        return row;
      });

      this.setState({
        alarmData: newData,
      });
    } else if (num === 2) {
      const newData = this.state.prodData.map((row) => {
        if (row.id === id) {
          const newValues = [...row.values];
          if (columnIndex === 2) {
            newValues[columnIndex] = Number(num);
          } else {
            newValues[columnIndex] = e.target.value;
          }

          return { ...row, values: newValues };
        }
        return row;
      });

      this.setState({
        prodData: newData,
      });
    }
  };

  CheckData = (id, columnIndex, lockValue) => {
    //console.log(this.state.rowCount +"" + this.state.prevRowCount)
    if (lockValue === 0) {
      if (this.state.prevRowCount !== this.state.rowCount) {
        const newData = this.state.data.map((row) => {
          if (row.id === id) {
            const newValues = [...row.values];

            newValues[columnIndex] = String(lockValue);

            return { ...row, values: newValues };
          }
          return row;
        });

        this.setState({
          data: newData,
          prevRowCount: this.state.rowCount,
        });
      }
      return String(lockValue);
    } else if (lockValue === 1) {
      if (this.state.prevAlarmRowCount !== this.state.alarmRowCount) {
        const newData = this.state.alarmData.map((row) => {
          if (row.id === id) {
            const newValues = [...row.values];

            newValues[columnIndex] = String(lockValue);

            return { ...row, values: newValues };
          }
          return row;
        });

        this.setState({
          alarmData: newData,
          prevAlarmRowCount: this.state.alarmRowCount,
        });
      }
      return String(lockValue);
    } else if (lockValue === 2) {
      if (this.state.prevProdRowCount !== this.state.prodRowCount) {
        const newData = this.state.prodData.map((row) => {
          if (row.id === id) {
            const newValues = [...row.values];

            newValues[columnIndex] = String(lockValue);

            return { ...row, values: newValues };
          }
          return row;
        });

        this.setState({
          prodData: newData,
          prevProdRowCount: this.state.prodRowCount,
        });
      }
      return String(lockValue);
    }
  };

  handleSubmit = async () => {
    let command = await httpClient.post("api/saveTable", this.state); //alert();
    alert("Data Saved Successfully")
  };
  CreateRows(status, alarm, prod, num) {
    // console.log(status + " " + alarm + " " + prod);
    // console.log(Number(status) + Number(alarm) + Number(prod));

    if (num === 0) {
      const newRowCount = Number(status);
      const newData = Array.from({ length: newRowCount }, (_, index) => {
        const existingRow = this.state.data[index];
        return existingRow || { id: index + 1, values: Array(3).fill("") };
      });
      this.setState({
        data: newData,
      });
    } else if (num === 1) {
      const newRowCount = Number(alarm);
      const newData = Array.from({ length: newRowCount }, (_, index) => {
        const existingRow = this.state.alarmData[index];
        return existingRow || { id: index + 1, values: Array(3).fill("") };
      });
      this.setState({
        alarmData: newData,
      });
    } else if (num === 2) {
      const newRowCount = Number(prod);
      const newData = Array.from({ length: newRowCount }, (_, index) => {
        const existingRow = this.state.prodData[index];
        return existingRow || { id: index + 1, values: Array(3).fill("") };
      });
      this.setState({
        prodData: newData,
      });
    }
  }

  checkIndex(row, index, value, num) {
    if (index === 2) {
      return (
        <input
          type="text"
          value={this.CheckData(row.id, index, num)}
          style={{ color: "lightgrey", textAlign: "center" }}
        />
      );
    } else {
      if (index === 1) {
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => this.handleInputChange(row.id, index, e, num)}
            style={{ textAlign: "center" }}
          />
        );
      } else {
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => this.handleInputChange(row.id, index, e, num)}
            style={{ textAlign: "center" }}
          />
        );
      }
    }
  }
  saveRowCount(e, num) {
    if (num === 0) {
      this.setState({
        rowCount: e.target.value,
      });
      this.CreateRows(
        e.target.value,
        this.state.alarmRowCount,
        this.state.prodRowCount,
        num
      );
    } else if (num === 1) {
      this.setState({
        alarmRowCount: e.target.value,
      });
      this.CreateRows(
        this.state.rowCount,
        e.target.value,
        this.state.prodRowCount,
        num
      );
    } else if (num === 2) {
      this.setState({
        prodRowCount: e.target.value,
      });
      this.CreateRows(
        this.state.rowCount,
        this.state.prodRowCount,
        e.target.value,
        num
      );
    }
  }

  RowCheck(row, num) {
    if (num === 0) {
      if (row.id <= this.state.rowCount) {
        return (
          <tr key={row.id}>
            <td>{row.id}</td>
            {row.values.map((value, index) => (
              <td key={index}>{this.checkIndex(row, index, value, num)}</td>
            ))}
          </tr>
        );
      }
    } else if (num === 1) {
      if (row.id <= this.state.alarmRowCount) {
        return (
          <tr key={row.id}>
            <td>{row.id}</td>
            {row.values.map((value, index) => (
              <td key={index}>{this.checkIndex(row, index, value, num)}</td>
            ))}
          </tr>
        );
      }
    } else if (num === 2) {
      if (row.id <= this.state.prodRowCount) {
        return (
          <tr key={row.id}>
            <td>{row.id}</td>
            {row.values.map((value, index) => (
              <td key={index}>{this.checkIndex(row, index, value, num)}</td>
            ))}
          </tr>
        );
      }
    }
  }
  render() {
    return (
      <div>
        <div style={{ float: "right" }}>
          <label style={{ marginLeft: "34%" }}>Status Row Count:</label>
          <input
            type="number"
            value={this.state.rowCount}
            onChange={(e) => this.saveRowCount(e, 0)}
            min="1"
            // onChange={(e) => this.handleRowCountChange(e, 0)}
            style={{ width: "13%", textAlign: "center", marginLeft: "10%" }}
          />
          <br></br>
          <label style={{ marginLeft: "34%" }}>Alarm Row Count:</label>
          <input
            type="number"
            value={this.state.alarmRowCount}
            onChange={(e) => this.saveRowCount(e, 1)}
            min="1"
            // onChange={(e) => this.handleRowCountChange(e, 1)}
            style={{ width: "13%", textAlign: "center", marginLeft: "10%" }}
          />
          <br></br>
          <label style={{ marginLeft: "34%" }}>Production Row Count:</label>
          <input
            type="number"
            value={this.state.prodRowCount}
            onChange={(e) => this.saveRowCount(e, 2)}
            min="1"
            // onChange={(e) => this.handleRowCountChange(e, 2)}
            style={{ width: "12%", textAlign: "center" }}
          />

          <button
            onClick={this.handleSubmit}
            style={{ display: "block", marginLeft: "83%", marginTop: "10px" }}
          >
            Save
          </button>
        </div>

        <div style={{ width: "0%", marginLeft: "30%" }}>
          <div>
            <div>
              <label style={{ fontWeight: "bold" }}> Status</label>
            </div>

            <div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((row) => this.RowCheck(row, 0))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div>
              <label style={{ fontWeight: "bold" }}> Alarm</label>
            </div>

            <div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.alarmData.map((row) => this.RowCheck(row, 1))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div>
              <label style={{ fontWeight: "bold" }}> Production</label>
            </div>

            <div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.prodData.map((row) => this.RowCheck(row, 2))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
