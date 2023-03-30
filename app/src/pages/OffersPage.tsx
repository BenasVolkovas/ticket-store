import { useEffect, useState } from "react";
import { Title, Text, Flex } from "@mantine/core";
import { BigNumber } from "bignumber.js";
import OffersNftCard from "../components/OffersNftCard";

type Props = {
    contract: any;
    userAddress: string;
};

type SingleTicket = {
    name: string;
    imageUrl: string;
    quantity: BigNumber;
    user: string;
    price: BigNumber;
};

type OffersTicket = {
    [tokenId: string]: SingleTicket[];
};

const OffersPage = ({ contract, userAddress }: Props) => {
    const [tickets, setTickets] = useState<OffersTicket>({});

    useEffect(
        () => {
            const getTickets = async () => {
                const storage = await contract.storage();
                let formattedTickets: OffersTicket = {};
                let tokenIds: string[] = [];

                // Get specific ticket group information (quantity, user, price)
                storage.offers.forEach((value: any, key: any) => {
                    const keyUser = key[0];
                    const keyTokenId = key[1].toString();

                    if (keyUser !== userAddress) {
                        tokenIds = [...tokenIds, keyTokenId];

                        if (!formattedTickets[keyTokenId]) {
                            formattedTickets[keyTokenId] = [];
                        }
                        formattedTickets[keyTokenId].push({
                            name: "", // will be added later from metadata
                            imageUrl: "", // will be added later from metadata
                            quantity: new BigNumber(value.quantity),
                            user: key[0],
                            price: new BigNumber(value.price),
                        });
                    }
                });

                const metadatas =
                    await storage.token_metadata.getMultipleValues(tokenIds);

                // Get metadata
                metadatas.forEach((value: any) => {
                    const tokenId = value.token_id.toString();
                    let imageUrl = "";
                    let name = "";

                    // Get image and name from metadata
                    value.token_info.valueMap.forEach(
                        (hexItem: any, key: string) => {
                            const keyName = key.substring(1, key.length - 1);

                            if (keyName === "thumbnailUri") {
                                imageUrl = Buffer.from(
                                    hexItem,
                                    "hex"
                                ).toString();
                            } else if (keyName === "name") {
                                name = Buffer.from(hexItem, "hex").toString();
                            }
                        }
                    );

                    // Add image and name to all tickets with the same tokenId
                    formattedTickets[tokenId].forEach(
                        (ticket: SingleTicket, index: number) => {
                            formattedTickets[tokenId][index] = {
                                ...ticket,
                                imageUrl: imageUrl,
                                name: name,
                            };
                        }
                    );
                });
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
            {Object.keys(tickets).length === 0 ? (
                <Text m="sm">loading...</Text>
            ) : (
                <Flex>
                    {Object.entries(tickets).map(([tokenId, ticketsList]) => {
                        return ticketsList.map((ticket) => {
                            return (
                                <OffersNftCard
                                    key={tokenId}
                                    tokenId={Number(tokenId)}
                                    name={ticket.name}
                                    imageUrl={ticket.imageUrl}
                                    quantity={ticket.quantity}
                                    user={ticket.user}
                                    price={ticket.price}
                                    contract={contract}
                                />
                            );
                        });
                    })}
                </Flex>
            )}
        </div>
    );
};

export default OffersPage;
