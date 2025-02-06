---
id: nodes/nodemonitoring
title: Node Monitoring 
  - Node 
  - Monitor 
description: Node Monitoring 
---

# Running Network Monitoring Dashboard with Docker

## Overview

This guide explains how to run an Ethereum network monitoring dashboard using Docker. The provided command allows you to configure various environment variables to suit your deployment needs.

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

Do not share WS_SECRET publicly. It should only be shared with authorized personnel.

Use environment variable management tools if deploying in production to handle secrets securely.

## Running the Command

To execute the above command, simply copy and paste it into your terminal. Ensure that all required parameters are correctly set before running.

## Troubleshooting

**Port Conflicts**: If the specified ports are already in use, change the values accordingly.

**Connection Issues**: Ensure that WS_SERVER is reachable from your network.

**Docker Errors**: Verify that you have the correct permissions to run Docker and pull images.

## Additional Notes

For further assistance, reach out to the Zilliqa team if you need any support.

