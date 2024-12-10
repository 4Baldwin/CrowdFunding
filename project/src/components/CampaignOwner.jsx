import React from 'react';
import { shortenAddress } from '../utils/web3';

export function CampaignOwner({ owner }) {
  return (
    <div className="mb-4">
      <span className="text-gray-500 text-sm">Campaign Owner</span>
      <p className="font-medium">
        {shortenAddress(owner)}
      </p>
    </div>
  );
}