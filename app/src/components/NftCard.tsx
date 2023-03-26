import { useState, useEffect, useMemo, Dispatch, SetStateAction } from "react";
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
import { Page } from "../App";

type Props = {
    tokenId: number;
    name: string;
    imageUrl: string;
    quantity: BigNumber;
    user: string;
    price: BigNumber;
    contract: any;
    setPage: Dispatch<SetStateAction<any>>;
    isForSale: boolean;
};

const NftCard = ({
    tokenId,
    name,
    imageUrl,
    quantity,
    user,
    price,
    contract,
    setPage,
    isForSale,
}: Props) => {
    const [buyQuantity, setBuyQuantity] = useState(0);

    const displayedPrice = useMemo(() => {
        return price.div(1000000).toString();
    }, [price]);

    const displayedQuantity = useMemo(() => {
        return quantity.toString();
    }, [quantity]);

    const handleBuyQuantity = (value: number) => {
        const quantityNum = quantity.toNumber();
        if (value <= quantityNum && value >= 0) {
            setBuyQuantity(value);
        } else {
            setBuyQuantity(quantity.toNumber());
        }
    };

    const buy = async () => {
        console.log("buy", tokenId, buyQuantity);
        const buyOperation = await contract.methods
            .buy(
                new BigNumber(tokenId) as nat,
                new BigNumber(buyQuantity) as nat,
                user as address
            )
            .send({
                amount: price.times(new BigNumber(buyQuantity)).toNumber(),
                mutez: true,
            });
        await buyOperation.confirmation(3);
        setPage(Page.Portfolio);
        window.location.reload();
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
                {isForSale ? (
                    <Grid grow mt="xs">
                        <Grid.Col span={1} ml="xs">
                            <NumberInput
                                value={buyQuantity}
                                onChange={(v: number) => handleBuyQuantity(v)}
                                placeholder={displayedQuantity}
                            />
                        </Grid.Col>
                        <Grid.Col span={1} mr="xs">
                            <Button
                                color="blue"
                                fullWidth
                                onClick={() => buy()}
                            >
                                buy now
                            </Button>
                        </Grid.Col>
                    </Grid>
                ) : (
                    <></>
                )}
            </Card.Section>
        </Card>
    );
};

export default NftCard;
