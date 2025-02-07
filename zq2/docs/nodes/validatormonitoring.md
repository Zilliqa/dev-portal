---
id: nodes/validatormonitoring
title: Validator Monitoring 
  - Node 
  - Validator 
  - Monitor 
description: Validator Monitoring 
---

# Listing in the Network Monitoring Dashboard 

## Overview

This guide explains how to run the Docker container that integrates your node in the public network monitoring dashboard `https://stats.zq2-prototestnet.zilliqa.com/` or `https://stats.zq2-protomainnet.zilliqa.com/`.

## Prerequisites
* Docker installed on your system
* Network access to the required endpoints

### Docker Command

```
docker run -ti --platform linux/x86_64 \
    --net=host \
    -e RPC_HOST="localhost" \
    -e RPC_PORT="4202" \
    -e LISTENING_PORT="3333" \
    -e INSTANCE_NAME="node-name" \
    -e CONTACT_DETAILS="contact@example.com" \
    -e WS_SERVER="ws://stats.example.com" \
    -e WS_SECRET="<secret-value>" \
    -e VERBOSITY="2" \
    asia-docker.pkg.dev/prj-p-devops-services-tvwmrf63/zilliqa-public/eth-net-intelligence-api:v0.0.1
```

## Configuration Options

### Command-Line Options

| Option       | Description                                                                               | Default      |
| ------------ | ----------------------------------------------------------------------------------------- | ------------ |
| `--platform` | The platform architecture for the Docker container (e.g., `linux/x86_64`, `linux/arm64`, `windows/amd64`, `darwin/amd64` etc). | User-defined |
| `--net=host` | Uses the host network, allowing the container to share the network stack with the host.  | Enabled      |



## Environment Variables

| Variable          | Description                                                          | Default     |
| ----------------- | -------------------------------------------------------------------- | ----------- |
| `RPC_HOST`        | The host for the RPC server.                                         | `localhost` |
| `RPC_PORT`        | The port for the RPC server.                                         | `4202`      |
| `LISTENING_PORT`  | The port on which the monitoring instance listens.                   | `3333`      |
| `INSTANCE_NAME`   | The name assigned to this monitored node.                            | N/A         |
| `CONTACT_DETAILS` | Contact information for the node operator.                           | N/A         |
| `WS_SERVER`       | WebSocket server URL for dashboard communication.<br>For prototestnet: `ws://stats.zq2-prototestnet.zilliqa.com` <br>For protomainnet: `ws://stats.zq2-protomainnet.zilliqa.com` | N/A |
| `WS_SECRET`       | **(Confidential - shared on request)** WebSocket authentication key. | N/A         |
| `VERBOSITY`       | Logging verbosity level.                                             | `2`         |




## Security Considerations

Do not share `WS_SECRET` publicly. It should only be shared with authorized personnel.

Use environment variable management tools if deploying in production to handle secrets securely.


## Troubleshooting

**Port Conflicts**: If the specified ports are already in use, change the values accordingly.

**Connection Issues**: Ensure that `WS_SERVER` is reachable from your network.

**Docker Errors**: Verify that you have the correct permissions to run Docker and pull images.

For further assistance, reach out to the Zilliqa team if you need any support.

