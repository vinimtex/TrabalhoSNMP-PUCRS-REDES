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
            Community: "public",
            timePooling: ""
        }
    };

    handlInputChange = e => {

        const dadosFormulario = { ...this.state.dadosFormulario };

        dadosFormulario[e.currentTarget.name] = e.currentTarget.value;

        this.setState({ dadosFormulario });

    };

    render() {
        return (
            <React.Fragment>

                {/* começo: Formulário de start */}
                {this.props.showFormStart &&
                    < div >
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
                                <option>public</option>
                                <option>private</option>
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
                }
                {/* fim: Formulário de start */}

                {/* começo: Gráficos */}
                {!this.props.showFormStart && (
                    <LineChart
                        width={600}
                        height={300}
                        data={this.props.dadosGrafico}
                        margin={{ top: 10, right: 50, left: 50, bottom: 10 }}

                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="enviado"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        />
                        <Line type="monotone" dataKey="recebido" stroke="#82ca9d" />
                    </LineChart>
                )}
                {/* fim: Gráficos */}

            </React.Fragment>
        );
    }
}

export default WorkAreaComponent;
