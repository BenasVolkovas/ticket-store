import { useContext } from "react";
import ConnectButton from "./ConnectButton";
import DisconnectButton from "./DisconnectButton";
import { Title, Flex } from "@mantine/core";
import { AppContext } from "../AppContext";

const HeaderNavigation = () => {
    const { userAddress } = useContext(AppContext);

    return (
        <Flex justify="space-between" align="center" direction="row">
            <Title order={2}>ticket.store</Title>
            {userAddress ? <DisconnectButton /> : <ConnectButton />}
        </Flex>
    );
};

export default HeaderNavigation;
