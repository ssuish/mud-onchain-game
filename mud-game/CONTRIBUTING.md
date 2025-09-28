# Contributing Guide

Welcome to the MUD Game project! We're excited to have you contribute to the future of autonomous worlds and onchain gaming.

## 🤝 How to Contribute

### Types of Contributions

We welcome all kinds of contributions:

- 🐛 **Bug Reports**: Found something broken? Let us know!
- ✨ **Feature Requests**: Have ideas for new game mechanics?
- 🎨 **Art Assets**: Create sprites, animations, or UI elements
- 📝 **Documentation**: Improve guides and explanations
- 🔧 **Code**: Fix bugs or implement new features
- 🧪 **Testing**: Help improve test coverage
- 🎮 **Game Design**: Contribute to gameplay mechanics

## 🚀 Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/mud-game.git
cd mud-game

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/mud-game.git
```

### 2. Set Up Development Environment

```bash
# Install dependencies
pnpm install

# Install Foundry (if needed)
pnpm foundry:up

# Start development environment
pnpm dev
```

### 3. Create a Branch

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

## 📋 Development Guidelines

### Code Style

#### TypeScript/JavaScript

- Use **TypeScript** for all new code
- Follow **ESLint** configuration
- Use **Prettier** for formatting
- Prefer **functional components** in React
- Use **meaningful variable names**

```typescript
// ✅ Good
const calculatePlayerMovement = (direction: Direction): Position => {
  // Implementation
};

// ❌ Avoid
const calc = (d) => {
  // Implementation
};
```

#### Solidity

- Follow **MUD conventions** for contracts
- Use **natspec comments** for public functions
- Implement **comprehensive tests**
- Optimize for **gas efficiency**

```solidity
// ✅ Good
/**
 * @notice Moves a player to a new position
 * @param direction The direction to move
 */
function move(Direction direction) public {
    address player = _msgSender();
    // Implementation
}

// ❌ Avoid
function move(Direction direction) public {
    // No documentation
}
```

### Commit Messages

Use **Conventional Commits** format:

```bash
# Format: type(scope): description

# Examples:
feat(client): add player inventory system
fix(contracts): resolve movement validation bug
docs(readme): update installation instructions
style(client): format code with prettier
test(contracts): add movement system tests
refactor(client): extract player component
```

### Testing

#### Contract Tests

```bash
# Write tests for all contract functions
cd packages/contracts
forge test

# Test specific function
forge test --match-test testPlayerMovement

# With gas reporting
forge test --gas-report
```

#### Client Tests

```bash
# Type checking
pnpm --filter client test

# Add unit tests for utilities
# Integration tests for components
```

## 🎨 Contributing Art Assets

### Sprite Guidelines

1. **Style**: Pixel art, 16x16 or 32x32 base size
2. **Format**: PNG with transparency
3. **Naming**: Use descriptive, kebab-case names
4. **Organization**: Follow existing folder structure

```
sprites/
└── new-character/
    ├── idle/
    │   ├── 001.png
    │   ├── 002.png
    │   └── ...
    └── walk/
        ├── 001.png
        └── ...
```

### Tileset Contributions

1. **Use Tiled Map Editor** for consistency
2. **32x32 tile size** standard
3. **Organize by theme** (dungeon, forest, etc.)
4. **Include collision data**

## 🎮 Game Design Contributions

### Proposing New Features

1. **Create an issue** describing the feature
2. **Explain the problem** it solves
3. **Describe the solution** in detail
4. **Consider implications** for gameplay balance
5. **Discuss with maintainers** before implementing

### Balancing Considerations

- **Gas costs**: How does it affect transaction fees?
- **Gameplay**: Is it fun and engaging?
- **Onchain state**: Can it be efficiently stored?
- **Multiplayer**: How does it affect other players?

## 🐛 Bug Reports

### Creating Good Bug Reports

```markdown
## Bug Description

Clear description of what's broken

## Steps to Reproduce

1. Go to ...
2. Click on ...
3. See error

## Expected Behavior

What should have happened

## Actual Behavior

What actually happened

## Environment

- OS: [e.g., macOS 12.0]
- Node version: [e.g., 20.1.0]
- Browser: [e.g., Chrome 115]

## Screenshots/Logs

