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
z2 join --chain zq2-prototestnet --otlp-endpoint=http://localhost:4317
```

This endpoint should point to a OpenTelemetry compatible [collector](https://opentelemetry.io/docs/collector/) 
in your monitoring stack such as:

- [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector)
- [Ops Agent](https://cloud.google.com/monitoring/agent/ops-agent/otlp)