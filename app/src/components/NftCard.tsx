import { useState, useEffect, useMemo } from "react";
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
import { Ticket } from "../App";
import { BigNumber } from "bignumber.js";

type Props = {
    tokenId: string;
    name: string;
    imageUrl: string;
    quantity: BigNumber;
    user: string;
    price: BigNumber;
};

const NftCard = ({
    tokenId,
    name,
    imageUrl,
    quantity,
    user,
    price,
}: Props) => {
    const [buyQuantity, setBuyQuantity] = useState(0);

    const displayedPrice = useMemo(() => {
        return price.div(1000000).toString();
    }, [price]);

    const displayedQuantity = useMemo(() => {
        return quantity.toString();
    }, [quantity]);

    const handleBuyQuantity = (value: number) => {
        if (new BigNumber(value).lte(quantity)) {
            setBuyQuantity(value);
        } else {
            setBuyQuantity(quantity.toNumber());
        }
    };

    return (
        <Card shadow="sm" p="md" m="md" withBorder style={{ width: "300px" }}>
            <Card.Section>
                <Image src={imageUrl} height={200} alt={tokenId.toString()} />
            </Card.Section>
            <Card.Section mt="xs" ml="0" mr="0">
                <Group position="apart">
                    <Text fz="lg" fw={500}>
                        {name}
                    </Text>
                    <Badge size="md">{displayedPrice} ꜩ</Badge>
                </Group>
                <Text>for sale: {quantity.toString()}</Text>
            </Card.Section>
            <Card.Section>
                <Grid grow mt="xs">
                    <Grid.Col span={1} ml="xs">
                        <NumberInput
                            value={buyQuantity}
                            onChange={(v: number) => handleBuyQuantity(v)}
                            placeholder={displayedQuantity}
                        />
                    </Grid.Col>
                    <Grid.Col span={1} mr="xs">
                        <Button color="blue" fullWidth>
                            buy now
                        </Button>
                    </Grid.Col>
                </Grid>
            </Card.Section>
        </Card>
    );
};

export default NftCard;