Attach relevant screenshots or console logs
```

### Priority Labels

- 🔴 **Critical**: Game-breaking, security issues
- 🟡 **High**: Major functionality affected
- 🟢 **Medium**: Minor issues, quality of life
- 🔵 **Low**: Nice-to-have improvements

## 🔄 Pull Request Process

### Before Submitting

- [ ] **Tests pass**: Run `pnpm test`
- [ ] **Code formatted**: Run prettier/ESLint
- [ ] **Types check**: No TypeScript errors
- [ ] **Documentation updated**: If needed
- [ ] **Self-review**: Review your own changes

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Art assets

## Testing

- [ ] Unit tests added/updated
- [ ] Manual testing performed
- [ ] Game functionality verified

## Screenshots/Demo

If applicable, add screenshots or demo GIFs

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review performed
- [ ] Tests pass
- [ ] Documentation updated
```

### Review Process

1. **Automated checks** must pass
2. **Maintainer review** required
3. **Testing** in development environment
4. **Feedback incorporation** if requested
5. **Final approval** and merge

## 🏗️ Architecture Decisions

### When to Modify Core Systems

- **Client Architecture**: Discuss major changes to layer system
- **Contract Schema**: Breaking changes need careful consideration
- **Art Pipeline**: Changes affecting all assets need approval
- **Build Process**: Modifications should be backwards compatible

### Decision Process

1. **Create RFC issue** for major changes
2. **Gather community feedback**
3. **Prototype if needed**
4. **Get maintainer approval**
5. **Implement incrementally**

## 🎯 Good First Issues

Looking for your first contribution? Look for these labels:

- 🆕 `good first issue`
- 📚 `documentation`
- 🎨 `art-needed`
- 🐛 `bug` + `easy`
- ✨ `enhancement` + `small`

### Example Good First Issues

- Add new sprite animations
- Improve error messages
- Write function documentation
- Fix typos or broken links
- Add unit tests for utilities
- Create example game scenarios

## 🌟 Recognition

### Contributor Hall of Fame

Active contributors will be:

- **Listed in README** acknowledgments
- **Added to CONTRIBUTORS.md**
- **Highlighted in release notes**
- **Invited to contributor Discord channel**

### Types of Recognition

- 🏆 **Core Contributor**: Significant ongoing contributions
- 🎨 **Art Contributor**: Beautiful visual assets
- 📝 **Documentation Hero**: Clear, helpful guides
- 🐛 **Bug Hunter**: Finding and fixing issues
- 🚀 **Feature Champion**: Implementing new capabilities

## 📞 Community

### Getting Help

- **GitHub Discussions**: For questions and ideas
- **Discord**: Real-time chat and support
- **Issues**: Bug reports and feature requests
- **Wiki**: Detailed documentation

### Communication Guidelines

- **Be respectful** and inclusive
- **Stay on topic** in discussions
- **Help others** when you can
- **Ask questions** if unclear
- **Share knowledge** openly

### Code of Conduct

We follow the [Contributor Covenant](https://www.contributor-covenant.org/) to ensure a welcoming community for all.

## 🎓 Learning Resources

### MUD Framework

- [MUD Documentation](https://mud.dev)
- [MUD Examples](https://github.com/latticexyz/mud/tree/main/examples)
- [Autonomous Worlds Primer](https://0xparc.org/blog/autonomous-worlds)

### Game Development

- [Phaser.js Documentation](https://phaser.io/learn)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Blockchain Development

- [Foundry Book](https://book.getfoundry.sh)
- [Solidity Documentation](https://docs.soliditylang.org)
- [Ethereum Development](https://ethereum.org/developers)

## 🚀 Advanced Contributions

### Core System Contributions

- **Gas Optimization**: Improve contract efficiency
- **Performance**: Enhance client rendering
- **Architecture**: Propose system improvements
- **Security**: Find and fix vulnerabilities

### Research Areas

- **ZK Proofs**: Privacy-preserving mechanics
- **Layer 2**: Scaling solutions
- **Cross-chain**: Multi-blockchain support
- **AI Integration**: Smart NPCs or procedural generation

## 📋 Contribution Checklist

### Pre-Contribution

- [ ] Read this guide thoroughly
- [ ] Set up development environment
- [ ] Familiarize yourself with codebase
- [ ] Join community channels

### During Development

- [ ] Follow coding standards
- [ ] Write comprehensive tests
- [ ] Document your changes
- [ ] Test thoroughly

### Before Submitting

- [ ] Run all tests locally
- [ ] Check for TypeScript errors
- [ ] Format code properly
- [ ] Write clear commit messages
- [ ] Create detailed PR description

---

**Thank you for contributing to the future of autonomous worlds! 🌟🎮**

Your contributions help build the next generation of onchain games and push the boundaries of what's possible with blockchain technology.
