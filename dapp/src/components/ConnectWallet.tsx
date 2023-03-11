import { Dispatch, SetStateAction, useEffect } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-dapp";

type ButtonProps = {
    rpcUrl: string;
    Tezos: TezosToolkit;
    setContract: Dispatch<SetStateAction<any>>;
    setWallet: Dispatch<SetStateAction<any>>;
    setUserAddress: Dispatch<SetStateAction<string>>;
    contractAddress: string;
    wallet: BeaconWallet;
};

const ConnectButton = ({
    rpcUrl,
    Tezos,
    setContract,
    setWallet,
    setUserAddress,
    contractAddress,
    wallet,
}: ButtonProps): JSX.Element => {
    const setup = async (userAddress: string): Promise<void> => {
        // Creates contract instance
        const contract = await Tezos.wallet.at(contractAddress);
        setContract(contract);

        setUserAddress(userAddress);
    };

    const connectWallet = async (): Promise<void> => {
        try {
            await wallet.requestPermissions({
                network: {
                    type: NetworkType.GHOSTNET,
                    rpcUrl: rpcUrl,
                },
            });

            // Get user's address
            const userAddress = await wallet.getPKH();
            await setup(userAddress);
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
        <div className="buttons">
            <button className="button" onClick={connectWallet}>
                Connect wallet
            </button>
        </div>
    );
};

export default ConnectButton;
