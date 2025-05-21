async function main() {
  const CasaToken = await ethers.getContractFactory("CasaToken");
  const casaToken = await CasaToken.deploy();
  await casaToken.deployed();

  console.log("CasaToken deployed to:", casaToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
