import React from 'react';
import {HiOutlineStatusOnline} from 'react-icons/hi'

function App() {
  const [walletExists, setWalletExists] = React.useState(false);
  const [walletAddress, setWalletAddress] = React.useState(null);

  React.useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletExists();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  const checkIfWalletExists = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");
          setWalletExists(true)
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const disconnectWallet = async () => {
    setWalletAddress(null)
  }

  if(walletAddress){
  return (<div className="container">
      <nav>
        <div className='phantom-status-container'>
          <button onClick={disconnectWallet}>
            Disconnect
          </button>
        </div>
      </nav>
      <div className='body'>
        <p>Connected to:</p>
      <p>
      {walletAddress}
      </p>
      </div>
      
    </div>)
  }

  return (
    <div className="container">
      <nav>
        <div className='phantom-status-container'>
          <HiOutlineStatusOnline size="24px" color="green" />
          <p>Phantom wallet detected</p>
        </div>
      </nav>
      <div className='body'>
        <button onClick={connectWallet} className='connect-btn'>
          Connect
        </button>
      </div>
    </div>
  );
}

export default App;
