# MUD Game - Phaser Edition

A complete MUD game built with **MUD framework v2.2.21** and **Phaser.js**, featuring onchain game mechanics, real-time multiplayer gameplay, and pixel art aesthetics.

## 🎮 Overview

This project is a modern take on classic games, combining the autonomous world paradigm with engaging 2D gameplay. Built on Ethereum using the MUD framework, it provides:

- **Onchain Game Logic**: All game state and mechanics are stored and executed on the blockchain
- **Real-time Client**: Responsive Phaser.js-based game client with pixel art graphics
- **Multiplayer**: Multiple players can interact in the same persistent world
- **Extensible**: Modular architecture allows for easy feature additions

## 🏗️ Architecture

```
mud-game/
├── packages/
│   ├── client/          # Phaser.js frontend with React UI
│   ├── contracts/       # MUD world contracts and game logic
│   └── art/            # Sprite assets and Tiled map files
├── mprocs.yaml         # Multi-process orchestration
└── package.json        # Monorepo configuration
```

### Core Components

- **Client**: React + Phaser.js frontend with real-time game rendering
- **Contracts**: Solidity smart contracts defining game world and mechanics
- **Art Pipeline**: Automated sprite processing and tileset management
- **Development Tools**: Integrated blockchain explorer and hot-reload

## 🚀 Quick Start

### Prerequisites

- **Node.js** v20+
- **pnpm** v9+
- **Foundry** (automatically installed via setup script)

### Installation

1. **Clone and install dependencies**

   ```bash
   cd mud-game
   pnpm install
   ```

2. **Start the development environment**

   ```bash
   pnpm dev
   ```

   This launches all services simultaneously:

   - Anvil local blockchain (port 8545)
   - Smart contracts deployment and hot-reload
   - Client development server (typically port 5173)
   - MUD Explorer (blockchain inspector)

3. **Open your browser**
   - Game client: http://localhost:5173
   - MUD Explorer: http://localhost:13690

## 🎯 Game Features

### Current Implementation

- **Player Movement**: Arrow key navigation with onchain position tracking
- **Real-time Sync**: Automatic state synchronization between blockchain and client
- **Pixel Art Graphics**: Sprite-based character animations and world tiles
- **Multi-player**: See other players moving in real-time

### Planned Features

- Combat system with RPG mechanics
- Inventory and item management
- Quests and NPC interactions
- Territory control and guilds

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start full development environment
- `pnpm dev:client` - Client only (requires running contracts)
- `pnpm dev:contracts` - Contracts only
- `pnpm build` - Build all packages for production
- `pnpm test` - Run all tests

### Project Structure

```
packages/client/src/
├── mud/                 # MUD integration layer
├── layers/              # Game architecture layers
│   ├── network/         # Blockchain interaction
│   └── phaser/          # Game rendering
├── ui/                  # React UI components
└── artTypes/           # Generated sprite type definitions

packages/contracts/src/
├── systems/            # Game logic systems
├── codegen/           # Auto-generated MUD code
└── script/            # Deployment scripts

packages/art/
├── sprites/           # Source sprite animations
├── tilesets/         # Map tiles and assets
└── scripts/          # Asset processing tools
```

### Key Technologies

- **MUD Framework**: Autonomous world infrastructure
- **Phaser.js**: 2D game engine
- **React**: UI framework
- **Vite**: Build tool and dev server
- **Foundry**: Ethereum development toolkit
- **TypeScript**: Type-safe development

## 🎨 Art Pipeline

The art package includes an automated pipeline for processing sprites and tilesets:

```bash
cd packages/art
pnpm build  # Process all sprites and generate type definitions
```

- Sprites are organized by entity (coin, golem, etc.)
- Each entity can have multiple animations (idle, attack, death)
- Tiled map editor integration for world design
- Automatic TypeScript type generation

## 🔗 Blockchain Integration

### Smart Contract Structure

The game uses MUD's table-based architecture:

- **PlayerPosition**: Stores player coordinates
- **Movement Systems**: Handle player movement validation
- **World Configuration**: Defines game rules and parameters

### State Synchronization

- **Client-side prediction**: Immediate visual feedback
- **Onchain validation**: All moves verified by smart contracts
- **Automatic sync**: Real-time updates from blockchain events

## 📱 Client Architecture

### Layer System

1. **Network Layer**: Handles blockchain communication and state management
2. **Phaser Layer**: Manages game rendering, sprites, and user input
3. **UI Layer**: React components for menus, HUD, and overlays

### State Management

- **MUD Store**: Centralized state synchronized with blockchain
- **React Integration**: Hooks for accessing game state in UI
- **Real-time Updates**: Automatic re-rendering on state changes

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Test specific package
pnpm --filter contracts test
pnpm --filter client test
```

## 🚢 Deployment

### Local Development

Already configured! Just run `pnpm dev`.

### Testnet Deployment

1. Configure network settings in `packages/contracts/mud.config.ts`
2. Set environment variables for RPC URLs and private keys
3. Deploy contracts: `pnpm --filter contracts deploy:testnet`
4. Update client network configuration
5. Build and host client: `pnpm --filter client build`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-system`
3. Make your changes following the existing code style
4. Add tests for new functionality
5. Submit a pull request

### Code Style

- TypeScript for all new code
- ESLint configuration enforced
- Consistent naming conventions
- Comprehensive JSDoc comments for public APIs

## 📚 Resources

- [MUD Framework Documentation](https://mud.dev)
- [Phaser.js Documentation](https://phaser.io/learn)
- [Foundry Documentation](https://book.getfoundry.sh)
- [Autonomous Worlds Primer](https://0xparc.org/blog/autonomous-worlds)

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

**Port conflicts**: If ports 8545 or 5173 are busy, stop other processes or modify `mprocs.yaml`

**Foundry not found**: Run `pnpm foundry:up` to install Foundry

**Client won't connect**: Ensure Anvil is running and contracts are deployed (check MUD Explorer)

**Build errors**: Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`

### Getting Help

- Check the [MUD Discord](https://discord.gg/latticeXYZ) for community support
- Review example projects in the [MUD repository](https://github.com/latticexyz/mud)
- File issues for bugs or feature requests

---

**Happy building! 🎮⛓️**
