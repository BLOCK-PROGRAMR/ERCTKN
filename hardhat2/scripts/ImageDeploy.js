async function main(){

    const [deployeraddress]=await ethers.getSigners();
    console.log("deployer address:"+deployeraddress.address);

    const Image=await ethers.getContractFactory("Image");

    const ImageConract=await Image.deploy();
    console.log("contract address:"+ImageConract.address);


}
main().then(()=>process.exit(0)).catch((err)=>{
  console.log("error:"+err);
  process.exit(0);
})