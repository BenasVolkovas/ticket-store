import { useEffect, useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import HeaderNavigation from "./components/HeaderNavigation";
import { AppShell, Navbar, Header, Button, Text } from "@mantine/core";
import OffersPage from "./pages/OffersPage";
import MintPage from "./pages/MintPage";
import PortfolioPage from "./pages/PortfolioPage";
import { BigNumber } from "bignumber.js";

export enum Page {
    Offers,
    Mint,
    Portfolio,
}

export type Ticket = {
    [tokenId: string]: {
        name: string;
        imageUrl: string;
        quantity: BigNumber;
        user: string;
        price: BigNumber;
    };
};

const App = () => {
    // Constants
    const contractAddress: string = "KT1UhGB4eYXw7xZJaBNenuoynGzhK7ZxoiVh";
    const rpcUrl: string = "https://rpc.ghostnet.teztnets.xyz";
    const Tezos: TezosToolkit = new TezosToolkit(rpcUrl);

    // State variables
    // const [storage, setStorage] = useState<number>(0);
    const [contract, setContract] = useState<any>(null);
    const [wallet, setWallet] = useState<any>(null);
    const [userAddress, setUserAddress] = useState<string>("");
    const [page, setPage] = useState<Page>(Page.Offers);

    const initialSetup = async () => {
        // Creates contract instance
        const tezosContract = await Tezos.wallet.at(contractAddress);
        setContract(tezosContract);
    };

    useEffect(
        () => {
            initialSetup();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    return (
        <div>
            <AppShell
                padding="md"
                navbar={
                    <Navbar width={{ base: 150 }} p="xs">
                        <Navbar.Section>
                            <Button
                                fullWidth
                                color="red"
                                size="md"
                                onClick={() => setPage(Page.Offers)}
                            >
                                offers
                            </Button>
                        </Navbar.Section>
                        {userAddress && (
                            <>
                                <Navbar.Section mt="xs">
                                    <Button
                                        fullWidth
                                        color="red"
                                        size="md"
                                        onClick={() => setPage(Page.Mint)}
                                    >
                                        mint
                                    </Button>
                                </Navbar.Section>
                                <Navbar.Section mt="xs">
                                    <Button
                                        fullWidth
                                        color="red"
                                        size="md"
                                        onClick={() => setPage(Page.Portfolio)}
                                    >
                                        portfolio
                                    </Button>
                                </Navbar.Section>
                            </>
                        )}
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
                            setPage={setPage}
                        />
                    </Header>
                }
            >
                {!contract ? (
                    <Text>Loading...</Text>
                ) : page === Page.Offers ? (
                    <OffersPage
                        contract={contract}
                        userAddress={userAddress}
                        setPage={setPage}
                    />
                ) : page === Page.Mint ? (
                    <MintPage contract={contract} />
                ) : page === Page.Portfolio ? (
                    <PortfolioPage
                        contract={contract}
                        userAddress={userAddress}
                        setPage={setPage}
                    />
                ) : null}
            </AppShell>
        </div>
    );
};

export default App;
