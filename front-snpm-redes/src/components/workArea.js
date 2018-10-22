import React, { Component } from "react";
import WorkAreaComponent from "../components/workAreaComponent";
import SnmpService from "../snmp-service";

class WorkArea extends Component {

  state = {
    time: undefined,
    dadosGrafico: [
      { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
      { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
      { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
      { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
      { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
      { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
      { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
    ]
  }

  startPooling = () =>{

    setInterval(()=>{

      this.ObterDesempenho();

    }, this.state.time);

  }

  ObterDesempenho = () => {

    SnmpService.ObterDesempenho()
      .then((response) => {
        
        // TODO: setar os dados do gráfico
        // this.setState({ dadosGrafico: response.data});

      })
      .catch((response) => {
        alert(`Erro ao obter métricas: ${response}.`)
      });
  }

  handleStartSubmitted = initialSettings => {

    if (initialSettings.timePooling == undefined || initialSettings.timePooling == ''
      || initialSettings.AgentAddress == undefined || initialSettings.AgentAddress == '') {
      alert('Informe todos os campos para comçar.')
      return;
    }
    SnmpService.Start(initialSettings)
      .then((response) => {
        alert(`Sessão iniciada com sucesso para o usuário ${response.data.data.sysName}.`);
        this.startPooling();
        this.setState({ time: initialSettings.timePooling });
      })
      .catch((response) => {
        alert(`Ocorreu um erro ao startar a aplicação: ${response}.`)
      });

  };

  render() {
    return <WorkAreaComponent
      onStartSubmitted={this.handleStartSubmitted}
      showFormStart={this.state.time == undefined ? true : false}
      dadosGrafico={this.state.dadosGrafico}
      poolingTime={this.state.time}
    />;
  }
}

export default WorkArea;
