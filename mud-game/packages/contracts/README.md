# Contracts Package

The blockchain backend powering the MUD game, built with **Solidity** smart contracts using the **MUD framework v2.2.21** for autonomous world mechanics.

## 🏗️ Overview

This package contains all the smart contracts that define the game's rules, state, and mechanics. Using MUD's table-based architecture, the game state is stored entirely onchain, enabling true decentralization and composability.

### Key Features

- **Autonomous World**: Fully onchain game logic
- **MUD Framework**: Leverages MUD v2 for optimal gas efficiency
- **Modular Systems**: Clean separation of game mechanics
- **Type Safety**: Generated TypeScript bindings
- **Hot Reload**: Development-friendly contract updates

## 📋 Smart Contract Architecture

### Tables (Data Schema)

MUD uses a table-based approach for data storage:

```typescript
// mud.config.ts
tables: {
  PlayerPosition: {
    schema: {
      player: "address",
      x: "int32",
      y: "int32",
    },
    key: ["player"],
  },
  CoinPosition: {
    schema: {
      x: "int32",
      y: "int32",
      exists: "bool",
    },
    key: ["x", "y"],
  },
  PlayerCoins: {
    schema: {
      player: "address",
      coins: "uint32",
    },
    key: ["player"],
  },
}
```

### Systems (Game Logic)

#### GameSystem.sol

Core game mechanics including:

```solidity
contract GameSystem is System {
  // Spawn player at coordinates
  function spawn(int32 x, int32 y) public;

  // Move player in direction
  function move(Direction direction) public;

  // Generate coins on the map
  function generateCoins() public;
}
```

**Key Functions:**

- `spawn(x, y)`: Places player at starting position
- `move(direction)`: Validates and executes player movement
- `generateCoins()`: Places collectible coins in the world

### Enums

```solidity
enum Direction {
  Up,
  Down,
  Left,
  Right
}
```

## 🚀 Development

### Prerequisites

- **Foundry**: Ethereum development toolkit
- **Node.js** v20+
- **pnpm** v9+

### Scripts

```bash
# Start local development blockchain
pnpm dev

# Deploy contracts to local network
pnpm mud deploy

# Run contract tests
pnpm test

# Generate TypeScript bindings
pnpm mud tablegen

# Start MUD explorer
pnpm explorer
```

### Development Workflow

1. **Edit contracts** in `src/systems/`
2. **Update schema** in `mud.config.ts`
3. **Hot reload** automatically redeploys
4. **Test changes** via client or explorer

## 🔧 Configuration

### mud.config.ts

Core configuration file defining:

```typescript
export default defineWorld({
  namespace: "app",
  enums: {
    Direction: ["Up", "Down", "Left", "Right"],
  },
  tables: {
    // Table definitions...
  },
  modules: [
    // Additional MUD modules
  ],
});
```

### foundry.toml

Foundry configuration:

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
fs_permissions = [{access = "read-write", path = "./"}]
```

### Environment Variables

Create `.env` for network configuration:

```env
# Private key for deployment (use test key only!)
PRIVATE_KEY=0x...

# RPC endpoints for different networks
RPC_URL_ANVIL=http://localhost:8545
RPC_URL_SEPOLIA=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY

# Etherscan API key for verification
ETHERSCAN_API_KEY=YOUR_KEY
```

## 📊 Data Architecture

### Table Relationships

```
PlayerPosition ────┐
                   ├─── Player Game State
PlayerCoins ───────┘

CoinPosition ─────── World Objects
```

### Gas Optimization

MUD automatically optimizes:

- **Packed storage**: Efficient data packing
- **Batch operations**: Multiple updates in single transaction
- **Event indexing**: Efficient client synchronization

## 🧪 Testing

### Test Structure

```
test/
├── GameSystem.t.sol    # Core game mechanics tests
├── Movement.t.sol      # Movement validation tests
└── Integration.t.sol   # Multi-system tests
```

### Running Tests

```bash
# All tests
pnpm test

# Specific test file
forge test --match-path test/GameSystem.t.sol

# With gas reporting
forge test --gas-report

