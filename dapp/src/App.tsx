import "./App.css";
import { useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import ConnectButton from "./components/ConnectWallet";
import DisconnectButton from "./components/DisconnectWallet";

const App = () => {
    // Constants
    const contractAddress: string = "KT1QMGSLynvwwSfGbaiJ8gzWHibTCweCGcu8";
    const rpcUrl: string = "https://ghostnet.ecadinfra.com";
    const Tezos: TezosToolkit = new TezosToolkit(rpcUrl);

    // State variables
    // const [storage, setStorage] = useState<number>(0);
    const [contract, setContract] = useState<any>(null);
    const [wallet, setWallet] = useState<any>(null);
    const [userAddress, setUserAddress] = useState<string>("");

    return (
        <div className="main-box">
            {userAddress ? (
                <div>
                    <p>UserAddress: {userAddress}</p>
                    <DisconnectButton
                        wallet={wallet}
                        setUserAddress={setUserAddress}
                        setWallet={setWallet}
                    />
                </div>
            ) : (
                <ConnectButton
                    rpcUrl={rpcUrl}
                    Tezos={Tezos}
                    setContract={setContract}
                    setWallet={setWallet}
                    setUserAddress={setUserAddress}
                    contractAddress={contractAddress}
                    wallet={wallet}
                />
            )}
        </div>
    );
};

export default App;
