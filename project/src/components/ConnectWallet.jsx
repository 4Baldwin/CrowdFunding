import React from 'react';
import { useWeb3 } from '../context/Web3Context';
import { shortenAddress } from '../utils/web3';
import { LoadingSpinner } from './LoadingSpinner';

export function ConnectWallet() {
  const { connectWallet, address, error, loading } = useWeb3();

  return (
    <div>
      <button
        onClick={connectWallet}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:bg-blue-400"
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <span>{address ? shortenAddress(address) : 'Connect MetaMask'}</span>
        )}
      </button>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}