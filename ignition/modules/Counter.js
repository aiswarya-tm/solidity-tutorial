const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CounterModule", (m) => {

  const lock = m.contract("CounterContract");

  return { lock };
});
