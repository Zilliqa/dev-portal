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

[OpenTelemetry](https://opentelemetry.io/) is an open-source observability framework designed to generate, collect, and manage telemetry data (metrics, traces, and logs) in distributed systems. It provides a standardized way to instrument, generate, collect, and export telemetry data for analysis, making it easier to monitor and troubleshoot complex distributed applications.

## Integration with Zilliqa

A Zilliqa node contains various performance and operational metrics compatible with the OpenTelemetry protocol specification. These metrics are useful for:

- Monitoring node performance and health
- Understanding system behavior under different conditions
- Enabling proactive maintenance and troubleshooting

To export the OpenTelemetry metrics, you can define a [collector](https://github.com/open-telemetry/opentelemetry-collector) endpoint with the `--otlp-endpoint` parameter in `z2 join` pointing to your own OpenTelemetry monitoring stack, for example:

```bash
z2 join --chain zq2-prototestnet --otlp-endpoint=http://localhost:4317
```

## Local Testing

For local testing of the OpenTelemetry stack with the Zilliqa nodes, you can use the provided Docker Compose project in the `infra/opentelemetry` folder of the [zq2 repository](https://github.com/Zilliqa/zq2), and run:

```bash
docker-compose up -d
```

This will deploy a Zilliqa environment with the complete OpenTelemetry toolset and once deployed, the metrics can be visualized through Grafana at [http://localhost:9010](http://localhost:9010).