---
id: faq-introduction
title: Frequently Asked Questions
keywords:
  - FAQ
  - Questions
  - EVM
description: Frequently asked questions
---

<!-- markdownlint-disable -->

## Frequently asked questions

<!-- markdownlint-disable MD001 -->

#### What is the relationship between EVM ZIL and Zilliqa ZIL?

They are the same, though EVM ZIL are scaled to accommodate the differing precisions of EVM and Zilliqa ZIL (18 vs 12 decimal places).

#### Does this mean that ZIL transfers will produce dust?

Zilliqa 1 used to track value in Qa, and Wei were produced by multiplying this value by 1_000_000.

Zilliqa 2 tracks value in Wei and divides by 1_000_000 to produce Qa, so whilst Zilliqa-native API interactions will not produce dust, they may perpetuate it. Unless you have a whole number of Qa in your account, you will not be able to zero your balance using the Zilliqa native API.

#### Can I use the same address for EVM and ZIL API (eg. for Metamask and ZilPay/Torch)?

In practice, no. The way your address is chosen is that:

1.  You pick a private key
2.  You derive a public key from that.
3.  Derive an address from the public key, usually by hashing.

Zilliqa and Ethereum have different ways of performing step 3, so the Zilliqa address derived from a given private key is different from the Ethereum address for that key.

If you were to want a single address for both EVM and ZIL, you would need to know eg. the ethereum private key for the ZIL address you had just worked out; this would involve deriving the private key from a (public) ZIL address, which can't practically be done, and so you can't have the same address for EVM and ZIL APIs.

#### Can you work around this?

If there is enough interest, it might be possible to work around this by allowing EVM transactions to have Schnorr signatures (so that you could submit them via the ZIL API) and vice versa, but this would need explicit support in DApps, and we judged the extra complexity probably wasn't worth it for now.

#### Will I be able to restore a Zilliqa account in Metamask using my private key or seed phrase?

No. You can only restore Zilliqa accounts in a Zilliqa wallet (eg. ZilPay or Torch) or EVM accounts in an EVM wallet like Metamask.

#### Will I be able to store ZRC fungible tokens in Metamask?

Not directly; you will be able to store them via our [ERC-20-to-ZRC-2 gateway contract](https://github.com/Zilliqa/zilliqa-developer/tree/main/contracts/experimental/ERC20ProxyForZRC2), which will let you see your ZRC-2 tokens as though they were ERC-20 tokens.

#### Will I be able to store ZRC non-fungible tokens in Metamask?

Not initially; we hope to be able to provide this in a future release, though you could also write a gateway contract (similar to our ZRC-2/ERC-20 gateway) yourself.

#### Will I be able to use my Zil on Dex like Uniwap, Sushiswap to trade?

If and when those DEXes deploy to Zilliqa, yes. In the meantime, there are other Zilliqa EVM DEXes such as Plunderswap -
[https://plunderswap.com/](https://plunderswap.com/).

#### Will Devs be able to deploy Uniswap/Sushiswap/1inch on Zilliqa?

Developers should be able to deploy your contracts to EVM on Zilliqa just like any other EVM-compatible chain.

#### Will I be able to sell my NFTs on NFT marketplace like Opensea/Blur?

Not until they add support for the Zilliqa chain (and even then, you will either need an ERC-721 gateway, or to have EVM NFTs on Zilliqa)

#### Will I be able to buy a NFT using Zil on Opensea/Blur?

Not until they add support for Zilliqa.

#### Will I be able to use stake.zilliqa.com with Metamask & stake my Zil?

Not directly; please let us know if this is functionality you'd like (or you can write a gateway contract yourself, of course). In the meantime, you'll need to transfer your ZIL to a Zilliqa wallet and stake them from there.

#### Will I be able to connect Metamask with Zilswap & buy tokens listed on Zilswap with native Zil?

Not until Zilswap supports EVM wallets.

#### Which Dex can I use to connect with Metamask & use my Native Zil to trade?

Plunderswap - [https://plunderswap.com/](https://plunderswap.com/) is a native EVM DEX on Zilliqa.

#### Will NFTs created under ZRC1 have EVM interoperability or this apply only to ZRC6?

This is not yet decided; we'd hope to support both standards. Please get in touch if you have a particular need for ZRC1 support (or, again, it should be possible to write this yourself using our interop facilities if you really need it).

#### What happens if I send ZIL via Torch or ZilPay to my EVM address, or Metamask to my ZIL address?

These transfers should execute normally, and your ZIL will arrive safely in the EVM wallet.

#### What happens if I send ZIL to a random address via Metamask?

They will be lost, just as they are today - in fact, they'll turn up just fine at the address you sent them to, but since no-one has the private key for that address, it won't be possible to do anything with them once they get there.

#### How about ZRC-2, ERC-20 and other contract-wrapped tokens?

This is trickier. Suppose you send some ZRC-2 tokens (such as `XCAD` or `ZWAP`) to your EVM address. They'll arrive just fine, but you will now want to send them elsewhere.

In order to do so, you will need to call the ZRC-2 contract with `_sender` equal to your EVM address. But, in order to make that call you need to submit a Zilliqa API transaction from your EVM address, which we've just agreed you can't do. So your funds will be stuck.

This is not optimal, and you can get out of it using [Scilla->EVM interwork](https://github.com/Zilliqa/ZIPS/blob/master/zips/zip-21.md); create a solidity contract which calls the Scilla contract using the `call scilla contract with _sender unchanged` precompile. You can now send a Scilla call from an EVM transaction, and there is a contract available in the
[zilliqa-developer](https://github.com/zilliqa/zilliqa-developer)
repository which does this by building an ERC-20 facade for ZRC-2 assets.

This will recover your funds, but might be quite tricky to operate for arbitrary contracts; our roadmap contains a more generic mechanism for arbitrary contracts (though you will still need to know what transition/calldata you need to call).

If you didn't understand the above, please contact your the dApp maintainer, or your developers, who will hopefully be able to help you.

**Note on Testnet Hard Fork for EVM-Scilla Error Handling**

Developers working on cross-VM applications on the testnet should be aware of a temporary change in error handling behavior. A hard fork on the testnet activated the `evm_exec_failure_causes_scilla_precompile_to_fail` flag at block `9494740` and deactivated it at block `9498974`.

During this window, failures in EVM contracts called from Scilla contracts would cause the parent Scilla transaction to fail. Before and after this period, such failures do not automatically propagate and fail the Scilla transaction. This is a critical consideration for developers testing error handling and fallback mechanisms in their dApps on the testnet.

#### What about NFTs?

Please don't transfer your ZRC-1 or ZRC-6 Zilliqa NFTs to EVM addresses for now! You will be unable to do anything with them when they have been transferred and, though you are likely to be able to transfer them back to your Zilliqa wallet via the interop route described above, doing so is risky.

#### How about transferring ERC-20s and other tokens to ZIL API address?

Please don't do that either! Rescuing trapped tokens in EVM contracts is significantly harder than for Scilla contracts, because Scilla contracts have self-describing storage encoding and source is always available.

Whilst the interop mechanism can be used to transfer these back to EVM addresses, it is substantially harder to write the code to do so, and probably impossible unless you have the source code (or at least the interface) of the contract in question. Again, the maintainers of the dApp may be able to help, or if you are sophisticated, you may be able to do this yourself.

We will try to provide assistance with the most common cases as they arise.
