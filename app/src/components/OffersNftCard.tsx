import { useContext, useState } from "react";
import {
    Card,
    Image,
    Text,
    Badge,
    Button,
    Group,
    NumberInput,
    Grid,
} from "@mantine/core";
import { BigNumber } from "bignumber.js";
import { address, nat } from "../types";
import { AppContext } from "../AppContext";
import { notifications } from "@mantine/notifications";

type Props = {
    tokenId: number;
    name: string;
    imageUrl: string;
    quantity: BigNumber;
    user: string;
    price: BigNumber;
};

const OffersNftCard = ({
    tokenId,
    name,
    imageUrl,
    quantity,
    user,
    price,
}: Props) => {
    const { contract } = useContext(AppContext);

    const [buyQuantity, setBuyQuantity] = useState<number | undefined>(
        undefined
    );

    const buy = async () => {
        if (buyQuantity) {
            try {
                const buyOperation = await contract.methods
                    .buy(
                        new BigNumber(tokenId) as nat,
                        new BigNumber(buyQuantity) as nat,
                        user as address
                    )
                    .send({
                        amount: price
                            .times(new BigNumber(buyQuantity))
                            .toNumber(),
                        mutez: true,
                    });

                notifications.show({
                    title: "buy operation processing...",
                    message: "🎫",
                    loading: true,
                    autoClose: false,
                });

                // Wait for confirmation
                await buyOperation.confirmation(3);

                notifications.clean();
                notifications.show({
                    title: "ticket bought successfully!",
                    message: "🎫",
                    color: "green",
                });
            } catch (error) {
                notifications.show({
                    title: "error occured!",
                    message: "⚠️",
                    color: "red",
                });
            }
        }
    };

    return (
        <Card
            shadow="sm"
            p="md"
            m="md"
            withBorder
            sx={{ width: "400px", flexGrow: 1, flexShrink: 0 }}
        >
            <Card.Section>
                <Image src={imageUrl} height={150} alt={tokenId.toString()} />
            </Card.Section>
            <Card.Section mt="xs" mb="xs" ml="0" mr="0">
                <Group position="apart">
                    <Text fz="lg" fw={500}>
                        {name}
                    </Text>
                    <Badge size="md">{price.div(1000000).toString()} ꜩ</Badge>
                </Group>
                <Text>for sale: {quantity.toString()}</Text>
            </Card.Section>
            <Card.Section>
                <Grid grow ml="0" mr="0">
                    <Grid.Col span={1} pr="0">
                        <NumberInput
                            value={buyQuantity}
                            onChange={(v: number) => setBuyQuantity(v)}
                            placeholder={"quantity"}
                            min={0}
                            max={quantity.toNumber()}
                        />
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Button color="blue" fullWidth onClick={() => buy()}>
                            buy now
                        </Button>
                    </Grid.Col>
                </Grid>
            </Card.Section>
        </Card>
    );
};

export default OffersNftCard;