# With coverage
forge coverage
```

### Example Test

```solidity
contract GameSystemTest is MudTest {
  function testMove() public {
    // Setup
    gameSystem.spawn(0, 0);

    // Execute
    gameSystem.move(Direction.Right);

    // Verify
    PlayerPositionData memory pos = PlayerPosition.get(alice);
    assertEq(pos.x, 1);
    assertEq(pos.y, 0);
  }
}
```

## 🌐 Network Deployment

### Local Development

```bash
# Start Anvil (local blockchain)
anvil --base-fee 0 --block-time 2

# Deploy contracts
pnpm mud deploy --profile local
```

### Testnet Deployment

```bash
# Deploy to Sepolia
pnpm mud deploy --profile sepolia

# Verify contracts
pnpm mud verify --network sepolia
```

### Mainnet Deployment

```bash
# Deploy to mainnet (use with caution!)
pnpm mud deploy --profile mainnet
```

## 📡 Integration

### Client Integration

Contracts automatically generate TypeScript bindings:

```typescript
// Generated in src/codegen/
import { PlayerPosition, CoinPosition } from "./codegen/index.sol";

// Usage in client
const playerPos = useComponentValue(PlayerPosition, playerEntity);
```

### External Tools

- **MUD Explorer**: Real-time contract state inspection
- **Foundry**: Testing and deployment toolkit
- **Hardhat**: Alternative development environment

## 🔍 Debugging

### MUD Explorer

Access at http://localhost:13690 when running `pnpm dev`:

- View all table data in real-time
- Monitor transaction history
- Debug system calls
- Inspect world state

### Console Debugging

```bash
# View recent transactions
cast rpc anvil_dumpState

# Check contract deployment
cast code $WORLD_ADDRESS

# Call contract functions
cast call $WORLD_ADDRESS "function_signature()"
```

### Common Issues

**Deployment fails**: Check Anvil is running and funded

**Client sync issues**: Verify world address in client config

**Gas errors**: Review gas limits in foundry.toml

**Type errors**: Run `pnpm mud tablegen` after schema changes

## 🎯 Game Mechanics

### Current Systems

1. **Player Management**

   - Spawn players at coordinates
   - Track player positions
   - Prevent invalid moves

2. **World Objects**

   - Place collectible coins
   - Handle coin collection
   - Update player inventory

3. **Movement System**
   - Validate movement boundaries
   - Update positions atomically
   - Emit events for client sync

### Planned Features

- **Combat System**: Player vs player battles
- **Inventory Management**: Item storage and trading
- **Territory Control**: Land ownership mechanics
- **Quest System**: NPCs and objectives

## 🔐 Security Considerations

### Access Control

```solidity
// Only player can move themselves
function move(Direction direction) public {
  address player = _msgSender();
  // ... rest of function
}
```

### Input Validation

```solidity
// Prevent invalid coordinates
function spawn(int32 x, int32 y) public {
  require(x >= 0 && x < MAX_X, "Invalid X coordinate");
  require(y >= 0 && y < MAX_Y, "Invalid Y coordinate");
  // ... rest of function
}
```

### Best Practices

- All state changes emit events
- Input validation on all public functions
- Use MUD's built-in access control
- Regular security audits

## 📈 Gas Optimization

### Efficient Operations

- Batch multiple updates using MUD's batch calls
- Pack related data in same table
- Use events instead of storage for temporary data
- Optimize frequently called functions

### Monitoring

```bash
# Gas usage report
forge test --gas-report

# Profile specific function
forge debug --debug path/to/test.sol --sig "test_function()"
```

## 🤝 Contributing

### Adding New Systems

1. Create contract in `src/systems/`
2. Add to mud.config.ts if needed
3. Write comprehensive tests
4. Document public functions
5. Test gas usage

### Schema Changes

1. Update `mud.config.ts`
2. Run `pnpm mud tablegen`
3. Update client types
4. Test migration if needed

### Code Style

- Follow Solidity style guide
- Use natspec comments
- Consistent naming conventions
- Comprehensive test coverage

---

**Building the future of autonomous worlds! ⛓️🌍**
