/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../common";

export declare namespace ProductPassport {
  export type ProductDataStruct = {
    description: string;
    manuals: string[];
    specifications: string[];
    batchNumber: string;
    productionDate: string;
    expiryDate: string;
    certifications: string;
    warrantyInfo: string;
    materialComposition: string;
    complexId: string;
  };

  export type ProductDataStructOutput = [
    description: string,
    manuals: string[],
    specifications: string[],
    batchNumber: string,
    productionDate: string,
    expiryDate: string,
    certifications: string,
    warrantyInfo: string,
    materialComposition: string,
    complexId: string
  ] & {
    description: string;
    manuals: string[];
    specifications: string[];
    batchNumber: string;
    productionDate: string;
    expiryDate: string;
    certifications: string;
    warrantyInfo: string;
    materialComposition: string;
    complexId: string;
  };
}

export declare namespace ComplexManagement {
  export type ComplexStruct = {
    complexId: string;
    complexName: string;
    complexCountry: string;
    complexAddress: string;
    complexSiteType: string;
    complexIndustry: string;
    latitude: string;
    longitude: string;
  };

  export type ComplexStructOutput = [
    complexId: string,
    complexName: string,
    complexCountry: string,
    complexAddress: string,
    complexSiteType: string,
    complexIndustry: string,
    latitude: string,
    longitude: string
  ] & {
    complexId: string;
    complexName: string;
    complexCountry: string;
    complexAddress: string;
    complexSiteType: string;
    complexIndustry: string;
    latitude: string;
    longitude: string;
  };
}

export interface ProductPassportInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "complexManagement"
      | "createProduct"
      | "getProductDetails"
      | "products"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "complexManagement",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createProduct",
    values: [BigNumberish, string, string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getProductDetails",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "products",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "complexManagement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createProduct",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProductDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "products", data: BytesLike): Result;
}

export interface ProductPassport extends BaseContract {
  connect(runner?: ContractRunner | null): ProductPassport;
  waitForDeployment(): Promise<this>;

  interface: ProductPassportInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  complexManagement: TypedContractMethod<[], [string], "view">;

  createProduct: TypedContractMethod<
    [
      productId: BigNumberish,
      description: string,
      batchNumber: string,
      productionDate: string,
      complexId: string
    ],
    [void],
    "nonpayable"
  >;

  getProductDetails: TypedContractMethod<
    [productId: BigNumberish],
    [
      [
        ProductPassport.ProductDataStructOutput,
        ComplexManagement.ComplexStructOutput
      ]
    ],
    "view"
  >;

  products: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, string, string, string, string, string, string, string] & {
        description: string;
        batchNumber: string;
        productionDate: string;
        expiryDate: string;
        certifications: string;
        warrantyInfo: string;
        materialComposition: string;
        complexId: string;
      }
    ],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "complexManagement"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "createProduct"
  ): TypedContractMethod<
    [
      productId: BigNumberish,
      description: string,
      batchNumber: string,
      productionDate: string,
      complexId: string
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getProductDetails"
  ): TypedContractMethod<
    [productId: BigNumberish],
    [
      [
        ProductPassport.ProductDataStructOutput,
        ComplexManagement.ComplexStructOutput
      ]
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "products"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, string, string, string, string, string, string, string] & {
        description: string;
        batchNumber: string;
        productionDate: string;
        expiryDate: string;
        certifications: string;
        warrantyInfo: string;
        materialComposition: string;
        complexId: string;
      }
    ],
    "view"
  >;

  filters: {};
}