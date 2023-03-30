import { useContext } from "react";
import { Button } from "@mantine/core";
import { AppContext } from "../AppContext";

const DisconnectButton = () => {
    const { wallet, setWallet, userAddress, setUserAddress } =
        useContext(AppContext);

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
