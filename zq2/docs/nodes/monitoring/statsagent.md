---
id: nodes/monitoring/statsagent
title: Validator Monitoring 
keywords:
  - Node
  - Validator
  - Monitoring
description: Validator Stats Agent 
---

# Validator Stats Agent Setup Guide

This document provides a step-by-step guide for validator operators to deploy the Zilliqa Stats Agent, enabling their node to appear on the public Zilliqa Network Status pages:

- [Protomainnet Status Page](https://stats.zq2-protomainnet.zilliqa.com/)

- [Prototestnet Status Page](https://stats.zq2-prototestnet.zilliqa.com/)

## Prerequisites

Before proceeding, ensure you have the following:

- A running Zilliqa node.

- Docker installed on your system.

- The required WebSocket secret (`WS_SECRET`) provided by Zilliqa to connect to the public status pages.

## Deployment Command

Run the following command to deploy the Zilliqa Stats Agent:

```bash
docker run -td --restart=unless-stopped \
    --platform=linux/amd64 \
    --net=host \
    -e RPC_HOST="127.0.0.1" \
    -e RPC_PORT="4202" \
    -e LISTENING_PORT="3333" \
    -e INSTANCE_NAME="validator name" \
    -e PEER_ID="validator peer id" \
    -e CONTACT_DETAILS="your email address" \
    -e WS_PORT="4202" \
    -e WS_SERVER="ws://stats.zq2-protomainnet.zilliqa.com" \
    -e WS_SECRET="<secret value>" \
    -e VERBOSITY="2" \
    asia-docker.pkg.dev/prj-p-devops-services-tvwmrf63/zilliqa-public/zilstats-agent:v0.0.9
```

> **Note:** 
>
> - Check the [Zilliqa eth-net-intelligence-api repository](https://github.com/Zilliqa/eth-net-intelligence-api) for more recent versions of the zilstats-agent image before deploying.
>
> - To ensure compatibility, is used the `--platform=linux/amd64` option in the docker run command. If your machine’s architecture is not `Linux/amd64` (e.g., ARM64 on a MacBook or Raspberry Pi), you may need to explicitly specify the platform when running the Docker container.

### Environment Variables

Customize the following environment variables based on your node and network setup:

- `RPC_HOST`: The IP address of your Zilliqa node's RPC interface. Default is `127.0.0.1`.

- `RPC_PORT`: The RPC admin port your Zilliqa node is listening on. Default is `4202`.

- `LISTENING_PORT`: The P2P communication port where the agent is listening. Default is `3333`.

- `INSTANCE_NAME`: A unique name for your node instance (e.g., "validator-1").
  
- `PEER_ID`: The base58-encoded peer id of your node (e.g., "12D3KooWC7W24XNeeKsoxCVsrKo4i3wbWxvBvuGoSyB26ua4eeA4").

- `CONTACT_DETAILS`: Your contact email address for identification.

- `WS_PORT`: The RPC admin port your Zilliqa node is listening on. Default is `4202`.

- `WS_SERVER`: WebSocket server URL for the stats page.

    - Use `ws://stats.zq2-protomainnet.zilliqa.com` for protomainnet.

    - Use `ws://stats.zq2-prototestnet.zilliqa.com` for prototestnet.

- `WS_SECRET`: The secret token provided by Zilliqa. **This is sensitive and confidential information. Please do not share it publicly or with unauthorized parties.**

- `VERBOSITY`: Logging verbosity level (default: `2`).


### Example Configuration

For a node connecting to the protomainnet:

```bash
docker run -td --restart=unless-stopped \
    --platform=linux/amd64 \
    --net=host \
    -e RPC_HOST="127.0.0.1" \
    -e RPC_PORT="4202" \
    -e LISTENING_PORT="3333" \
    -e INSTANCE_NAME="operator-name-validator" \
    -e PEER_ID="12D3KooWC7W24XNeeKsoxCVsrKo4i3wbWxvBvuGoSyB26ua4eeA4" \
    -e CONTACT_DETAILS="operator@example.com" \
    -e WS_PORT="4202" \
    -e WS_SERVER="ws://stats.zq2-protomainnet.zilliqa.com" \
    -e WS_SECRET="your-provided-secret" \
    -e VERBOSITY="2" \
    asia-docker.pkg.dev/prj-p-devops-services-tvwmrf63/zilliqa-public/zilstats-agent:v0.0.9
```

### Troubleshooting

1. **Issue:** The agent fails to connect to the WebSocket server.

    **Solution:** Verify the `WS_SECRET` and `WS_SERVER` values are correct.

2. **Issue:** Logs show the agent cannot reach the Zilliqa node.

    **Solution:** Ensure the `RPC_HOST` and `RPC_PORT` match your node's settings and are accessible.

For further assistance, please contact the Zilliqa team.
