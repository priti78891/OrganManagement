import web3 from "./web";
import OrganChain from './build/OrganChain.json';


const instance =  new web3.eth.Contract(
    JSON.parse(OrganChain.interface) ,
    '0xdAD55c2f0b71A3CbAa582DAE62B26ba364Ee59d7'
);

export default instance;