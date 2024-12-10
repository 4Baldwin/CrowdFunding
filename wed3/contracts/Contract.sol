// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline; 
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        bool withdrawn; 
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;

    // สร้าง Campaign ใหม่
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,  // เก็บเวลาแต่ไม่ใช้ในการตรวจสอบการถอน
        string memory _image
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");

        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.withdrawn = false;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    // บริจาคเงินให้ Campaign
    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];

        require(block.timestamp < campaign.deadline, "The campaign has ended.");

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        campaign.amountCollected += amount;
    }

    // ดึงข้อมูล Donators
    function getDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    // ดึงข้อมูล Campaign ทั้งหมด
    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }

        return allCampaigns;
    }

    // ถอนเงินที่ระดมทุนได้ (ไม่มีเวลาจำกัด)
    function withdrawFunds(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];

        require(msg.sender == campaign.owner, "Only the owner can withdraw funds.");
        require(campaign.amountCollected >= campaign.target, "Funding goal not reached.");
        require(!campaign.withdrawn, "Funds have already been withdrawn.");

        uint256 amount = campaign.amountCollected;
        campaign.withdrawn = true;

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");
        require(sent, "Failed to send Ether.");
    }
}
