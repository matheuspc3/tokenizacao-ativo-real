import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import CasaTokenABI from "../contracts/CasaToken.json";

const CONTRACT_ADDRESS = "ENDERECO_DO_CONTRATO_DEPLOYADO";

export default function TokenInterface() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        const prov = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(prov);

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);

        const sign = prov.getSigner();
        setSigner(sign);

        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CasaTokenABI.abi, sign);
        setContract(contractInstance);

        const bal = await contractInstance.balanceOf(accounts[0]);
        setBalance(ethers.utils.formatUnits(bal, 18));
      } else {
        alert("Instale o MetaMask!");
      }
    }
    init();
  }, []);

  async function transferTokens() {
    const to = prompt("Endereço para enviar tokens:");
    const amount = prompt("Quantidade de tokens (inteiro):");
    if (contract && to && amount) {
      const tx = await contract.transfer(to, ethers.utils.parseUnits(amount, 18));
      await tx.wait();
      const bal = await contract.balanceOf(account);
      setBalance(ethers.utils.formatUnits(bal, 18));
      alert("Transferência realizada!");
    }
  }

  return (
    <div>
      <p>Carteira conectada: {account}</p>
      <p>Saldo de tokens CASA: {balance}</p>
      <button onClick={transferTokens}>Enviar Tokens</button>
    </div>
  );
}
