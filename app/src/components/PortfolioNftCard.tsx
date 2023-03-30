import { useState } from "react";
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
import { nat } from "../types";

type Props = {
    tokenId: number;
    name: string;
    imageUrl: string;
    quantity: BigNumber;
    contract: any;
    isForSale: boolean;
};

const PortfolioNftCard = ({
    tokenId,
    name,
    imageUrl,
    quantity,
    contract,
    isForSale,
}: Props) => {
    const [sellQuantity, setSellQuantity] = useState<number | undefined>(
        undefined
    );
    const [sellPrice, setSellPrice] = useState<number | undefined>(undefined);

    const sell = async () => {
        if (sellQuantity && sellPrice) {
            const formattedPrice = sellPrice * 1000000;
            const sellOperation = await contract.methods
                .sell(
                    new BigNumber(tokenId) as nat,
                    new BigNumber(sellQuantity) as nat,
                    new BigNumber(formattedPrice) as nat
                )
                .send();
            await sellOperation.confirmation(3);
            window.location.reload();
        }
    };

    return (
        <Card shadow="sm" p="md" m="md" withBorder style={{ width: "300px" }}>
            <Card.Section>
                <Image src={imageUrl} height={200} alt={tokenId.toString()} />
            </Card.Section>
            <Card.Section mt="xs" mb="xs" ml="0" mr="0">
                <Group position="apart">
                    <Text fz="lg" fw={500}>
                        {name}
                    </Text>
                    <Badge size="md">
                        {isForSale ? "for sale" : " not for sale"}
                    </Badge>
                </Group>
                <Text>owned: {quantity.toString()}</Text>
            </Card.Section>
            <Card.Section>
                <Grid grow ml="0" mr="0">
                    <Grid.Col span={1}>
                        <NumberInput
                            value={sellQuantity}
                            onChange={(v: number) => setSellQuantity(v)}
                            placeholder={"quantity"}
                            min={0}
                            max={quantity.toNumber()}
                        />
                    </Grid.Col>
                    <Grid.Col span={1} pl="0">
                        <NumberInput
                            value={sellPrice}
                            onChange={(v: number) => setSellPrice(v)}
                            placeholder={"price"}
                            precision={6}
                            min={0}
                        />
                    </Grid.Col>
                </Grid>
            </Card.Section>
            <Card.Section>
                <Grid grow ml="0" mr="0">
                    <Grid.Col span={1}>
                        <Button color="blue" fullWidth onClick={() => sell()}>
                            sell now
                        </Button>
                    </Grid.Col>
                </Grid>
            </Card.Section>
        </Card>
    );
};

export default PortfolioNftCard;
