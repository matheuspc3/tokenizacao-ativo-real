const { expect } = require("chai");

describe("CasaToken", function () {
  it("Deve atribuir todos os tokens ao deployer", async function () {
    const [owner] = await ethers.getSigners();
    const CasaToken = await ethers.getContractFactory("CasaToken");
    const casaToken = await CasaToken.deploy();
    await casaToken.deployed();

    const ownerBalance = await casaToken.balanceOf(owner.address);
    expect(await casaToken.totalSupply()).to.equal(ownerBalance);
  });
});
