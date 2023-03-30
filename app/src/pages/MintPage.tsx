import {
    TextInput,
    NumberInput,
    Button,
    Title,
    Notification,
} from "@mantine/core";
import { useState } from "react";
import { bytes, nat } from "../types";
import { char2Bytes } from "@taquito/utils";
import BigNumber from "bignumber.js";

type Props = {
    contract: any;
};

const MintPage = ({ contract }: Props) => {
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [notificationMessage, setNotificationMessage] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [symbol, setSymbol] = useState<string>("");
    const [quantity, setQuantity] = useState<number | undefined>(undefined);
    const [imageUrl, setImageUrl] = useState<string>("");

    const mintNewTicketGroup = async () => {
        try {
            setNotificationMessage("minting ticket group...");
            setShowNotification(true);

            // MINT in contract
            if (!quantity) {
                setNotificationMessage("quantity is required");
                return;
            }

            const mintOperation = await contract.methods
                .mint(
                    new BigNumber(quantity) as nat,
                    char2Bytes(name!) as bytes,
                    char2Bytes(symbol!) as bytes,
                    char2Bytes(imageUrl) as bytes
                )
                .send();

            await mintOperation.confirmation(3);
            setNotificationMessage("ticket group minted successfully");

            setName("");
            setSymbol("");
            setQuantity(undefined);
            setImageUrl("");
        } catch (error) {
            console.log(error);
            setNotificationMessage("not connected to wallet");
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

            {showNotification && (
                <Notification
                    title="mint notification"
                    onClose={() => setShowNotification(false)}
                >
                    {notificationMessage}
                </Notification>
            )}
        </div>
    );
};

export default MintPage;
