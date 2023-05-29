import web3 from "./web";
import OrganChain from './build/OrganChain.json';


const instance =  new web3.eth.Contract(
    JSON.parse(OrganChain.interface) ,
    '0x8776d343b3bBdf7cbE885e79760990Ee057C29B1'
    // '0xdAD55c2f0b71A3CbAa582DAE62B26ba364Ee59d7'
);

export default instance;