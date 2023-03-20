import {
    Text,
    TextInput,
    NumberInput,
    Button,
    Title,
    Notification,
} from "@mantine/core";
import { useState } from "react";

const MintPage = () => {
    const [showNotification, setShowNotification] = useState<boolean>(false);

    const mintNewTicketGroup = async () => {
        setShowNotification(true);
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
            />
            <TextInput
                label="symbol"
                placeholder="TMT"
                required
                withAsterisk={false}
                m="xs"
            />
            <NumberInput
                label="quantity"
                placeholder="1000"
                required
                withAsterisk={false}
                m="xs"
            />
            <TextInput
                label="image url"
                placeholder="ipfs://..."
                required
                withAsterisk={false}
                m="xs"
            />

            <Button size="sm" m="xs" onClick={() => mintNewTicketGroup()}>
                submit
            </Button>

            {showNotification && (
                <Notification
                    title="mint notification"
                    onClose={() => setShowNotification(false)}
                >
                    ticket group is minting...
                </Notification>
            )}
        </div>
    );
};

export default MintPage;
