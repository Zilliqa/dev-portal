### [Software requirements](#software-requirements)

1. Operating System: We build and run on Ubuntu 24.04LTS or above
2. Docker: 27.0.3+

Additional system dependencies:
- `libclang-dev`: Required for compiling certain components
- `rocksdb-tools`: Provides utilities for managing RocksDB instances
- `python3-venv`: Enables creation of Python virtual environments for services

#### Ansible Playbook Support
We provide Ansible playbooks to streamline node setup and package management:
- `infra/ansible/playbooks/install_packages.yml`: Ensures required packages are installed
- `infra/ansible/playbooks/install_rocksdb_tools.yml`: Installs RocksDB tools
- `infra/ansible/playbooks/upgrade_ubuntu.yml`: Supports upgrading to Ubuntu 24.04+

Note: Python services now use a virtual environment located at `/opt/zilliqa/venv` to improve dependency isolation and management.