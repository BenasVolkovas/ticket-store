import { Dispatch, SetStateAction, useEffect } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-dapp";
import { Button } from "@mantine/core";

type ButtonProps = {
    rpcUrl: string;
    Tezos: TezosToolkit;
    wallet: BeaconWallet | null;
    setWallet: Dispatch<SetStateAction<any>>;
    setUserAddress: Dispatch<SetStateAction<string>>;
};

const ConnectButton = ({
    rpcUrl,
    Tezos,
    wallet,
    setWallet,
    setUserAddress,
}: ButtonProps): JSX.Element => {
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
        const activeAccount = await beaconWallet.client.getActiveAccount();
        if (activeAccount) {
            const userAddress = await beaconWallet.getPKH();
            await setup(userAddress);
        }
    };

    useEffect(
        () => {
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
