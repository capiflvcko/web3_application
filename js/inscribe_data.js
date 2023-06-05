// Import necessary dependencies
import Web3 from 'web3';
import { BRC20Token } from './BRC20Token';
import { PSBTMarketplace } from './PSBTMarketplace';

// Define function to handle inscription of new BRC-20 tokens
function inscribeData() {
  // Get user input for university information
  const universityName = document.getElementById('universityName').value;
  const universityLocation = document.getElementById('universityLocation').value;
  const foundingDate = document.getElementById('foundingDate').value;
  const notableAlumni = document.getElementById('notableAlumni').value;
  const academicStrengths = document.getElementById('academicStrengths').value;

  // Create new BRC-20 token with inscribed data
  const newToken = new BRC20Token(universityName, universityLocation, foundingDate, notableAlumni, academicStrengths);

  // Connect to Web3 provider and instantiate PSBT-based trustless marketplace
  const web3 = new Web3(Web3.givenProvider);
  const marketplace = new PSBTMarketplace(web3);

  // Create new transaction to inscribe BRC-20 token onto Bitcoin network
  const transaction = marketplace.createTransaction(newToken);

  // Display transaction details to user for confirmation
  console.log(`Transaction created: ${transaction}`);
}

// Export function for use in other modules
export { inscribeData };