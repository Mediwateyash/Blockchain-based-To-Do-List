async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Todo = await ethers.getContractFactory("TodoList");
  const todo = await Todo.deploy();
  await todo.deployed();

  console.log("TodoList deployed to:", todo.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});