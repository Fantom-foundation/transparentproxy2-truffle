const Box = artifacts.require("Box");
const MyProxyAdmin = artifacts.require("MyProxyAdmin");
const MyProxy = artifacts.require("MyProxy"); 

module.exports = async (deployer) => {
    await deployer.deploy(Box);
    const box = await Box.deployed();

    await deployer.deploy(MyProxyAdmin);
    const myProxyAdmin = await MyProxyAdmin.deployed();

    await deployer.deploy(MyProxy, box.address, myProxyAdmin.address, "0x");
    const myProxy = await MyProxy.deployed();

    const myProxy2 = await Box.at(myProxy.address);
    await myProxy2.initialize(100);
};