import React from 'react';
import { isCampaignFunded } from '../utils/campaign';

export function CampaignProgress({ amountCollected, target }) {
  const progress = (Number(amountCollected) / Number(target)) * 100;
  const funded = isCampaignFunded(amountCollected, target);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Progress</span>
        <span className="font-medium">{progress.toFixed(2)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${funded ? 'bg-green-600' : 'bg-blue-600'}`}
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
      
      <div className="flex justify-between text-sm">
        <div>
          <span className="text-gray-500">Raised</span>
          <p className="font-medium">{amountCollected} ETH</p>
        </div>
        <div className="text-right">
          <span className="text-gray-500">Target</span>
          <p className="font-medium">{target} ETH</p>
        </div>
      </div>

    </div>
  );
}