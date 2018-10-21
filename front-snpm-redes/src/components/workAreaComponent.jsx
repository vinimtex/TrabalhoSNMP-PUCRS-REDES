import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
];

const inputStyle = {
  fontSize: "25px",
  width: "450px",
  marginTop: "15px"
};

const buttonStyle = {
  fontSize: "25px",
  marginTop: "15px"
};

class WorkAreaComponent extends Component {
  state = {
    dadosFormulario: {
      AgentAddress: "",
      Community: "Público",
      timePooling: ""
    }
  };

  handlInputChange = e => {
    
    const dadosFormulario = {...this.state.dadosFormulario};
    
    dadosFormulario[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ dadosFormulario });

  };

  render() {
    return (
      <React.Fragment>
        <div>
          <h2>Preencha os dados para começar a usar esse super aplicativo</h2>
          <div>
            <label>Interface de Rede</label>
            <br />
            <input
              style={inputStyle}
              placeholder="Interface de Rede"
              name="AgentAddress"
              onChange={this.handlInputChange}
              value={this.state.dadosFormulario.AgentAddress}
            />
            <br />
            <br />
            <label>Comunidade</label>
            <br />
            <select
              style={inputStyle}
              name="Community"
              value={this.state.dadosFormulario.Community}
              onChange={this.handlInputChange}
            >
              <option>Público</option>
              <option>Privado</option>
            </select>
            <br />
            <br />
            <label>Tempo em Segundos</label>
            <br />
            <input
              type="number"
              style={inputStyle}
              name="timePooling"
              placeholder="Tempo em segundos para atualização"
              onChange={this.handlInputChange}
              value={this.state.dadosFormulario.timePooling}
            />
            <br />
            <button
              style={buttonStyle}
              onClick={() => this.props.onStartSubmitted(this.state.dadosFormulario)}
            >
              Começar! ;D
            </button>
          </div>
        </div>

        {false && (
          <LineChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        )}
      </React.Fragment>
    );
  }
}

export default WorkAreaComponent;
