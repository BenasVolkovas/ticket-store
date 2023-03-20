import "./App.css";
import { useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import HeaderNavigation from "./components/HeaderNavigation";
import {
    AppShell,
    Navbar,
    Header,
    Footer,
    Title,
    Text,
    Button,
} from "@mantine/core";
import OffersPage from "./components/OffersPage";
import MintPage from "./components/MintPage";
import PortfolioPage from "./components/PortfolioPage";

enum Page {
    Offers,
    Mint,
    Portfolio,
}

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
    const [page, setPage] = useState<Page>(Page.Offers);

    return (
        <div>
            <AppShell
                padding="md"
                navbar={
                    <Navbar width={{ base: 300 }} p="xs">
                        <Navbar.Section m="xs">
                            <Button
                                fullWidth
                                color="red"
                                size="sm"
                                onClick={() => setPage(Page.Offers)}
                            >
                                offers
                            </Button>
                        </Navbar.Section>
                        <Navbar.Section m="xs">
                            <Button
                                fullWidth
                                color="red"
                                size="sm"
                                onClick={() => setPage(Page.Mint)}
                            >
                                mint
                            </Button>
                        </Navbar.Section>
                        <Navbar.Section m="xs">
                            <Button
                                fullWidth
                                color="red"
                                size="sm"
                                onClick={() => setPage(Page.Portfolio)}
                            >
                                portfolio
                            </Button>
                        </Navbar.Section>
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
                {page === Page.Offers ? (
                    <OffersPage />
                ) : page === Page.Mint ? (
                    <MintPage />
                ) : page === Page.Portfolio ? (
                    <PortfolioPage />
                ) : null}
            </AppShell>
        </div>
    );
};

export default App;
