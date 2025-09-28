# Development Guide

Comprehensive guide for developing, testing, and deploying the MUD game project.

## 🚀 Development Environment Setup

### System Requirements

- **Node.js**: v20.0.0 or higher
- **pnpm**: v9.0.0 or higher
- **Git**: Latest stable version
- **Visual Studio Code**: Recommended IDE

### Initial Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mud-game
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Install Foundry** (if not already installed)

   ```bash
   pnpm foundry:up
   ```

4. **Start development environment**
   ```bash
   pnpm dev
   ```

### Development Workflow

#### Daily Development

1. **Start all services**

   ```bash
   pnpm dev  # Starts Anvil, contracts, client, and explorer
   ```

2. **Make changes** to any package
3. **Hot reload** automatically applies changes
4. **Test changes** in browser at http://localhost:5173
5. **Inspect state** using MUD Explorer at http://localhost:13690

#### Package-specific Development

```bash
# Work on client only
pnpm dev:client

# Work on contracts only
pnpm dev:contracts

# Process art assets
cd packages/art && pnpm build
```

## 🏗️ Project Structure Deep Dive

### Monorepo Architecture

```
mud-game/
├── packages/
│   ├── client/          # React + Phaser frontend
│   ├── contracts/       # Solidity smart contracts
│   └── art/            # Asset pipeline
├── mprocs.yaml         # Multi-process orchestration
├── pnpm-workspace.yaml # Workspace configuration
└── package.json        # Root package configuration
```

### Shared Dependencies

- **MUD Framework**: Core blockchain integration
- **TypeScript**: Type safety across all packages
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting

## 🔧 Configuration Files

### Root Level

- `mprocs.yaml`: Defines development processes
- `pnpm-workspace.yaml`: Package workspace configuration
- `tsconfig.json`: Base TypeScript configuration
- `.eslintrc`: Linting rules

### Package Level

- `package.json`: Dependencies and scripts per package
- `tsconfig.json`: Package-specific TypeScript settings
- `.env`: Environment variables

## 🧪 Testing Strategy

### Unit Testing

```bash
# Run all tests
pnpm test

# Test specific package
pnpm --filter contracts test
pnpm --filter client test
```

### Contract Testing

```bash
cd packages/contracts

# Run all contract tests
forge test

# Run with gas reporting
forge test --gas-report

# Run specific test
forge test --match-test testMove

# Run with coverage
forge coverage
```

### Integration Testing

1. **Start development environment**: `pnpm dev`
2. **Open browser**: http://localhost:5173
3. **Test user flows**: Movement, interactions, etc.
4. **Check MUD Explorer**: Verify blockchain state

### End-to-End Testing

```bash
# Future: Playwright/Cypress tests
pnpm test:e2e
```

## 🚢 Deployment Guide

### Local Development Deployment

Already configured with `pnpm dev` - includes:

- Local Anvil blockchain
- Automatic contract deployment
- Client development server
- MUD Explorer

### Testnet Deployment

#### 1. Setup Environment

```bash
cd packages/contracts
cp .env.example .env
```

Edit `.env` with:

```env
PRIVATE_KEY=0x... # Your testnet private key
RPC_URL_SEPOLIA=https://sepolia.infura.io/v3/YOUR_KEY
ETHERSCAN_API_KEY=YOUR_KEY
```

#### 2. Deploy Contracts

```bash
# Deploy to Sepolia testnet
pnpm --filter contracts mud:deploy --profile sepolia

# Verify contracts (optional)
pnpm --filter contracts mud:verify --network sepolia
```

#### 3. Configure Client

```bash
cd packages/client
cp .env.example .env
```

Edit with deployed contract addresses:

```env
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
VITE_WORLD_ADDRESS=0x... # From deployment output
```

#### 4. Build and Deploy Client

```bash
pnpm --filter client build

# Deploy to hosting service (Vercel, Netlify, etc.)
# Upload dist/ folder contents
```

### Production Deployment

⚠️ **Use extreme caution when deploying to mainnet!**

#### Pre-deployment Checklist

- [ ] All tests passing
- [ ] Security audit completed
- [ ] Gas optimization reviewed
- [ ] Deployment scripts tested on testnets
- [ ] Emergency pause mechanisms implemented
- [ ] Monitoring and alerting set up

#### Mainnet Deployment

```bash
# Deploy contracts to mainnet
pnpm --filter contracts mud:deploy --profile mainnet

# Verify contracts
pnpm --filter contracts mud:verify --network mainnet

# Deploy client with mainnet configuration
VITE_CHAIN_ID=1 \
VITE_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY \
VITE_WORLD_ADDRESS=0x... \
pnpm --filter client build
```

## 📊 Monitoring and Debugging

### Development Monitoring

#### MUD Explorer

- **URL**: http://localhost:13690
- **Features**: Real-time state inspection, transaction history
- **Usage**: Debug contract state, verify transactions

