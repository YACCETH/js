import type { AbiParameterToPrimitiveType } from "abitype";
import type {
  BaseTransactionOptions,
  WithOverrides,
} from "../../../../../transaction/types.js";
import { prepareContractCall } from "../../../../../transaction/prepare-contract-call.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { once } from "../../../../../utils/promise/once.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";

/**
 * Represents the parameters for the "setSaleConfig" function.
 */
export type SetSaleConfigParams = WithOverrides<{
  primarySaleRecipient: AbiParameterToPrimitiveType<{
    type: "address";
    name: "_primarySaleRecipient";
  }>;
}>;

export const FN_SELECTOR = "0xd29a3628" as const;
const FN_INPUTS = [
  {
    type: "address",
    name: "_primarySaleRecipient",
  },
] as const;
const FN_OUTPUTS = [] as const;

/**
 * Checks if the `setSaleConfig` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `setSaleConfig` method is supported.
 * @module ClaimableERC20
 * @example
 * ```ts
 * import { ClaimableERC20 } from "thirdweb/modules";
 *
 * const supported = ClaimableERC20.isSetSaleConfigSupported(["0x..."]);
 * ```
 */
export function isSetSaleConfigSupported(availableSelectors: string[]) {
  return detectMethod({
    availableSelectors,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
  });
}

/**
 * Encodes the parameters for the "setSaleConfig" function.
 * @param options - The options for the setSaleConfig function.
 * @returns The encoded ABI parameters.
 * @module ClaimableERC20
 * @example
 * ```ts
 * import { ClaimableERC20 } from "thirdweb/modules";
 * const result = ClaimableERC20.encodeSetSaleConfigParams({
 *  primarySaleRecipient: ...,
 * });
 * ```
 */
export function encodeSetSaleConfigParams(options: SetSaleConfigParams) {
  return encodeAbiParameters(FN_INPUTS, [options.primarySaleRecipient]);
}

/**
 * Encodes the "setSaleConfig" function into a Hex string with its parameters.
 * @param options - The options for the setSaleConfig function.
 * @returns The encoded hexadecimal string.
 * @module ClaimableERC20
 * @example
 * ```ts
 * import { ClaimableERC20 } from "thirdweb/modules";
 * const result = ClaimableERC20.encodeSetSaleConfig({
 *  primarySaleRecipient: ...,
 * });
 * ```
 */
export function encodeSetSaleConfig(options: SetSaleConfigParams) {
  // we do a "manual" concat here to avoid the overhead of the "concatHex" function
  // we can do this because we know the specific formats of the values
  return (FN_SELECTOR +
    encodeSetSaleConfigParams(options).slice(
      2,
    )) as `${typeof FN_SELECTOR}${string}`;
}

/**
 * Prepares a transaction to call the "setSaleConfig" function on the contract.
 * @param options - The options for the "setSaleConfig" function.
 * @returns A prepared transaction object.
 * @module ClaimableERC20
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { ClaimableERC20 } from "thirdweb/modules";
 *
 * const transaction = ClaimableERC20.setSaleConfig({
 *  contract,
 *  primarySaleRecipient: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export function setSaleConfig(
  options: BaseTransactionOptions<
    | SetSaleConfigParams
    | {
        asyncParams: () => Promise<SetSaleConfigParams>;
      }
  >,
) {
  const asyncOptions = once(async () => {
    return "asyncParams" in options ? await options.asyncParams() : options;
  });

  return prepareContractCall({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
    params: async () => {
      const resolvedOptions = await asyncOptions();
      return [resolvedOptions.primarySaleRecipient] as const;
    },
    value: async () => (await asyncOptions()).overrides?.value,
    accessList: async () => (await asyncOptions()).overrides?.accessList,
    gas: async () => (await asyncOptions()).overrides?.gas,
    gasPrice: async () => (await asyncOptions()).overrides?.gasPrice,
    maxFeePerGas: async () => (await asyncOptions()).overrides?.maxFeePerGas,
    maxPriorityFeePerGas: async () =>
      (await asyncOptions()).overrides?.maxPriorityFeePerGas,
    nonce: async () => (await asyncOptions()).overrides?.nonce,
    extraGas: async () => (await asyncOptions()).overrides?.extraGas,
    erc20Value: async () => (await asyncOptions()).overrides?.erc20Value,
  });
}