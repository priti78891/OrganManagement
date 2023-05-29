import Web3 from "web3";
 
let web3;
 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'http://127.0.0.1:7545'
    // 'https://sepolia.infura.io/v3/4d8b77d13b6e4f8caa93318421404f7c'
  );
  web3 = new Web3(provider);
}
// 0xdc904aE115951C552E19E83e97a5cee77E8aDc8A contract deployed
export default web3;