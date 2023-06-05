// Import necessary dependencies
import Web3 from 'web3';
import { BRC20Token } from './brc20_token.js';
import { PSBTMarketplace } from './psbt_marketplace.js';

// Define the DetailedView class
export class DetailedView {
  constructor(universityData) {
    this.universityData = universityData;
    this.web3 = new Web3(Web3.givenProvider);
    this.brc20Token = new BRC20Token(this.web3);
    this.psbtMarketplace = new PSBTMarketplace(this.web3);
  }

  // Method to display the university data in the DetailedView
  displayUniversityData() {
    const universityName = document.getElementById('university-name');
    const universityLocation = document.getElementById('university-location');
    const foundingDate = document.getElementById('founding-date');
    const notableAlumni = document.getElementById('notable-alumni');
    const academicStrengths = document.getElementById('academic-strengths');

    universityName.textContent = this.universityData.name;
    universityLocation.textContent = this.universityData.location;
    foundingDate.textContent = this.universityData.foundingDate;
    notableAlumni.textContent = this.universityData.notableAlumni;
    academicStrengths.textContent = this.universityData.academicStrengths;
  }

  // Method to handle the creation of a new BRC-20 token with inscribed data
  handleInscription() {
    const inscribeDataButton = document.getElementById('inscribe-data-button');
    inscribeDataButton.addEventListener('click', () => {
      // Navigate to the InscribeData page
      window.location.href = '/web3_application/inscribe_data.html';
    });

    const confirmInscriptionButton = document.getElementById('confirm-inscription-button');
    confirmInscriptionButton.addEventListener('click', async () => {
      // Get the inscribed data from the user input
      const nameInput = document.getElementById('name-input');
      const locationInput = document.getElementById('location-input');
      const otherInput = document.getElementById('other-input');
      const inscribedData = {
        name: nameInput.value,
        location: locationInput.value,
        other: otherInput.value
      };

      // Create the new BRC-20 token with the inscribed data
      const token = await this.brc20Token.createToken(inscribedData);

      // Inscribe the token onto the Bitcoin network using the PSBT-based trustless marketplace
      await this.psbtMarketplace.inscribeToken(token);

      // Navigate back to the Main Page
      window.location.href = '/web3_application/main_page.html';
    });
  }
}