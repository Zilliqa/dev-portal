---
id: mining-zilclient
title: Running the Zilliqa Client
keywords:
  - mining steps
  - client setup
  - zilclient
  - zilliqa
description: Running the Zilliqa Client Mining
---

---

## Hardware Requirements

The [**Zilliqa Client**](https://github.com/Zilliqa/zilliqa) is officially
supported on Ubuntu 18.04 OS.

The **minimum** requirements for running the **Zilliqa Client** are:

- x64 Linux operating system (e.g Ubuntu 18.04.5)
- Recent dual-core processor @ 2.2 GHZ. Examples: Intel Xeon (Skylake)
- 8GB DRR3 RAM or higher
- Public static IP address
- 300GB Solid State Drive
- Any GPUs with at least 2 GB RAM
- 100MB/s upload and download bandwidth

!!! info

    Hashing rate of the network is currently very high. A single GPU will be
    insufficient. You will need to setup [mining proxy](mining-proxy.md) connecting
    to multiple GPUs.

## Mining Steps

1.  Create a single local or remote CPU node instance with Ubuntu 18.04 OS
    installed following instructions
    [**HERE**](http://releases.ubuntu.com/bionic/).

1.  Install Docker CE for Ubuntu on your CPU node instance by following
    instructions
    [**HERE**](https://docs.docker.com/install/linux/docker-ce/ubuntu/).

1.  Make a new directory in your Desktop and change the directory to it:

    ```shell
    cd ~/Desktop && mkdir join && cd join
    ```

1.  Get the joining configuration files:

    ```shell
    wget[https://mainnet-join.zilliqa.com/configuration.tar.gz](https://mainnet-join.zilliqa.com/configuration.tar.gz)   tar zxvf configuration.tar.gz
    ```

1.  Find out your current IP address in the command prompt and record it down:

    ````shell
    curl[https://ipinfo.io/ip](https://ipinfo.io/ip)   ```
    ````

!!! note

    NAT IP is not supported. Kindly use the public IP address during the
    launch step.

1.  Edit your _constant.xml_ file in your configuration folder for the following
    types of mining mode:

    **Remote Mine**: This mode is enabled by setting "REMOTE_MINE" to true in
    constants.xml, and MINING_PROXY_URL needs to be set to the address of the
    mining proxy listening address. In this mode, multiple zilliqa node can send
    PoW work request to the mining proxy, and mining proxy dispatches the work
    packages to multiple mining machines. If the mining machine find result, it
    sends to the mining proxy, and mining proxy send to Zilliqa node. This mode
    can support multiple Zilliqa nodes and mining machines, but it needs to run
    a mining proxy server separately.

    - Set `REMOTE_MINE` to `true`.
    - Set `MINING_PROXY_URL` to the URL of the mining proxy you are using.
    - Set the following mining parameters to `false`:

    ```shell
    <CUDA_GPU_MINE>false</CUDA_GPU_MINE>
    <FULL_DATASET_MINE>false</FULL_DATASET_MINE>
    <OPENCL_GPU_MINE>false</OPENCL_GPU_MINE>
    <REMOTE_MINE>true</REMOTE_MINE>
    MINING_PROXY_URL[http://127.0.0.1:4202/api](http://127.0.0.1:4202/api)/MINING_PROXY_URL>
    ```

    **Get Work Server Mine**: This mode is enabled by setting
    "GETWORK_SERVER_MINE" to true in constants.xml. The zilliqa node will be
    used as an mining server, other GPU machine can get work from this server
    and submit the result if the GPU machine find the result. It can combine the
    hash power of multiple GPU machines to finish a high difficulty PoW job. But
    if there are multiple zilliqa node using this mode, it is not easy to
    maintain.

    - Set `GETWORK_SERVER_MINE` to `true`.
    - Set `GETWORK_SERVER_PORT` to the port you will be using to GetWork.
      (default is `4202`)
    - Set the following mining parameters to `false`:

    ```shell
    <GETWORK_SERVER_MINE>true</GETWORK_SERVER_MINE>
    <GETWORK_SERVER_PORT>4202</GETWORK_SERVER_PORT>
    <CUDA_GPU_MINE>false</CUDA_GPU_MINE>
    <FULL_DATASET_MINE>false</FULL_DATASET_MINE>
    <OPENCL_GPU_MINE>false</OPENCL_GPU_MINE>
    <REMOTE_MINE>false</REMOTE_MINE>
    ```

1.  Install the python dependencies:

    ```shell
    sudo apt install python3-pip
    export LC_ALL=C
    pip3 install requests clint futures
    ```

1.  Run the shell script in your command prompt to launch your docker image:

    ```shell
    ./launch_docker.sh
    ```

1.  You will be prompted to enter some information as shown below:

    !!! note

        **DO NOT** duplicate your IP address and use different ports to
           create different CPU nodes. You will be blacklisted by the network and hence
        not be able to receive any rewards.

    - `Assign a name to your container (default: zilliqa):` <br/> [Press
      **Enter** to skip if using default]

    - `Enter your IP address (*.*.*.*):` <br/> [Key in your IP address as
      found in step 5]

    - `Enter your listening port (default: 33133):` <br/> [Press **Enter** to
      skip if using default]

    **Monitoring Progress**: You are now a miner in the Zilliqa Mainnet. You can
    monitor your progress on your CPU node by using:

    ```shell
    tail -f zilliqa-00001-log.txt
    ```

    **Checking Your Generated Keypairs**: To check your locally generated public
    and private key pairs in your _mykey.txt_ file, you can enter the following
    in your command prompt on your CPU node:

    ```shell
    less mykey.txt
    ```

    The first hex string is your **public key**, and the second hex string is
    your **private key**.

    !!! note

        This key pair is generated locally on your disk. Do remember to keep
        your private key somewhere safe!

    **Checking Your $ZIL Balance**: To check your balance for mining, input the
    address located in your _myaddr.txt_ file in the search bar
    of[https://viewblock.io/zilliqa:](https://viewblock.io/zilliqa:)

    ```shell
    less myaddr.txt
    ```

    **Stopping the Mining Process**: To stop the mining client, stop the docker
    container running the **Zilliqa Client** on the CPU node:

    ```shell
    sudo docker stop <zilliqa container name>
    ```

## Header hash calculation

The PoW header hash by taking the SHA-256 sum of the concatenation of:

- `rand1`
- `rand2`
- `peer`
- `pubKey`
- `lookupId`
- `gasPrice`
- `extraData` - Up to 32 bytes of arbitrary data.

Mining clients or proxies may wish to calculate this for themselves if they wish to manipulate the resulting hash by changing the value of `extraData`.

## External Mining APIs

### Remote mining

When the Zilliqa node wants to perform PoW, it will make a call to the `zil_requestWork` method, with a payload of: `[pubKey, headerHash, blockNum, boundary, powTime, signature]`.
The node will poll for the PoW solution by calling the `zil_checkWorkStatus` method, with a payload of: `[pubKey, headerHash, boundary, signature]`.
The response should be in the format: `[isWorkDone, nonce, headerHash, mixHash]`.

If you need to customize the header hash, you can enable `REMOTE_MINE_EXTRA_DATA` in `constants.xml`.
In this case, the node will instead make a call to the `zil_requestWorkWithHeaderHashParams` method, with a payload of: `[pubKey, rand1, rand2, peer, lookupId, gasPrice, blockNum, boundary, powTime, signature]`.
The node will poll for the PoW solution by calling the `zil_checkWorkStatusWithExtraData` method, with a payload of: `[pubKey, headerHash, boundary, signature]`.
The `headerHash` in this request should be ignored.
The response should be in the format: `[isWorkDone, nonce, extraData, mixHash]`.

### Get work server mining

When the mining client or proxy is ready to perform PoW, it should make a call to the `eth_getWork` method.
The response will be in the format: `[headerHash, seed, boundary, isMining, secondsToNextPow]`.
The mining client or proxy should submit the PoW solution by calling the `eth_submitWork` method, with a payload of: `[nonce, headerHash, mixDigest, boundary, minerWallet, worker]`.
The `minerWallet` and `worker` are ignored.

If you need to customize the header has, you can instead make a call to the `zil_getWorkWithHeaderParams` method.
The response will be in the format: `[pubKey, rand1, rand2, peer, lookupId, gasPrice, seed, boundary, isMining, secondsToNextPow]`.
The mining client or proxy should submit the PoW solution by calling the `zil_submitWorkWithExtraData` method, with a payload of: `[nonce, extraData, mixDigest, boundary, minerWallet, worker]`.
The `minerWallet` and `worker` are ignored.
