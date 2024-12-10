import React from 'react';
import { format } from 'date-fns';
import { CampaignProgress } from './CampaignProgress';
import { DonationForm } from './DonationForm';
import { CampaignOwner } from './CampaignOwner';
import { DonorsList } from './DonorsList';
import { WithdrawButton } from './WithdrawButton';
import { useWeb3 } from '../context/Web3Context';

export function CampaignCard({ campaign, index }) {
  const { address } = useWeb3();
  const isOwner = address?.toLowerCase() === campaign.owner.toLowerCase();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <img 
        src={campaign.image} 
        alt={campaign.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-1">
        <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
        
        <p className="text-gray-600 font-medium mb-4">{campaign.description}</p>

        <CampaignProgress 
          amountCollected={campaign.amountCollected} 
          target={campaign.target} 
        />

        <div className="flex justify-between text-sm mt-3">
          <div>
            <span className="text-gray-500">Ends on</span>
            <p className="font-medium">
              {format(campaign.deadline, 'PPP')}
            </p>
          </div>
          <div className="text-right">
            <CampaignOwner owner={campaign.owner} />
          </div>
        </div>
        
        <DonorsList 
          donators={campaign.donators} 
          donations={campaign.donations} 
        />
      </div>

      <div className="px-4 pb-4">
        {isOwner ? (
          <WithdrawButton 
            campaignIndex={index}
            campaign={campaign}
          />
        ) : (
          <DonationForm 
            campaignIndex={index} 
            campaign={campaign}
          />
        )}
      </div>
    </div>
  );
}
