import { Dispatch, SetStateAction } from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { Button } from "@mantine/core";

interface ButtonProps {
    wallet: BeaconWallet | null;
    setWallet: Dispatch<SetStateAction<any>>;
    userAddress: string;
    setUserAddress: Dispatch<SetStateAction<string>>;
}

const DisconnectButton = ({
    wallet,
    setWallet,
    userAddress,
    setUserAddress,
}: ButtonProps): JSX.Element => {
    const disconnectWallet = async (): Promise<void> => {
        if (wallet) {
            await wallet.clearActiveAccount();
        }
        setUserAddress("");
        setWallet(null);
        window.location.reload();
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
