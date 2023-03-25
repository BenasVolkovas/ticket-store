import { Dispatch, SetStateAction } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import ConnectButton from "./ConnectButton";
import DisconnectButton from "./DisconnectButton";
import { Title } from "@mantine/core";

type HeaderProps = {
    rpcUrl: string;
    Tezos: TezosToolkit;
    wallet: BeaconWallet | null;
    setWallet: Dispatch<SetStateAction<any>>;
    userAddress: string;
    setUserAddress: Dispatch<SetStateAction<string>>;
    setPage: Dispatch<SetStateAction<any>>;
};

const HeaderNavigation = ({
    rpcUrl,
    Tezos,
    wallet,
    setWallet,
    userAddress,
    setUserAddress,
    setPage,
}: HeaderProps): JSX.Element => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Title order={2}>ticket.store</Title>
            {userAddress ? (
                <DisconnectButton
                    wallet={wallet}
                    setWallet={setWallet}
                    userAddress={userAddress}
                    setUserAddress={setUserAddress}
                    setPage={setPage}
                />
            ) : (
                <ConnectButton
                    rpcUrl={rpcUrl}
                    Tezos={Tezos}
                    wallet={wallet}
                    setWallet={setWallet}
                    setPage={setPage}
                    setUserAddress={setUserAddress}
                />
            )}
        </div>
    );
};

export default HeaderNavigation;
