import React, { useState, useEffect } from "react";
import { TezosToolkit } from "@taquito/taquito";

export const AppContext = React.createContext<any>(null);

export function AppProvider({ children }: any) {
    const [contract, setContract] = useState<any>(null);
    const [wallet, setWallet] = useState<any>(null);
    const [userAddress, setUserAddress] = useState<string>("");

    const contractAddress: string = "KT1UhGB4eYXw7xZJaBNenuoynGzhK7ZxoiVh";
    const rpcUrl: string = "https://rpc.ghostnet.teztnets.xyz";
    const Tezos: TezosToolkit = new TezosToolkit(rpcUrl);

    useEffect(
        () => {
            const initialSetup = async () => {
                // Creates contract instance
                const tezosContract = await Tezos.wallet.at(contractAddress);
                setContract(tezosContract);
            };

            initialSetup();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const value = {
        contractAddress,
        rpcUrl,
        Tezos,
        contract,
        setContract,
        wallet,
        setWallet,
        userAddress,
        setUserAddress,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
