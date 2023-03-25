import {
    ContractAbstraction,
    ContractMethod,
    ContractMethodObject,
    ContractProvider,
    Wallet,
} from "@taquito/taquito";

import {
    assertMichelsonInstruction,
    Expr,
    MichelsonCode,
} from "@taquito/michel-codec";
import { MichelsonMap } from "@taquito/taquito";
import { BigNumber } from "bignumber.js";

export type Instruction = MichelsonCode;

export type unit = (true | undefined) & { __type: "unit" };

export type address = string & { __type: "address" };
export type bytes = string & { __type: "bytes" };
export type contract = string & { __type: "contract" };
export type operation = string & { __type: "operation" };
export type key = string & { __type: "key" };
export type key_hash = string & { __type: "key_hash" };
export type signature = string & { __type: "signature" };
export type ticket = string & { __type: "ticket" };

export type timestamp = string & { __type: "timestamp" };

export type int = BigNumber & { __type: "int" };
export type nat = BigNumber & { __type: "nat" };

export type mutez = BigNumber & { __type: "mutez" };
export type tez = BigNumber & { __type: "tez" };

type MapKey = Array<any> | object | string | boolean | number;
export type MMap<K extends MapKey, V> = Omit<MichelsonMap<K, V>, "get"> & {
    get: (key: K) => V;
};
export type BigMap<K extends MapKey, V> = Omit<MichelsonMap<K, V>, "get"> & {
    get: (key: K) => Promise<V>;
};

export type chest = string & { __type: "chest" };
export type chest_key = string & { __type: "chest_key" };

const createStringTypeTas = <T extends string>() => {
    return (value: string): T => value as T;
};

const createBigNumberTypeTas = <T extends BigNumber>() => {
    return (value: number | BigNumber | string): T =>
        new BigNumber(value) as T;
};

type asMapParamOf<K, V> = K extends string
    ? { [key: string]: V } | Array<{ key: K; value: V }>
    : K extends number
    ? { [key: number]: V } | Array<{ key: K; value: V }>
    : Array<{ key: K; value: V }>;

function asMap<K extends MapKey, V>(value: asMapParamOf<K, V>): MMap<K, V> {
    const m = new MichelsonMap<K, V>();
    if (Array.isArray(value)) {
        const vArray = value as Array<{ key: K; value: V }>;
        vArray.forEach((x) => m.set(x.key, x.value));
    } else {
        const vObject = value as { [key: string]: V };
        Object.keys(vObject).forEach((key) =>
            m.set(key as unknown as K, vObject[key])
        );
    }
    return m as MMap<K, V>;
}
const asBigMap = <K extends MapKey, V>(value: asMapParamOf<K, V>) =>
    asMap(value) as unknown as BigMap<K, V>;

function add<T extends BigNumber>(a: T, b: T): T {
    return a.plus(b) as T;
}
function subtract<T extends BigNumber>(a: T, b: T): T {
    return a.minus(b) as T;
}

function createLambdaTypeTas(expr: Expr): MichelsonCode {
    assertMichelsonInstruction(expr);
    return expr as MichelsonCode;
}

/** tas: Tezos 'as' casting for strict types */
export const tas = {
    address: createStringTypeTas<address>(),
    bytes: createStringTypeTas<bytes>(),
    contract: createStringTypeTas<contract>(),
    chest: createStringTypeTas<chest>(),
    chest_key: createStringTypeTas<chest_key>(),
    timestamp: (value: string | Date): timestamp =>
        new Date(value).toISOString() as timestamp,

    int: createBigNumberTypeTas<int>(),
    nat: createBigNumberTypeTas<nat>(),
    mutez: createBigNumberTypeTas<mutez>(),
    tez: createBigNumberTypeTas<tez>(),

    map: asMap,
    bigMap: asBigMap,

    // Operations
    add,
    subtract,

    lambda: createLambdaTypeTas,

    // To number
    number: (value: string | BigNumber) => Number(value + ""),
    unit: () => true as unit,
};

type BaseContractType = {
    methods: unknown;
    methodsObject: unknown;
    storage: unknown;
};

type ContractMethodsOf<
    T extends ContractProvider | Wallet,
    TContract extends BaseContractType
