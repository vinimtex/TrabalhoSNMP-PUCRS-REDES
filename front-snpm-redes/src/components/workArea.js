import React, { Component } from "react";
import WorkAreaComponent from "../components/workAreaComponent";
import SnmpService from "../snmp-service";

var currentSettings = {};

class WorkArea extends Component {

  state = {
    time: undefined,
    dadosGrafico: [
      { name: "Datagramas", recebido: 0, enviado: 0 },
      { name: "Octetos", recebido: 0, enviado: 0 },
      { name: "Pacotes TCP", recebido: 0, enviado: 0 },
      { name: "Pacotes UDP", recebido: 0, enviado: 0 }
    ],
    initialSettings: {}
  }

  startPooling = (initialSettings) =>{

    let time = initialSettings.timePooling == undefined? 1000 : initialSettings.timePooling;

    setInterval(()=>{
      currentSettings = initialSettings == undefined ? this.state.initialSettings : initialSettings;

      this.ObterDesempenho(currentSettings);

    }, time * 1000);

  }

  SetarValoresGrafico = (dadosGrafico_) =>{

    const dadosGrafico = [ ...this.state.dadosGrafico ];

    dadosGrafico[0].recebido = dadosGrafico_.datagramsReceived;
    dadosGrafico[0].enviado = dadosGrafico_.datagramsSent;

    dadosGrafico[1].recebido = dadosGrafico_.inOctects;
    dadosGrafico[1].enviado = dadosGrafico_.outOctects;

    dadosGrafico[2].recebido = dadosGrafico_.tcpPacketsIn;
    dadosGrafico[2].enviado = dadosGrafico_.tcpPacketsOut;

    dadosGrafico[2].recebido = dadosGrafico_.udpPacketsIn;
    dadosGrafico[2].enviado = dadosGrafico_.udpPacketsOut;

    this.setState({dadosGrafico});
  }

  ObterDesempenho = (currentSettings) => {

    SnmpService.ObterDesempenho(currentSettings)
      .then((response) => {
        
        this.SetarValoresGrafico(response.data.data);

      })
      .catch((response) => {
        // alert(`Erro ao obter métricas: ${response}.`)
      });
  }

  handleStartSubmitted = initialSettings => {

    if (initialSettings.timePooling == undefined || initialSettings.timePooling == ''
      || initialSettings.AgentAddress == undefined || initialSettings.AgentAddress == ''
      || initialSettings.Community == undefined || initialSettings.Community == '') {
      alert('Informe todos os campos para começar.')
      return;
    }
    SnmpService.Start(initialSettings)
      .then((response) => {
        alert(`Sessão iniciada com sucesso para o usuário ${response.data.data.sysName}.`);
        this.startPooling(initialSettings);
        this.setState({initialSettings: initialSettings});
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
