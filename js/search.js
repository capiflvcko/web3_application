// Import necessary dependencies
import Web3 from 'web3';
import { BRC20Token } from './BRC20Token.js';
import { PSBTMarketplace } from './PSBTMarketplace.js';

// Get the search bar and search button elements
const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');

// Add event listener to search button
searchButton.addEventListener('click', async () => {
  // Get the user input from the search bar
  const userInput = searchBar.value;

  // Initialize Web3 and connect to the Bitcoin network
  const web3 = new Web3('https://bitcoin.network');

  // Initialize the BRC20Token and PSBTMarketplace classes
  const brc20Token = new BRC20Token(web3);
  const psbtMarketplace = new PSBTMarketplace(web3);

  // Search for BRC-20 tokens that correspond to the inputted university name
  const searchResults = await brc20Token.search(userInput);

  // Display each result in an easy-to-read format
  searchResults.forEach(result => {
    const resultElement = document.createElement('div');
    resultElement.innerHTML = `
      <h3>${result.name}</h3>
      <p>Location: ${result.location}</p>
      <p>Other data: ${result.otherData}</p>
    `;
    document.body.appendChild(resultElement);
  });
});