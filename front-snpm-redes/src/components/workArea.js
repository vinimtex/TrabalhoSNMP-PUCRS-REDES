import React, { Component } from "react";
import WorkAreaComponent from "../components/workAreaComponent";
import SnpmService from "../snmp-service";

class WorkArea extends Component {
  constructor(props) {
    super(props);
  }

  handleStartSubmitted = initialSettings => {

    window.localStorage.setItem("time", initialSettings.timePooling);
    console.info(window.localStorage.getItem("time"));

    SnpmService.ObterDesempenho(initialSettings)
    .then((response)=>{
        console.info(response);
    })
    .catch((response)=>{
        console.info('Ocorreu um erro ao startar a aplicação: ', response)
    });

  };

  render() {
    return <WorkAreaComponent onStartSubmitted={this.handleStartSubmitted} />;
  }
}

export default WorkArea;
