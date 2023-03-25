import { useEffect, useState } from "react";
import { Title, Text, Flex } from "@mantine/core";
import { BigNumber } from "bignumber.js";
import NftCard from "../components/NftCard";
import { Ticket } from "../App";

type Props = {
    contract: any;
    userAddress: string;
};

const OffersPage = ({ contract, userAddress }: Props) => {
    const [tickets, setTickets] = useState<Ticket>({});

    useEffect(
        () => {
            const getTickets = async () => {
                const storage = await contract.storage();
                let formattedTickets: Ticket = {};
                let tokenIds: string[] = [];
                storage.offers.forEach((value: any, key: any) => {
                    tokenIds = [...tokenIds, key[1].toString()];
                    formattedTickets[key[1].toString()] = {
                        name: "", // will be added later from metadata
                        imageUrl: "", // will be added later from metadata
                        quantity: new BigNumber(value.quantity),
                        user: key[0],
                        price: new BigNumber(value.price),
                    };
                });

                const metadatas =
                    await storage.token_metadata.getMultipleValues(tokenIds);

                metadatas.forEach((value: any) => {
                    const id = value.token_id.toString();
                    value.token_info.valueMap.forEach(
                        (element: any, key: string) => {
                            key = key.substring(1, key.length - 1);

                            if (key === "thumbnailUri") {
                                formattedTickets[id] = {
                                    ...formattedTickets[id],
                                    imageUrl: Buffer.from(
                                        element,
                                        "hex"
                                    ).toString(),
                                };
                            } else if (key === "name") {
                                formattedTickets[id] = {
                                    ...formattedTickets[id],
                                    name: Buffer.from(
                                        element,
                                        "hex"
                                    ).toString(),
                                };
                            }
                        }
                    );
                });
                console.log(formattedTickets);
                setTickets(formattedTickets);
            };
            getTickets();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    return (
        <div>
            <Title m="xs">tickets for sale</Title>
            <Flex>
                {Object.entries(tickets).map(([tokenId, ticket]) => {
                    return (
                        <NftCard
                            key={tokenId}
                            tokenId={tokenId}
                            name={ticket.name}
                            imageUrl={ticket.imageUrl}
                            quantity={ticket.quantity}
                            user={ticket.user}
                            price={ticket.price}
                        />
                    );
                })}
            </Flex>
        </div>
    );
};

export default OffersPage;
