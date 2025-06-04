async function main() {
  const [deployer] = await ethers.getSigners();
  const RealEstateToken = await ethers.getContractFactory("RealEstateToken");
  const token = await RealEstateToken.deploy(1000000); // Exemplo: 1.000.000 de tokens
  await token.deployed();

  console.log("RealEstateToken deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });