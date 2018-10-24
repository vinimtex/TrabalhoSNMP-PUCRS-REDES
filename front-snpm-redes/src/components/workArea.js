import React, { Component } from "react";
import WorkAreaComponent from "../components/workAreaComponent";
import SnmpService from "../snmp-service";

var currentSettings = {};

class WorkArea extends Component {

  state = {
    time: undefined,
    dadosGrafico: {
      Desempenho: [
        { name: "Datagramas", recebido: 0, enviado: 0 },
        { name: "Octetos", recebido: 0, enviado: 0 },
        { name: "Pacotes TCP", recebido: 0, enviado: 0 },
        { name: "Pacotes UDP", recebido: 0, enviado: 0 }
      ],
      Falhas: [
        { name: "ipInHdrErrors", valor: 0 },
        { name: "ipReasmFails", valor: 0 },
        { name: "icmpInErrors", valor: 0 },
        { name: "tcpAttemptFails", valor: 0 },
        { name: "udpInErrors", valor: 0 }
      ],
      Configuracoes: [
        { name: "sysUpTime", valor: 0 },
        { name: "sysDescr", valor: 0 },
        { name: "sysName", valor: 0 },
        { name: "sysContact", valor: 0 },
        { name: "hrMemorySize", valor: 0 }
      ]
    },
    initialSettings: {}
  }

  startPooling = (initialSettings) => {

    let time = initialSettings.timePooling == undefined ? 1000 : initialSettings.timePooling;

    setInterval(() => {
      currentSettings = initialSettings == undefined ? this.state.initialSettings : initialSettings;

      this.ObterDesempenho(currentSettings);
      this.ObterConfiguracao(currentSettings);
      this.ObterFalhas(currentSettings);
    }, time * 1000);

  }

  SetarValoresDesempenho = (dadosGrafico_) => {

    const dadosGrafico = { ...this.state.dadosGrafico };

    dadosGrafico.Desempenho[0].recebido = dadosGrafico_.datagramsReceived;
    dadosGrafico.Desempenho[0].enviado = dadosGrafico_.datagramsSent;

    dadosGrafico.Desempenho[1].recebido = dadosGrafico_.inOctects;
    dadosGrafico.Desempenho[1].enviado = dadosGrafico_.outOctects;

    dadosGrafico.Desempenho[2].recebido = dadosGrafico_.tcpPacketsIn;
    dadosGrafico.Desempenho[2].enviado = dadosGrafico_.tcpPacketsOut;

    dadosGrafico.Desempenho[2].recebido = dadosGrafico_.udpPacketsIn;
    dadosGrafico.Desempenho[2].enviado = dadosGrafico_.udpPacketsOut;

    this.setState({ dadosGrafico });
  }

  ObterDesempenho = (currentSettings) => {

    SnmpService.ObterDesempenho(currentSettings)
      .then((response) => {

        this.SetarValoresDesempenho(response.data.data);

      })
      .catch((response) => {
        this.SetarValoresDesempenho({ datagramsReceived: 0, datagramsSent: 0, inOctects: 0, outOctects: 0, tcpPacketsIn: 0, tcpPacketsOut: 0, udpPacketsIn: 0, udpPacketsOut: 0 });
      });
  }

  SetarValoresConfiguracao = (dadosGrafico_) => {

    const dadosGrafico = { ...this.state.dadosGrafico };

    dadosGrafico.Configuracoes[0].valor = dadosGrafico_[dadosGrafico.Configuracoes[0].name];

    dadosGrafico.Configuracoes[1].valor = dadosGrafico_[dadosGrafico.Configuracoes[1].name];
    dadosGrafico.Configuracoes[2].valor = dadosGrafico_[dadosGrafico.Configuracoes[2].name];
    dadosGrafico.Configuracoes[3].valor = dadosGrafico_[dadosGrafico.Configuracoes[3].name];
    dadosGrafico.Configuracoes[4].valor = dadosGrafico_[dadosGrafico.Configuracoes[4].name];

    this.setState({ dadosGrafico });
  }

  ObterConfiguracao = (currentSettings) => {

    SnmpService.ObterConfiguracao(currentSettings)
      .then((response) => {

        this.SetarValoresConfiguracao(response.data.data);

      })
      .catch((response) => {
        this.SetarValoresConfiguracao(
          { name: "sysUpTime", valor: 0 },
          { name: "sysDescr", valor: 0 },
          { name: "sysName", valor: 0 },
          { name: "sysContact", valor: 0 },
          { name: "hrMemorySize", valor: 0 }
        );
      });
  }

  SetarValoresFalhas = (dadosGrafico_) => {

    const dadosGrafico = { ...this.state.dadosGrafico };

    dadosGrafico.Falhas[0].valor = dadosGrafico_[dadosGrafico.Configuracoes[0].name];
    dadosGrafico.Falhas[1].valor = dadosGrafico_[dadosGrafico.Falhas[1].name];
    dadosGrafico.Falhas[2].valor = dadosGrafico_[dadosGrafico.Falhas[2].name];
    dadosGrafico.Falhas[3].valor = dadosGrafico_[dadosGrafico.Falhas[3].name];
    dadosGrafico.Falhas[4].valor = dadosGrafico_[dadosGrafico.Falhas[4].name];

    this.setState({ dadosGrafico });
  }

  ObterFalhas = (currentSettings) => {

    SnmpService.ObterFalhas(currentSettings)
      .then((response) => {

        this.SetarValoresFalhas(response.data.data);

      })
      .catch((response) => {
        this.SetarValoresFalhas(
          { name: "ipInHdrErrors", valor: 0 },
          { name: "ipReasmFails", valor: 0 },
          { name: "icmpInErrors", valor: 0 },
          { name: "tcpAttemptFails", valor: 0 },
          { name: "udpInErrors", valor: 0 }
        );
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
        this.setState({ initialSettings: initialSettings });
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
