import { Dispatch, SetStateAction } from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { Button } from "@mantine/core";
import { Page } from "../App";

interface ButtonProps {
    wallet: BeaconWallet | null;
    setWallet: Dispatch<SetStateAction<any>>;
    userAddress: string;
    setUserAddress: Dispatch<SetStateAction<string>>;
    setPage: Dispatch<SetStateAction<any>>;
}

const DisconnectButton = ({
    wallet,
    setWallet,
    userAddress,
    setUserAddress,
    setPage,
}: ButtonProps): JSX.Element => {
    const disconnectWallet = async (): Promise<void> => {
        if (wallet) {
            await wallet.clearActiveAccount();
        }
        setUserAddress("");
        setWallet(null);
        setPage(Page.Offers);
    };

    return (
        <Button
            color="blue"
            size="md"
            onClick={disconnectWallet}
        >{`${userAddress.slice(0, 7)}...${userAddress.slice(
            userAddress.length - 4,
            userAddress.length
        )}`}</Button>
    );
};

export default DisconnectButton;
