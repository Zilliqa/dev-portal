// add-zilliqa-PT-chain.js

document.addEventListener('DOMContentLoaded', function() {
    const addZilliqaPTChainButton = document.getElementById('addZilliqaPTChainButton');
    
    if (addZilliqaPTChainButton) {
        addZilliqaPTChainButton.addEventListener('click', addZilliqaPTChain);
    }
});

async function addZilliqaPTChain() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        blockExplorerUrls: [
                            "https://otterscan.testnet.zilliqa.com/"
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
                            "https://api.testnet.zilliqa.com"
                        ],
                        chainId: "0x814d",
                        chainName: "Zilliqa 2 EVM testnet"
                    }
                ],
            });
            alert('Zilliqa 2 EVM testnet has been added to your wallet!');
        } catch (error) {
            console.error(error);
            alert('An error occurred while trying to add the network: ' + error.message);
        }
    } else {
        alert('MetaMask is not installed. Please install it to use this feature.');
    }
}