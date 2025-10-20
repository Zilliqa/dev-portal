## Performance and Resource Configuration

Zilliqa 2.0 provides advanced configuration options to optimize node performance and resource utilization. These settings allow node operators to fine-tune their node's behavior based on available hardware and specific network requirements.

### Cache and Memory Optimization

Zilliqa 2.0 provides fine-grained control over internal cache sizes to prevent Out-Of-Memory (OOM) issues:

- `state_cache_size`: Controls the size of the state cache. 
  - **Default**: `67108864` bytes (64 MB)
  - **Purpose**: Limits memory used for caching blockchain state
  - **Recommendation**: Adjust based on your node's available memory

- `db.conn_cache_size`: Limits the number of SQLite database connections.
  - **Default**: `128` connections
  - **Purpose**: Prevents excessive database connection overhead

- `sled` Temporary Database Cache:
  - **Default**: `1024 * 1024` bytes (1 MB)
  - **Purpose**: Controls memory used by the internal key-value store

### RPC Handler Performance

Zilliqa 2.0 introduces categorization of RPC handlers to improve responsiveness:

- `slow_rpc_queries_handlers_count`: Configures dedicated threads for complex RPC queries
  - **Type**: `usize`
  - **Default**: `1`
  - **Purpose**: Manages threads for longer-running RPC methods
  - **Affected Methods**: `admin`, `debug`, `erigon`, `ots`, `trace`, `txpool`, `zilliqa`
  - **Recommendation**: Increase if experiencing slow RPC response times, but be mindful of resource consumption

### Contract State Query Optimization

- `disable_get_full_state_for_contracts`: Prevents `GetSmartContractState` queries for specific contract addresses
  - **Purpose**: Mitigate performance issues for high-volume or problematic contracts
  - **Usage**: Configure to limit state retrieval for specific contracts

_Note: These configuration options should be set in your node's configuration file. Always monitor your node's performance and adjust settings based on your specific infrastructure and network conditions._