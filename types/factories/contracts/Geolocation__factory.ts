/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  Geolocation,
  GeolocationInterface,
} from "../../contracts/Geolocation";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "id",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "latitude",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "longitude",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "additionalInfo",
        type: "string",
      },
    ],
    name: "GeolocationAdded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "geolocations",
    outputs: [
      {
        internalType: "string",
        name: "latitude",
        type: "string",
      },
      {
        internalType: "string",
        name: "longitude",
        type: "string",
      },
      {
        internalType: "string",
        name: "additionalInfo",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "id",
        type: "string",
      },
    ],
    name: "getGeolocation",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "latitude",
            type: "string",
          },
          {
            internalType: "string",
            name: "longitude",
            type: "string",
          },
          {
            internalType: "string",
            name: "additionalInfo",
            type: "string",
          },
        ],
        internalType: "struct Geolocation.GeoLocation",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "id",
        type: "string",
      },
      {
        internalType: "string",
        name: "latitude",
        type: "string",
      },
      {
        internalType: "string",
        name: "longitude",
        type: "string",
      },
      {
        internalType: "string",
        name: "additionalInfo",
        type: "string",
      },
    ],
    name: "setGeolocation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610d4d806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806305419a9c146100465780631e9810f714610076578063227eec2e14610092575b600080fd5b610060600480360381019061005b91906106c6565b6100c4565b60405161006d91906107ec565b60405180910390f35b610090600480360381019061008b919061080e565b6102b2565b005b6100ac60048036038101906100a791906106c6565b610373565b6040516100bb9392919061092f565b60405180910390f35b6100cc61054b565b6000826040516100dc91906109b7565b9081526020016040518091039020604051806060016040529081600082018054610105906109fd565b80601f0160208091040260200160405190810160405280929190818152602001828054610131906109fd565b801561017e5780601f106101535761010080835404028352916020019161017e565b820191906000526020600020905b81548152906001019060200180831161016157829003601f168201915b50505050508152602001600182018054610197906109fd565b80601f01602080910402602001604051908101604052809291908181526020018280546101c3906109fd565b80156102105780601f106101e557610100808354040283529160200191610210565b820191906000526020600020905b8154815290600101906020018083116101f357829003601f168201915b50505050508152602001600282018054610229906109fd565b80601f0160208091040260200160405190810160405280929190818152602001828054610255906109fd565b80156102a25780601f10610277576101008083540402835291602001916102a2565b820191906000526020600020905b81548152906001019060200180831161028557829003601f168201915b5050505050815250509050919050565b6040518060600160405280848152602001838152602001828152506000856040516102dd91906109b7565b908152602001604051809103902060008201518160000190816103009190610be4565b5060208201518160010190816103169190610be4565b50604082015181600201908161032c9190610be4565b509050507f19ececb2c6feac95111b03d8487478418f5146628679c8e1ce17e6e6537ec87e848484846040516103659493929190610cb6565b60405180910390a150505050565b6000818051602081018201805184825260208301602085012081835280955050505050506000915090508060000180546103ac906109fd565b80601f01602080910402602001604051908101604052809291908181526020018280546103d8906109fd565b80156104255780601f106103fa57610100808354040283529160200191610425565b820191906000526020600020905b81548152906001019060200180831161040857829003601f168201915b50505050509080600101805461043a906109fd565b80601f0160208091040260200160405190810160405280929190818152602001828054610466906109fd565b80156104b35780601f10610488576101008083540402835291602001916104b3565b820191906000526020600020905b81548152906001019060200180831161049657829003601f168201915b5050505050908060020180546104c8906109fd565b80601f01602080910402602001604051908101604052809291908181526020018280546104f4906109fd565b80156105415780601f1061051657610100808354040283529160200191610541565b820191906000526020600020905b81548152906001019060200180831161052457829003601f168201915b5050505050905083565b60405180606001604052806060815260200160608152602001606081525090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6105d38261058a565b810181811067ffffffffffffffff821117156105f2576105f161059b565b5b80604052505050565b600061060561056c565b905061061182826105ca565b919050565b600067ffffffffffffffff8211156106315761063061059b565b5b61063a8261058a565b9050602081019050919050565b82818337600083830152505050565b600061066961066484610616565b6105fb565b90508281526020810184848401111561068557610684610585565b5b610690848285610647565b509392505050565b600082601f8301126106ad576106ac610580565b5b81356106bd848260208601610656565b91505092915050565b6000602082840312156106dc576106db610576565b5b600082013567ffffffffffffffff8111156106fa576106f961057b565b5b61070684828501610698565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561074957808201518184015260208101905061072e565b60008484015250505050565b60006107608261070f565b61076a818561071a565b935061077a81856020860161072b565b6107838161058a565b840191505092915050565b600060608301600083015184820360008601526107ab8282610755565b915050602083015184820360208601526107c58282610755565b915050604083015184820360408601526107df8282610755565b9150508091505092915050565b60006020820190508181036000830152610806818461078e565b905092915050565b6000806000806080858703121561082857610827610576565b5b600085013567ffffffffffffffff8111156108465761084561057b565b5b61085287828801610698565b945050602085013567ffffffffffffffff8111156108735761087261057b565b5b61087f87828801610698565b935050604085013567ffffffffffffffff8111156108a05761089f61057b565b5b6108ac87828801610698565b925050606085013567ffffffffffffffff8111156108cd576108cc61057b565b5b6108d987828801610698565b91505092959194509250565b600082825260208201905092915050565b60006109018261070f565b61090b81856108e5565b935061091b81856020860161072b565b6109248161058a565b840191505092915050565b6000606082019050818103600083015261094981866108f6565b9050818103602083015261095d81856108f6565b9050818103604083015261097181846108f6565b9050949350505050565b600081905092915050565b60006109918261070f565b61099b818561097b565b93506109ab81856020860161072b565b80840191505092915050565b60006109c38284610986565b915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610a1557607f821691505b602082108103610a2857610a276109ce565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302610a907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610a53565b610a9a8683610a53565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000610ae1610adc610ad784610ab2565b610abc565b610ab2565b9050919050565b6000819050919050565b610afb83610ac6565b610b0f610b0782610ae8565b848454610a60565b825550505050565b600090565b610b24610b17565b610b2f818484610af2565b505050565b5b81811015610b5357610b48600082610b1c565b600181019050610b35565b5050565b601f821115610b9857610b6981610a2e565b610b7284610a43565b81016020851015610b81578190505b610b95610b8d85610a43565b830182610b34565b50505b505050565b600082821c905092915050565b6000610bbb60001984600802610b9d565b1980831691505092915050565b6000610bd48383610baa565b9150826002028217905092915050565b610bed8261070f565b67ffffffffffffffff811115610c0657610c0561059b565b5b610c1082546109fd565b610c1b828285610b57565b600060209050601f831160018114610c4e5760008415610c3c578287015190505b610c468582610bc8565b865550610cae565b601f198416610c5c86610a2e565b60005b82811015610c8457848901518255600182019150602085019450602081019050610c5f565b86831015610ca15784890151610c9d601f891682610baa565b8355505b6001600288020188555050505b505050505050565b60006080820190508181036000830152610cd081876108f6565b90508181036020830152610ce481866108f6565b90508181036040830152610cf881856108f6565b90508181036060830152610d0c81846108f6565b90509594505050505056fea26469706673582212203f73bb3ba0ab87914ac8485a94817fb61205bafa7b08d9d81d67fe1d77afdf9064736f6c63430008140033";

type GeolocationConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GeolocationConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Geolocation__factory extends ContractFactory {
  constructor(...args: GeolocationConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Geolocation & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Geolocation__factory {
    return super.connect(runner) as Geolocation__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GeolocationInterface {
    return new Interface(_abi) as GeolocationInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Geolocation {
    return new Contract(address, _abi, runner) as unknown as Geolocation;
  }
}
