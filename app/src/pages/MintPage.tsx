import { TextInput, NumberInput, Button, Title } from "@mantine/core";
import { useState, useContext } from "react";
import { bytes, nat } from "../types";
import { char2Bytes } from "@taquito/utils";
import BigNumber from "bignumber.js";
import { AppContext } from "../AppContext";
import { notifications } from "@mantine/notifications";

const MintPage = () => {
    const { contract } = useContext(AppContext);

    const [name, setName] = useState<string>("");
    const [symbol, setSymbol] = useState<string>("");
    const [quantity, setQuantity] = useState<number | undefined>(undefined);
    const [imageUrl, setImageUrl] = useState<string>("");

    const mintNewTicketGroup = async () => {
        // Validate input
        if (!quantity) {
            notifications.show({
                title: "quantity is required!",
                message: "🎫",
            });
            return;
        }

        try {
            // MINT in contract
            const mintOperation = await contract.methods
                .mint(
                    new BigNumber(quantity) as nat,
                    char2Bytes(name!) as bytes,
                    char2Bytes(symbol!) as bytes,
                    char2Bytes(imageUrl) as bytes
                )
                .send();

            notifications.show({
                title: "minting ticket group...",
                message: "🎫",
                loading: true,
                autoClose: false,
            });

            // Wait for confirmation
            await mintOperation.confirmation(3);

            // Update values and notification
            notifications.clean();
            notifications.show({
                title: "ticket group minted successfully!",
                message: "🎫",
                color: "green",
            });
            setName("");
            setSymbol("");
            setQuantity(undefined);
            setImageUrl("");
        } catch (error) {
            notifications.show({
                title: "error occured!",
                message: "⚠️",
                color: "red",
            });
        }
    };

    return (
        <div>
            <Title m="xs">mint new ticket group</Title>
            <TextInput
                label="name"
                placeholder="tezos meetup ticket"
                required
                withAsterisk={false}
                m="xs"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
            />
            <TextInput
                label="symbol"
                placeholder="TMT"
                required
                withAsterisk={false}
                m="xs"
                value={symbol}
                onChange={(e) => setSymbol(e.currentTarget.value)}
            />
            <NumberInput
                label="quantity"
                placeholder="1000"
                required
                withAsterisk={false}
                m="xs"
                value={quantity}
                onChange={(newNum) => setQuantity(newNum ? newNum : undefined)}
                min={1}
            />
            <TextInput
                label="image url"
                placeholder="ipfs://..."
                required
                withAsterisk={false}
                m="xs"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.currentTarget.value)}
            />

            <Button size="sm" m="xs" onClick={() => mintNewTicketGroup()}>
                submit
            </Button>
        </div>
    );
};

export default MintPage;
