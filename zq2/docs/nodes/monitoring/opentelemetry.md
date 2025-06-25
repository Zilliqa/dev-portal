---
id: nodes/monitoring/opentelemetry
title: OpenTelemetry
keywords:
  - Node 
  - Validator 
  - Monitor
  - OpenTelemetry
  - Metrics
description: OpenTelemetry
---

# OpenTelemetry Metrics

[OpenTelemetry](https://opentelemetry.io/) is an open-source observability framework designed to generate,
collect, and manage telemetry data (metrics, traces, and logs) in distributed systems. It provides a
standardized way to instrument, generate, collect, and export telemetry data for analysis, making it easier
to monitor and troubleshoot complex distributed applications.

## Integration with Zilliqa

A Zilliqa node contains various performance and operational metrics compatible with the OpenTelemetry
protocol specification. These metrics are useful for:

- Monitoring node performance and health
- Understanding system behavior under different conditions
- Enabling proactive maintenance and troubleshooting

To export the OpenTelemetry metrics, you can define a collector endpoint with the `--otlp-endpoint`
parameter in `z2 join`, for example `http://localhost:4317`:

```bash
z2 join --chain zq2-mainnet --otlp-endpoint=http://localhost:4317
```

This endpoint should point to a OpenTelemetry compatible [collector](https://opentelemetry.io/docs/collector/) 
in your monitoring stack such as:

- [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector)
- [Ops Agent](https://cloud.google.com/monitoring/agent/ops-agent/otlp)

## Local Testing

For local testing of the OpenTelemetry integration and metrics with the Zilliqa nodes, you can use the provided Docker
Compose project in the `infra/opentelemetry` folder of the [zq2 repository](https://github.com/Zilliqa/zq2), and run from the root path:

```bash
docker-compose -f infra/opentelemetry/compose.yaml up -d
```

This will deploy a Zilliqa environment configured with the OpenTelemetry toolset, and once deployed,
the metrics can be visualized through Grafana in the sample ZQ2 OpenTelemetry
dashboard in [http://localhost:9010/d/fefb64au9pd6ob/zq2-opentelemetry](http://localhost:9010/d/fefb64au9pd6ob/zq2-opentelemetry).

Note that in order to see some metrics, RPC sample calls should be generated in the ZQ2 nodes and they will be visible after some seconds. For example:

```bash
curl --request POST --url http://localhost:4211 --header 'content-type: application/json' --data '{"method":"GetVersion","id":1,"jsonrpc":"2.0"}'
```