import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import { CampaignCard } from '../components/CampaignCard';
import { ConnectWallet } from '../components/ConnectWallet';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function Home() {
  const { campaigns, getCampaigns, address, loading, error } = useWeb3();

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (address) {
        try {
          await getCampaigns();
        } catch (error) {
          console.error("Failed to fetch campaigns:", error);
        }
      }
    };
    fetchCampaigns();
  }, [address]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Bar */}
        <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Active Campaigns</h1>
            {address ? (
              <>
                <Link
                  to="/create"
                  className="bg-green-600 font-bold text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-500"
                >
                  Create Campaign
                </Link>
              </>
            ) : (
              <ConnectWallet />
            )}
          </div>
        </div>

        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}

        {address ? (
          loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : campaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign, index) => (
                <CampaignCard key={index} campaign={campaign} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-xl text-gray-600">
                No campaigns found. Create your first campaign!
              </h2>
            </div>
          )
        ) : (
          <div className="text-center py-20">
            <h2 className="text-xl text-gray-600">
              Please connect your wallet to view campaigns
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
