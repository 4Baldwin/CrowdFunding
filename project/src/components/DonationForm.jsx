import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { LoadingSpinner } from './LoadingSpinner';
import { calculateRemainingAmount, isCampaignFunded } from '../utils/campaign';

export function DonationForm({ campaignIndex, campaign }) {
  const { donate, loading, error } = useWeb3();
  const [amount, setAmount] = useState('');
  const [localError, setLocalError] = useState('');

  const remainingAmount = calculateRemainingAmount(campaign.target, campaign.amountCollected);
  const funded = isCampaignFunded(campaign.amountCollected, campaign.target);

  const handleDonate = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    if (!amount || Number(amount) <= 0) {
      setLocalError('Please enter a valid amount');
      return;
    }

    if (Number(amount) > remainingAmount) {
      setLocalError(`Maximum donation amount is ${remainingAmount} ETH`);
      return;
    }

    try {
      await donate(campaignIndex, amount);
      setAmount('');
    } catch (error) {
      setLocalError(error.message);
    }
  };

  if (funded) {
    return (
      <div className="pb-3 text-green-600 text-center text-xl font-medium self-end">
        Campaign successfully funded!
      </div>
    );
  }

  return (
    <form onSubmit={handleDonate} className=" space-y-2">
      <div className="text-sm text-gray-600 ">
        Remaining to reach target: {remainingAmount.toFixed(4)} ETH
      </div>
      <input
        type="number"
        step="0.0001"
        max={remainingAmount}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in ETH"
        className="w-full px-3 py-2 border rounded-md"
        disabled={loading}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        disabled={loading || funded}
      >
        {loading ? <LoadingSpinner /> : 'Donate'}
      </button>
      {(error || localError) && (
        <p className="text-red-500 text-sm">{error || localError}</p>
      )}
    </form>
  );
}