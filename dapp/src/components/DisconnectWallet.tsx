import React, { Dispatch, SetStateAction } from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";

interface ButtonProps {
    wallet: BeaconWallet | null;
    setUserAddress: Dispatch<SetStateAction<string>>;
    setWallet: Dispatch<SetStateAction<any>>;
}

const DisconnectButton = ({
    wallet,
    setUserAddress,
    setWallet,
}: ButtonProps): JSX.Element => {
    const disconnectWallet = async (): Promise<void> => {
        if (wallet) {
            await wallet.clearActiveAccount();
        }
        setUserAddress("");
        setWallet(null);
    };

    return (
        <div className="buttons">
            <button className="button" onClick={disconnectWallet}>
                Disconnect wallet
            </button>
        </div>
    );
};

export default DisconnectButton;
