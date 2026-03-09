#!/bin/bash

# Setup git hooks for deployment workflow protection

HOOK_DIR=".git/hooks"
PRE_COMMIT_HOOK="$HOOK_DIR/pre-commit"

echo "Setting up git hooks..."

# Create pre-commit hook to prevent direct commits to main/staging
cat > "$PRE_COMMIT_HOOK" << 'EOF'
#!/bin/bash

branch=$(git branch --show-current)

if [[ "$branch" == "main" ]]; then
    echo ""
    echo "⛔ Direct commits to 'main' are not allowed."
    echo ""
    echo "Use the deployment workflow:"
    echo "  ./scripts/deploy.sh start <feature-name>"
    echo ""
    exit 1
fi

if [[ "$branch" == "staging" ]]; then
    echo ""
    echo "⛔ Direct commits to 'staging' are not allowed."
    echo ""
    echo "Use the deployment workflow:"
    echo "  ./scripts/deploy.sh start <feature-name>"
    echo ""
    exit 1
fi

exit 0
EOF

chmod +x "$PRE_COMMIT_HOOK"

echo "✓ Pre-commit hook installed"
echo ""
echo "Protected branches: main, staging"
echo "Run ./scripts/deploy.sh help for workflow commands"
