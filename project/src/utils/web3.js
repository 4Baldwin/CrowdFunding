import { ethers } from 'ethers';

export const checkIfWalletIsConnected = async () => {
  try {
    if (!window.ethereum) {
      throw new Error("Please install MetaMask!");
    }
    
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts[0] || '';
  } catch (error) {
    console.error("Error checking wallet connection:", error);
    return '';
  }
};

export const setupProvider = () => {
  if (!window.ethereum) throw new Error("Please install MetaMask!");
  return new ethers.providers.Web3Provider(window.ethereum);
};

export const formatEther = (value) => {
  return ethers.utils.formatEther(value);
};

export const parseEther = (value) => {
  return ethers.utils.parseEther(value);
};

export const shortenAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const listenToAccountChanges = (callback) => {
  if (!window.ethereum) return;
  
  window.ethereum.on('accountsChanged', (accounts) => {
    callback(accounts[0] || '');
  });
};

export const listenToChainChanges = (callback) => {
  if (!window.ethereum) return;
  
  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  });
};