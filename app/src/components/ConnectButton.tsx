import { useContext, useEffect } from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-dapp";
import { Button } from "@mantine/core";
import { AppContext } from "../AppContext";

const ConnectButton = () => {
    const { rpcUrl, Tezos, wallet, setWallet, setUserAddress } =
        useContext(AppContext);

    const setup = async (userAddress: string): Promise<void> => {
        setUserAddress(userAddress);
    };

    const connectWallet = async (): Promise<void> => {
        try {
            if (!wallet) return;
            await wallet.requestPermissions({
                network: {
                    type: NetworkType.GHOSTNET,
                    rpcUrl: rpcUrl,
                },
            });

            // Get user's address
            const userAddress = await wallet.getPKH();
            await setup(userAddress);

            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(
        () => {
            const initialSetup = async () => {
                // Creates a wallet instance
                const beaconWallet = new BeaconWallet({
                    name: "Dapp",
                    preferredNetwork: NetworkType.GHOSTNET,
                    disableDefaultEvents: false,
                });
                Tezos.setWalletProvider(beaconWallet);
                setWallet(beaconWallet);

                // Checks if wallet was connected before
                const activeAccount =
                    await beaconWallet.client.getActiveAccount();
                if (activeAccount) {
                    const userAddress = await beaconWallet.getPKH();
                    await setup(userAddress);
                }
            };

            initialSetup();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    return (
        <Button color="blue" size="md" onClick={connectWallet}>
            connect wallet
        </Button>
    );
};

export default ConnectButton;
