import hre from "hardhat";

async function main() {
    const ethers = hre.ethers; // <-- get ethers from HRE

    const TodoList = await ethers.getContractFactory("/contracts/TodoList.sol:TodoList"); // contract name must match exactly
    const todo = await TodoList.deploy();
    await todo.deployed();

    console.log("TodoList deployed to:", todo.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
