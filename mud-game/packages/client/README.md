# Client Package

The frontend game client built with **Phaser.js** and **React**, providing an immersive 2D gaming experience with real-time blockchain integration.

## 🎮 Overview

This package combines the power of Phaser.js for game rendering with React for UI components, creating a responsive and engaging multiplayer game client that synchronizes with blockchain state in real-time.

### Key Features

- **Phaser.js Game Engine**: Smooth 2D rendering and animation
- **React UI Framework**: Modern component-based interface
- **Real-time Sync**: Automatic state synchronization with blockchain
- **TypeScript**: Full type safety and developer experience
- **Hot Reload**: Instant development feedback

## 🏗️ Architecture

### Layer System

The client uses a layered architecture for separation of concerns:

```
src/
├── layers/
│   ├── network/     # Blockchain communication
│   └── phaser/      # Game rendering and input
├── ui/              # React UI components
├── mud/             # MUD framework integration
└── artTypes/        # Generated sprite definitions
```

#### Network Layer (`layers/network/`)

- Manages blockchain connection and state
- Handles transaction signing and submission
- Provides real-time event listening
- Maintains local state cache

#### Phaser Layer (`layers/phaser/`)

- Renders game world and entities
- Handles user input (keyboard, mouse)
- Manages sprite animations
- Provides camera and viewport management

#### UI Layer (`ui/`)

- React components for menus and HUD
- Game state displays
- Loading screens and modals
- Settings and configuration panels

### State Management

The client uses a centralized store pattern:

```typescript
// store.ts
export const useStore = create<{
  networkLayer: NetworkLayer | null;
  phaserLayer: PhaserLayer | null;
}>(() => ({
  networkLayer: null,
  phaserLayer: null,
}));
```

- **MUD Store**: Synchronized with blockchain state
- **Local Store**: UI state and user preferences
- **React Hooks**: Easy state access in components

## 🚀 Development

### Prerequisites

- Node.js v20+
- Running MUD contracts (via `pnpm dev` in root)
- Local blockchain (Anvil)

### Scripts

```bash
# Development server with hot reload
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm test
```

### Environment Configuration

Create `.env` file for local configuration:

```env
# Optional: Custom RPC endpoint
VITE_RPC_URL=http://localhost:8545

# Optional: Enable debug logging
VITE_DEBUG=true
```

## 🎨 Game Systems

### Player Movement

```typescript
// Input handling in Phaser layer
const cursors = this.input.keyboard.createCursorKeys();

// Movement with blockchain integration
if (cursors.left.isDown) {
  systemCalls.move(Direction.Left);
}
```

### Sprite Management

```typescript
// Auto-generated from art package
import { Sprites } from "../artTypes/world";

// Type-safe sprite loading
this.load.atlas(
  Sprites.Golem.Idle.assetKey,
  Sprites.Golem.Idle.imagePath,
  Sprites.Golem.Idle.jsonPath
);
```

### Real-time Updates

```typescript
// Automatic re-rendering on blockchain state changes
const playerPositions = useEntityQuery([Has(PlayerPosition)]);

// Component automatically updates when positions change
return (
  <div>
    {playerPositions.map(player => (
      <PlayerMarker key={player} entity={player} />
    ))}
  </div>
);
```

## 🔧 Configuration

### Vite Configuration

Optimized for game development:

```typescript
// vite.config.ts highlights
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    fs: {
      strict: false, // Allow art package access
    },
  },
  define: {
    global: "globalThis", // Phaser compatibility
  },
});
```

### TypeScript Configuration

Strict type checking with game-specific paths:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "paths": {
      "contracts/*": ["../contracts/src/*"]
    }
  }
}
```

## 🎯 Key Components

### App.tsx

Main application component that:

- Initializes network layer
- Sets up development tools
- Renders game and UI layers

### PhaserLayer.tsx

Phaser game integration:

- Creates Phaser game instance
- Handles canvas mounting
- Manages game lifecycle

### Hooks

Custom React hooks for:

- `useNetworkLayer()` - Blockchain connection
- `useEntityQuery()` - Game state queries
- `useComponentValue()` - Component data access

## 📱 Responsive Design

The client adapts to different screen sizes:

- **Desktop**: Full-screen game with side panels
- **Tablet**: Touch-friendly controls
- **Mobile**: Simplified UI with gesture support

## 🐛 Debugging

### Development Tools

Integrated MUD dev tools provide:

- Real-time blockchain state inspection
- Transaction history and debugging
- Component and system monitoring

### Debug Console

```typescript
// Enable debug logging
localStorage.setItem("debug", "mud:*");

// Access game layers from console
window.__mud = {
  networkLayer: store.getState().networkLayer,
  phaserLayer: store.getState().phaserLayer,
};
```

### Common Issues

**Game won't load**: Check that contracts are deployed and Anvil is running

**Slow performance**: Disable dev tools in production builds

**Type errors**: Regenerate MUD types with `pnpm mud tablegen`

## 🚢 Deployment

### Production Build

```bash
pnpm build
```

Generates optimized static files in `dist/`.

### Hosting Options

- **Static hosting**: Vercel, Netlify, GitHub Pages
- **CDN**: AWS CloudFront, Cloudflare
- **IPFS**: Decentralized hosting

### Environment Variables

For production deployment:

```env
VITE_CHAIN_ID=1
VITE_RPC_URL=https://eth-mainnet.alchemyapi.io/v2/YOUR_KEY
VITE_WORLD_ADDRESS=0x...
```

## 🤝 Contributing

### Adding New Features

1. **Game Systems**: Add to Phaser layer
2. **UI Components**: Create in `ui/` directory
3. **State Management**: Extend store if needed
4. **Types**: Update interfaces and run codegen

### Code Style

- Use TypeScript for all new code
- Follow React hooks patterns
- Prefer functional components
- Add JSDoc comments for complex logic

### Testing

```bash
# Type checking
pnpm test

# Manual testing
pnpm dev
# Open http://localhost:3000
```

---

**Ready to build the next generation of onchain games! 🎮⛓️**
