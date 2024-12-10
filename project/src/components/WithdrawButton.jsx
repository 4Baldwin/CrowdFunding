import React from 'react';
import { useWeb3 } from '../context/Web3Context';
import { LoadingSpinner } from './LoadingSpinner';
import { isCampaignFunded } from '../utils/campaign';

export function WithdrawButton({ campaignIndex, campaign }) {
  const { withdrawFunds, loading, error } = useWeb3();
  
  const canWithdraw = campaign.amountCollected >= campaign.target && !campaign.withdrawn;

  const handleWithdraw = async () => {
    if (!canWithdraw) {
      alert("You cannot withdraw funds because the funding goal has not been reached or funds have already been withdrawn.");
      return;
    }

    try {
      await withdrawFunds(campaignIndex);
    } catch (error) {
      console.error('Error withdrawing funds:', error);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleWithdraw}
        disabled={loading || !canWithdraw}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-red-600 flex items-center justify-center"
      >
        {loading ? <LoadingSpinner /> : 'Withdraw Funds'}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}