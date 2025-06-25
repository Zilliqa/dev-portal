// add-zilliqa-PM-chain.js

document.addEventListener('DOMContentLoaded', function() {
    const addZilliqaPMChainButton = document.getElementById('addZilliqaPMChainButton');
    
    if (addZilliqaPMChainButton) {
        addZilliqaPMChainButton.addEventListener('click', addZilliqaPMChain);
    }
});

async function addZilliqaPMChain() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        blockExplorerUrls: [
                            "https://otterscan.zilliqa.com"
                        ],
                        iconUrls: [
                            "https://www.zilliqa.com/images/icon-zilliqa-testnet.svg",
                            "https://www.zilliqa.com/images/icon-zilliqa-testnet.png"
                        ],
                        nativeCurrency: {
                            name: "ZIL",
                            symbol: "ZIL",
                            decimals: 18
                        },
                        rpcUrls: [
                            "https://api.zilliqa.com"
                        ],
                        chainId: "0x8001",
                        chainName: "Zilliqa 2 EVM mainnet"
                    }
                ],
            });
            alert('Zilliqa 2 EVM mainnet has been added to your wallet!');
        } catch (error) {
            console.error(error);
            alert('An error occurred while trying to add the network: ' + error.message);
        }
    } else {
        alert('MetaMask is not installed. Please install it to use this feature.');
    }
}