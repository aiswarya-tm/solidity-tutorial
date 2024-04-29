const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Counter contract", function () {
  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const counterContract = await ethers.deployContract("CounterContract");

    // Fixtures can return anything you consider useful for your tests
    return { counterContract, owner, addr1, addr2 };
  }

  it("read the values from the contract", async function () {
    const { counterContract } = await loadFixture(deployTokenFixture);

    const counter = await counterContract.counter();
    expect(counter.toString()).to.equal("1");
  });

  it("Should increment the value of counter", async function () {
    const { counterContract, owner, addr1, addr2 } = await loadFixture(
      deployTokenFixture
    );

    await counterContract.increment();
    const counter = await counterContract.counter();
    expect(counter.toString()).to.equal("2");
  });

  it("Should decrement the value of counter when counter value is already 0- it fails", async function () {
    const { counterContract, owner, addr1, addr2 } = await loadFixture(
      deployTokenFixture
    );
    try{
        await counterContract.decrement(); 
    }catch(err){
        const counter = await counterContract.counter();
        expect(counter.toString()).to.equal("1");
        expect(err.message).includes("Cannot decrement further!!!");
    }
    
  });

  it("Should decrement the value of counter", async function () {
    const { counterContract, owner, addr1, addr2 } = await loadFixture(
      deployTokenFixture
    );
    await counterContract.increment();
    const counter = await counterContract.counter();
    expect(counter.toString()).to.equal("2");
    await counterContract.decrement();
    const counterNew = await counterContract.counter();
    expect(counterNew.toString()).to.equal("1");
    
  });
});
