import { useEffect, useState, useContext } from "react";
import { Title, Text, Flex } from "@mantine/core";
import { BigNumber } from "bignumber.js";
import PortfolioNftCard from "../components/PortfolioNftCard";
import { address } from "../types";
import { AppContext } from "../AppContext";

type PortfolioTickets = {
    [tokenId: string]: {
        name: string;
        imageUrl: string;
        quantity: BigNumber;
    };
};

const PortfolioPage = () => {
    const { contract, userAddress } = useContext(AppContext);
    const [tickets, setTickets] = useState<PortfolioTickets>({});
    const [forSaleTicketIds, setForSaleTicketIds] = useState<string[]>([]);

    useEffect(
        () => {
            const getTickets = async () => {
                const storage = await contract.storage();
                let formattedTickets: PortfolioTickets = {};
                let tokenIds: string[] = [];

                // Get tickets that are for sale
                storage.offers.forEach((value: any, key: any) => {
                    if (key[0] === userAddress) {
                        setForSaleTicketIds((current) => [
                            ...current,
                            key[1].toString(),
                        ]);
                    }
                });

                // Get specific ticket group information (quantity)
                await Promise.all(
                    storage.owner_token_ids.map(async (element: any) => {
                        const elementUser = element[0];
                        const elementTokenId = element[1];

                        if (elementUser === userAddress) {
                            tokenIds = [
                                ...tokenIds,
                                elementTokenId.toString(),
                            ];
                            const ownerBalance = await storage.ledger.get({
                                0: userAddress as address,
                                1: elementTokenId,
                            });
                            formattedTickets[elementTokenId.toString()] = {
                                name: "", // will be added later from metadata
                                imageUrl: "", // will be added later from metadata
                                quantity: ownerBalance,
                            };
                        }
                    })
                );

                const metadatas =
                    await storage.token_metadata.getMultipleValues(tokenIds);

                // Get ticket metadata (name, image)
                metadatas.forEach((value: any) => {
                    const tokenId = value.token_id.toString();
                    let imageUrl = "";
                    let name = "";

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
                    formattedTickets[tokenId] = {
                        ...formattedTickets[tokenId],
                        imageUrl: imageUrl,
                        name: name,
                    };
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
            {Object.keys(tickets).length === 0 ? (
                <Text m="sm">no tickets!</Text>
            ) : (
                <Flex wrap="wrap">
                    {Object.entries(tickets).map(([tokenId, ticket]) => {
                        return (
                            <PortfolioNftCard
                                key={tokenId}
                                tokenId={Number(tokenId)}
                                name={ticket.name}
                                imageUrl={ticket.imageUrl}
                                quantity={ticket.quantity}
                                isForSale={forSaleTicketIds.includes(tokenId)}
                            />
                        );
                    })}
                </Flex>
            )}
        </div>
    );
};

export default PortfolioPage;
