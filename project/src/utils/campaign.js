export const isCampaignFunded = (amountCollected, target) => {
  return Number(amountCollected) >= Number(target);
};

export const calculateRemainingAmount = (target, amountCollected) => {
  return Math.max(0, Number(target) - Number(amountCollected));
};

export const isCampaignOwner = (address, campaignOwner) => {
  if (!address || !campaignOwner) return false;
  return address.toLowerCase() === campaignOwner.toLowerCase();
};