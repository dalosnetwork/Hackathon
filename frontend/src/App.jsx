import { useState } from "react";

// npm ile ethers kütüphanesini indirmeniz gereklidir
import { ethers } from "ethers";

function App() {

  /* TERMİNALDEN "ethers" KÜTÜPHANESİNİ İNDİRMEYİ UNUTMAYIN
  FONKSYİON İSİMLERİNİ KENDİ KONRTATINIZDAKİ FONKSİYONLARLA DEĞİŞMEYİ UNUTMAYIN
  DEBUG VE ERROR HANDLE İÇİN BOL BOL console.log() YAZMAYI UNUTMAYIN
  */

  const [userAddress, setUserAddress] = useState("");
  const [signer, setSigner] = useState("");

  const contractAddress = ""; //KONTRATIMIZIN ADRESİ
  const contractAbi = []; // KONTRATIMIZIN ABI'ı


  // CÜZDAN BAĞLAMA FONKSİYONU
  const connectWallet = async () => {

    // Browserda provider var mı yok mu kontrol ediyoruz
    if (!window.ethereum) {
      alert("MetaMask not found!");
      return;
    }

    try {

      // providerımız için Blockchain ile bağlantıyı gerçekleştirecek bir nesne oluşturuyoruz
      const provider = new ethers.BrowserProvider(window.ethereum);

      // provider nesnemizden getSigner() ile kontratı imzalayacak hesabı seçiyoruz
      const signer = await provider.getSigner();

      // eğer yardımcı olursa imzalayacak hesabın adresini getAddress() ile seçebilirsiniz
      const address = await signer.getAddress();

      // front-end state olarak belirliyoruz uygulamamızda kullanmak için
      setUserAddress(address);
      setSigner(signer);
      
      console.log("Wallet connected:", address);
      
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };


  // Kontratınızda bulunan bir fonksiyon
  const getStakingDetails = async () => {
    
    // Kontrat ile etkileşime gelecek bir nesne oluşturuyoruz hemen hemen her nesne aynıdır
    let contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    
    try {
      console.log("User Address:", userAddress);
      
      // oluşturduğumuz nesne üzerinden kontratımızdaki 
      // bir fonksiyonu istediği parametreler ile çağırıyoruz
      const details = await contract.getStakingDetails(userAddress);
      console.log("Raw Details:", details);
      
    } catch (error) {
      console.error("Error fetching staking details:", error);
    }
  };
  
  // Kontratınızda bulunan bir fonksiyon
  const createStake = async () => {
    
    // Kontrat ile etkileşime gelecek bir nesne oluşturuyoruz hemen hemen her nesne aynıdır
    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
  
    try {
      
      // kontratımızda bulunan bir transaction fonksiyonunu çağırıyoruz çağırıyoruz
      // ve içine fonksiyonumuzun istediği parametreleri yerleştiriyoruz
      const tx = await contract.stake(
        100000000000,
        4263546872354
      );
  
      console.log("Transaction Sent:", tx);
      // transactionun blockchain tarafından onaylanmasını bekliyoruz biraz uzun sürebilir
      await tx.wait();
      console.log("Transaction Mined:", tx);
  
    } catch (error) {
      console.error("Error creating stake:", error.reason || error.message);
    }
  };

  const raiseStaking = async () => {

    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );

    try {
      const tx = await contract.raiseStaking(
        100000005555,
        3453467234234
      );
  
      console.log("Transaction Sent:", tx);
      await tx.wait();
      console.log("Transaction Mined:", tx);
  
    } catch (error) {
      console.error("Error raising staking:", error.reason || error.message);
    }
  };
  
  

  return (
    <div className="text-center">
      <h1>Kapsül Teknoloji</h1>
      <button className="mb-3" onClick={connectWallet}>Cüzdan Bağla</button>
      {userAddress && <p>Cüzdan Adresi: {userAddress}</p>}

      <div className="text-center gap-3 d-flex justify-content-center">
        <button className="mb-3" onClick={()=>getStakingDetails()}>Get Details</button> 
        <button className="mb-3" onClick={()=>createStake()}>Stake</button> 
        <button className="mb-3" onClick={()=>raiseStaking()}>Raise Stake</button>
      </div>
    </div>
  );
}

export default App;
