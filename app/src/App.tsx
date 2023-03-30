import { useState, useContext } from "react";
import HeaderNavigation from "./components/HeaderNavigation";
import { AppShell, Navbar, Header, Button, Text } from "@mantine/core";
import OffersPage from "./pages/OffersPage";
import MintPage from "./pages/MintPage";
import PortfolioPage from "./pages/PortfolioPage";
import { AppContext } from "./AppContext";

export enum Page {
    Offers,
    Mint,
    Portfolio,
}

const App = () => {
    const { contract, userAddress } = useContext(AppContext);

    const [page, setPage] = useState<Page>(Page.Offers);

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
                        <HeaderNavigation />
                    </Header>
                }
            >
                {!contract ? (
                    <Text>loading...</Text>
                ) : page === Page.Offers ? (
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