#### Browser DevTools

- **Console**: Client-side debugging
- **Network**: Monitor RPC calls
- **Performance**: Profile rendering

### Production Monitoring

#### Blockchain Monitoring

- **Etherscan**: Transaction and contract monitoring
- **The Graph**: Custom indexing and queries
- **Alchemy/Infura**: RPC metrics and alerts

#### Client Monitoring

- **Sentry**: Error tracking and performance
- **Google Analytics**: User behavior
- **Web Vitals**: Performance metrics

### Debugging Techniques

#### Contract Debugging

```bash
# Debug failed transaction
cast run <tx_hash> --debug

# Trace contract calls
cast trace <tx_hash>

# Call view functions
cast call $WORLD_ADDRESS "PlayerPosition(address)" $PLAYER_ADDRESS
```

#### Client Debugging

```javascript
// Enable debug logging
localStorage.setItem("debug", "mud:*");

// Access global objects
window.__mud.networkLayer;
window.__mud.phaserLayer;

// Monitor state changes
useEffect(() => {
  console.log("Player position changed:", playerPosition);
}, [playerPosition]);
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "20"
      - run: pnpm install
      - run: pnpm test
      - run: pnpm build

  deploy-testnet:
    if: github.ref == 'refs/heads/main'
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy contracts
        run: pnpm --filter contracts mud:deploy --profile sepolia
      - name: Deploy client
        run: |
          pnpm --filter client build
          # Deploy to hosting service
```

### Deployment Automation

```bash
# scripts/deploy.sh
#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Test everything
pnpm test

# Deploy contracts
pnpm --filter contracts mud:deploy --profile $NETWORK

# Build and deploy client
pnpm --filter client build

echo "✅ Deployment complete!"
```

## 🛠️ Development Tools

### Recommended VS Code Extensions

- **Solidity**: Syntax highlighting and IntelliSense
- **TypeScript Hero**: Import organization
- **ESLint**: Real-time linting
- **Prettier**: Code formatting
- **Git Lens**: Enhanced git integration
- **Thunder Client**: API testing

### Useful Commands

```bash
# Update MUD to latest version
pnpm mud:up

# Clean and reinstall all dependencies
pnpm clean && pnpm install

# Generate fresh TypeScript types
pnpm --filter contracts mud tablegen

# Check for outdated dependencies
pnpm outdated

# Analyze bundle size
pnpm --filter client build --analyze
```

## 📚 Best Practices

### Code Organization

1. **Modular Architecture**: Keep concerns separated
2. **Type Safety**: Use TypeScript everywhere
3. **Consistent Naming**: Follow established conventions
4. **Documentation**: Comment complex logic
5. **Testing**: Write tests for critical functionality

### Git Workflow

1. **Feature Branches**: Create branches for each feature
2. **Commit Messages**: Use conventional commits
3. **Pull Requests**: Code review before merging
4. **Tags**: Version releases appropriately

### Performance Optimization

1. **Bundle Analysis**: Monitor client bundle size
2. **Gas Optimization**: Profile contract gas usage
3. **Asset Optimization**: Compress images and sprites
4. **Caching**: Implement appropriate caching strategies

### Security Considerations

1. **Private Keys**: Never commit private keys
2. **Environment Variables**: Use secure storage
3. **Input Validation**: Validate all user inputs
4. **Access Control**: Implement proper permissions
5. **Auditing**: Regular security reviews

## 🆘 Troubleshooting

### Common Issues

#### "Port already in use"

```bash
# Find and kill process using port 8545
lsof -ti:8545 | xargs kill -9
```

#### "Foundry not found"

```bash
# Reinstall Foundry
pnpm foundry:up
```

#### "Client won't connect to contracts"

1. Check Anvil is running
2. Verify contract deployment
3. Check network configuration
4. Restart development environment

#### "Type errors after schema changes"

```bash
# Regenerate types
pnpm --filter contracts mud tablegen
```

#### "Slow client performance"

1. Disable dev tools in production
2. Check bundle size
3. Profile with browser devtools
4. Optimize asset loading

### Getting Help

1. **Check logs**: Look at terminal output for errors
2. **MUD Discord**: Active community support
3. **GitHub Issues**: Search existing issues
4. **Documentation**: Reference MUD docs
5. **Stack Overflow**: General development questions

## 📈 Performance Metrics

### Client Metrics

- **Bundle Size**: < 1MB compressed
- **Load Time**: < 3 seconds on 3G
- **FPS**: 60fps on modern devices
- **Memory Usage**: < 100MB RAM

### Contract Metrics

- **Gas Usage**: Optimize for < 100k gas per transaction
- **Deployment Cost**: Monitor total deployment gas
- **Storage Efficiency**: Use MUD's packed storage

### Monitoring Dashboard

Set up dashboards to track:

- Active users
- Transaction volume
- Error rates
- Performance metrics

---

**Happy building! 🚀⚡**
