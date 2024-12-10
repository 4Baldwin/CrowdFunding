import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';
import { setupProvider, formatEther, parseEther } from '../utils/web3';
import { useWalletConnection } from '../hooks/useWalletConnection';

const Web3Context = createContext();

export function Web3Provider({ children }) {
  const { address, error: walletError, connectWallet, isConnecting } = useWalletConnection();
  const [contract, setContract] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const initContract = async () => {
      if (address) {
        try {
          await setupContract();
        } catch (error) {
          setError("Failed to initialize contract: " + error.message);
        }
      }
    };
    initContract();
  }, [address]);

  const setupContract = async () => {
    try {
      const provider = setupProvider();
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(contractInstance);
      return contractInstance;
    } catch (error) {
      setError("Error setting up contract: " + error.message);
      throw error;
    }
  };

  const getCampaigns = async () => {
    try {
      setLoading(true);
      setError('');
      
      let contractInstance = contract;
      if (!contractInstance) {
        contractInstance = await setupContract();
      }
      
      const campaigns = await contractInstance.getCampaigns();
      const parsedCampaigns = campaigns.map((campaign) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: formatEther(campaign.target),
        deadline: new Date(campaign.deadline.toNumber()),
        amountCollected: formatEther(campaign.amountCollected),
        image: campaign.image,
        donators: campaign.donators,
        donations: campaign.donations.map(d => formatEther(d)),
        withdrawn: campaign.withdrawn
      }));

      setCampaigns(parsedCampaigns);
      return parsedCampaigns;
    } catch (error) {
      setError("Error fetching campaigns: " + error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async (form) => {
    try {
      setLoading(true);
      setError('');
      
      let contractInstance = contract;
      if (!contractInstance) {
        contractInstance = await setupContract();
      }
      
      const { title, description, target, deadline, image } = form;
      
      const tx = await contractInstance.createCampaign(
        address,
        title,
        description,
        parseEther(target),
        new Date(deadline).getTime(),
        image
      );

      await tx.wait();
      await getCampaigns();
      return true;
    } catch (error) {
      setError("Error creating campaign: " + error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const donate = async (campaignId, amount) => {
    try {
      setLoading(true);
      setError('');
      
      let contractInstance = contract;
      if (!contractInstance) {
        contractInstance = await setupContract();
      }
      
      const tx = await contractInstance.donateToCampaign(campaignId, {
        value: parseEther(amount)
      });

      await tx.wait();
      await getCampaigns();
      return true;
    } catch (error) {
      setError("Error donating: " + error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const withdrawFunds = async (campaignId) => {
    try {
      setLoading(true);
      setError('');
      
      let contractInstance = contract;
      if (!contractInstance) {
        contractInstance = await setupContract();
      }
      
      const campaign = campaigns[campaignId];
      if (!campaign) {
        throw new Error("Campaign not found");
      }

      if (campaign.withdrawn) {
        throw new Error("Funds have already been withdrawn");
      }

      if (address.toLowerCase() !== campaign.owner.toLowerCase()) {
        throw new Error("Only campaign owner can withdraw funds");
      }

      const tx = await contractInstance.withdrawFunds(campaignId);
      await tx.wait();
      await getCampaigns();
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Web3Context.Provider value={{
      address,
      contract,
      connectWallet,
      createCampaign,
      getCampaigns,
      donate,
      withdrawFunds,
      campaigns,
      loading: loading || isConnecting,
      error: error || walletError
    }}>
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => useContext(Web3Context);