> = {
    [M in keyof TContract["methods"]]: TContract["methods"][M] extends (
        ...args: infer A
    ) => unknown
        ? (...args: A) => ContractMethod<T>
        : never;
};
type ContractMethodsObjectsOf<
    T extends ContractProvider | Wallet,
    TContract extends BaseContractType
> = {
    [M in keyof TContract["methodsObject"]]: TContract["methodsObject"][M] extends (
        ...args: infer A
    ) => unknown
        ? (...args: A) => ContractMethodObject<T>
        : never;
};
type ContractStorageOf<TContract extends BaseContractType> =
    TContract["storage"];

export type ContractAbstractionFromContractType<
    TContract extends BaseContractType
> = ContractAbstraction<
    ContractProvider,
    ContractMethodsOf<ContractProvider, TContract>,
    ContractMethodsObjectsOf<ContractProvider, TContract>,
    {},
    {},
    ContractStorageOf<TContract>
>;

export type WalletContractAbstractionFromContractType<
    TContract extends BaseContractType
> = ContractAbstraction<
    Wallet,
    ContractMethodsOf<Wallet, TContract>,
    ContractMethodsObjectsOf<Wallet, TContract>,
    {},
    {},
    ContractStorageOf<TContract>
>;

export type Storage = {
    administrators: Array<address>;
    ledger: BigMap<
        {
            0: address;
            1: nat;
        },
        nat
    >;
    metadata: BigMap<string, bytes>;
    offers: MMap<
        {
            0: address;
            1: nat;
        },
        {
            price: nat;
            quantity: nat;
        }
    >;
    operators: BigMap<
        {
            0: address;
            1: address;
        },
        Array<nat>
    >;
    owner_token_ids: Array<{
        0: address;
        1: nat;
    }>;
    token_ids: Array<nat>;
    token_metadata: BigMap<
        nat,
        {
            token_id: nat;
            token_info: MMap<string, bytes>;
        }
    >;
};

type Methods = {
    addAdministrator: (param: address) => Promise<void>;
    balance_of: (
        requests: Array<{
            owner: address;
            token_id: nat;
        }>,
        callback: contract
    ) => Promise<void>;
    buy: (_0: nat, _1: nat, _2: address) => Promise<void>;
    mint: (_0: nat, _1: bytes, _2: bytes, _3: bytes) => Promise<void>;
    sell: (_0: nat, _1: nat, _2: nat) => Promise<void>;
    transfer: (
        param: Array<{
            from_: address;
            txs: Array<{
                to_: address;
                token_id: nat;
                amount: nat;
            }>;
        }>
    ) => Promise<void>;
    add_operator: (
        owner: address,
        operator: address,
        token_id: nat
    ) => Promise<void>;
    remove_operator: (
        owner: address,
        operator: address,
        token_id: nat
    ) => Promise<void>;
};

type MethodsObject = {
    addAdministrator: (param: address) => Promise<void>;
    balance_of: (params: {
        requests: Array<{
            owner: address;
            token_id: nat;
        }>;
        callback: contract;
    }) => Promise<void>;
    buy: (params: { 0: nat; 1: nat; 2: address }) => Promise<void>;
    mint: (params: {
        0: nat;
        1: nat;
        2: bytes;
        3: bytes;
        4: bytes;
        5: bytes;
    }) => Promise<void>;
    sell: (params: { 0: nat; 1: nat; 2: nat }) => Promise<void>;
    transfer: (
        param: Array<{
            from_: address;
            txs: Array<{
                to_: address;
                token_id: nat;
                amount: nat;
            }>;
        }>
    ) => Promise<void>;
    add_operator: (params: {
        owner: address;
        operator: address;
        token_id: nat;
    }) => Promise<void>;
    remove_operator: (params: {
        owner: address;
        operator: address;
        token_id: nat;
    }) => Promise<void>;
};

type contractTypes = {
    methods: Methods;
    methodsObject: MethodsObject;
    storage: Storage;
    code: { __type: "NftCode"; protocol: string; code: object[] };
};
export type NftContractType =
    ContractAbstractionFromContractType<contractTypes>;
export type NftWalletType =
    WalletContractAbstractionFromContractType<contractTypes>;
