import axios from 'axios';

const _API_ADDRESS = "http://localhost:62321/api/snmp";

const Start = setting => {
    const address = `${_API_ADDRESS}/start`;

    return axios.post(
        address,
        setting
    );
}

const ObterDesempenho = (setting) => {
    const address = `${_API_ADDRESS}/desempenho?com=${setting.Community}&ipAddress=${setting.AgentAddress}`;

    return axios.get(
        address
    );
}

const ObterConfig = () =>{
    const address = `${_API_ADDRESS}/getSetting`;

    return axios.get(
        address
    );
}

export default { Start, ObterDesempenho, ObterConfig };
