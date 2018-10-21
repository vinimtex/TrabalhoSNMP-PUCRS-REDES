import React, { Component } from 'react';
import WorkAreaComponent from '../components/workAreaComponent';
import SnpmService from '../snmp-service';

class WorkArea extends Component {
    constructor(props) {
        super(props);
    }


    handleStartSubmitted = initialSettings => {

        console.warn(initialSettings);

    }

    render() {
        return (<WorkAreaComponent
            onStartSubmitted={this.handleStartSubmitted}
        ></WorkAreaComponent>);
    }
}

export default WorkArea;