import "./App.css";
import { useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import HeaderNavigation from "./components/HeaderNavigation";
import { AppShell, Navbar, Header, Footer, Title, Text } from "@mantine/core";

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
        <div>
            <AppShell
                padding="md"
                navbar={
                    <Navbar width={{ base: 300 }} height={500} p="xs">
                        fields
                    </Navbar>
                }
                header={
                    <Header height={60} p="xs">
                        <HeaderNavigation
                            rpcUrl={rpcUrl}
                            Tezos={Tezos}
                            wallet={wallet}
                            setWallet={setWallet}
                            userAddress={userAddress}
                            setUserAddress={setUserAddress}
                            contractAddress={contractAddress}
                            setContract={setContract}
                        />
                    </Header>
                }
            >
                <Text>default text</Text>
            </AppShell>
        </div>
    );
};

export default App;
