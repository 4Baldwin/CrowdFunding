import { useState, useEffect, useCallback } from 'react';
import { 
  checkIfWalletIsConnected, 
  setupProvider, 
  listenToAccountChanges,
  listenToChainChanges
} from '../utils/web3';

export function useWalletConnection() {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const address = await checkIfWalletIsConnected();
        setAddress(address);
      } catch (error) {
        setError(error.message);
      }
    };
    init();
  }, []);

  useEffect(() => {
    listenToAccountChanges(setAddress);
    listenToChainChanges();
  }, []);

  const connectWallet = useCallback(async () => {
    if (isConnecting) return;
    
    try {
      setIsConnecting(true);
      setError('');
      const provider = setupProvider();
      const accounts = await provider.send('eth_requestAccounts', []);
      setAddress(accounts[0]);
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  }, [isConnecting]);

  return { address, error, connectWallet, isConnecting };
}