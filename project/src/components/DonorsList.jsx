import React from 'react';
import { shortenAddress } from '../utils/web3';

export function DonorsList({ donators, donations }) {
  if (!donators.length) {
    return (
      <div className="">
        <h4 className="text-sm font-medium text-gray-500">Donors</h4>
        <p className="text-sm text-gray-600">No donations yet.</p>
      </div>
    );
  }

  return (
    <div className="">
      <span className="text-sm  text-gray-500">Recent Donors</span>
      <div className=" max-h-40 overflow-y-auto">
        {donators.map((donor, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span className="font-medium">{shortenAddress(donor)}</span>
            
            <span className="font-medium">{donations[index]} ETH</span>
          </div>
        ))}
      </div>
    </div>
  );
}