import { useEffect, useState } from "react";
import { Title, Text, Flex } from "@mantine/core";
import { BigNumber } from "bignumber.js";
import NftCard from "../components/NftCard";
import { Ticket } from "../App";
import { address, nat } from "../types";

type Props = {
    contract: any;
    userAddress: string;
    setPage: any;
};

const PortfolioPage = ({ contract, userAddress, setPage }: Props) => {
    const [tickets, setTickets] = useState<Ticket>({});
    const [forSaleTicketIds, setForSaleTicketIds] = useState<string[]>([]);

    useEffect(
        () => {
            const getTickets = async () => {
                const storage = await contract.storage();
                let formattedTickets: Ticket = {};
                let tokenIds: string[] = [];

                storage.offers.forEach((value: any, key: any) => {
                    if (key[0] === userAddress) {
                        setForSaleTicketIds((current) => [
                            ...current,
                            key[1].toString(),
                        ]);
                    }
                });

                await Promise.all(
                    storage.owner_token_ids.map(async (element: any) => {
                        if (element[0] === userAddress) {
                            const ownerBalance = await storage.ledger.get({
                                0: userAddress as address,
                                1: element[1],
                            });
                            tokenIds = [...tokenIds, element[1].toString()];
                            formattedTickets[element[1].toString()] = {
                                name: "", // will be added later from metadata
                                imageUrl: "", // will be added later from metadata
                                quantity: ownerBalance,
                                user: element[0],
                                price: new BigNumber(0),
                            };
                        }
                    })
                );

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
                setTickets(formattedTickets);
            };
            getTickets();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    return (
        <div>
            <Title m="xs">tickets in portfolio</Title>
            <Flex>
                {Object.entries(tickets).map(([tokenId, ticket]) => {
                    return (
                        <NftCard
                            key={tokenId}
                            tokenId={Number(tokenId)}
                            name={ticket.name}
                            imageUrl={ticket.imageUrl}
                            quantity={ticket.quantity}
                            user={ticket.user}
                            price={ticket.price}
                            contract={contract}
                            setPage={setPage}
                            isForSale={forSaleTicketIds.includes(tokenId)}
                        />
                    );
                })}
            </Flex>
        </div>
    );
};

export default PortfolioPage;
