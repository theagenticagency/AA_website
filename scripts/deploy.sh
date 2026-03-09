#!/bin/bash

# Agentic Agency Deployment Workflow
# Usage: ./scripts/deploy.sh [command]

set -e

BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_header() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}  AGENTIC AGENCY DEPLOY${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

current_branch() {
    git branch --show-current
}

ensure_clean() {
    if [ -n "$(git status --porcelain)" ]; then
        echo -e "${RED}Error: Working directory not clean. Commit or stash changes first.${NC}"
        exit 1
    fi
}

# Command: start - Start a new feature branch
cmd_start() {
    local branch_name=$1

    if [ -z "$branch_name" ]; then
        echo -e "${YELLOW}Usage: ./scripts/deploy.sh start <feature-name>${NC}"
        echo "Example: ./scripts/deploy.sh start add-testimonials"
        exit 1
    fi

    ensure_clean

    echo -e "${BLUE}→ Syncing staging branch...${NC}"
    git checkout staging
    git pull origin staging

    echo -e "${BLUE}→ Creating feature branch: feature/${branch_name}${NC}"
    git checkout -b "feature/${branch_name}"

    echo ""
    echo -e "${GREEN}✓ Ready to develop on feature/${branch_name}${NC}"
    echo -e "  Run ${YELLOW}npm run dev${NC} to start developing"
    echo -e "  When done, run ${YELLOW}./scripts/deploy.sh stage${NC}"
}

# Command: stage - Push to staging for testing
cmd_stage() {
    local branch=$(current_branch)

    if [[ "$branch" == "main" || "$branch" == "staging" ]]; then
        echo -e "${RED}Error: Cannot stage from ${branch}. Use a feature branch.${NC}"
        exit 1
    fi

    echo -e "${BLUE}→ Building to verify...${NC}"
    npm run build

    echo -e "${BLUE}→ Pushing ${branch} to origin...${NC}"
    git push -u origin "$branch"

    echo ""
    echo -e "${GREEN}✓ Branch pushed!${NC}"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "  1. Create PR: ${branch} → staging"
    echo "     https://github.com/danielholmkristensen/NexusAI/compare/staging...${branch}"
    echo ""
    echo "  2. Once merged, test at: https://staging.agenticagency.dev"
    echo ""
    echo "  3. When ready for production, run: ./scripts/deploy.sh release"
}

# Command: release - Promote staging to production
cmd_release() {
    ensure_clean

    echo -e "${BLUE}→ Fetching latest...${NC}"
    git fetch origin

    echo ""
    echo -e "${YELLOW}This will create a PR from staging → main${NC}"
    echo -e "Production URL: https://agenticagency.dev"
    echo ""
    read -p "Continue? (y/n) " -n 1 -r
    echo

    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi

    echo ""
    echo -e "${GREEN}Create the release PR:${NC}"
    echo "  https://github.com/danielholmkristensen/NexusAI/compare/main...staging"
    echo ""
    echo "After merging, production will auto-deploy."
}

# Command: status - Show current state
cmd_status() {
    local branch=$(current_branch)

    echo -e "Current branch: ${YELLOW}${branch}${NC}"
    echo ""

    if [ "$branch" == "main" ]; then
        echo -e "${RED}⚠ You're on main (production)${NC}"
        echo "  Run: ./scripts/deploy.sh start <feature-name>"
    elif [ "$branch" == "staging" ]; then
        echo -e "${YELLOW}You're on staging${NC}"
        echo "  Run: ./scripts/deploy.sh start <feature-name>"
    else
        echo -e "${GREEN}You're on a feature branch${NC}"
        echo "  Develop, then run: ./scripts/deploy.sh stage"
    fi

    echo ""
    echo "Recent commits:"
    git log --oneline -5
}

# Command: sync - Sync current branch with its upstream
cmd_sync() {
    local branch=$(current_branch)
    ensure_clean

    echo -e "${BLUE}→ Syncing ${branch} with origin...${NC}"
    git pull origin "$branch"

    if [[ "$branch" == feature/* ]]; then
        echo -e "${BLUE}→ Merging latest staging...${NC}"
        git merge origin/staging --no-edit
    fi

    echo -e "${GREEN}✓ Synced${NC}"
}

# Command: help
cmd_help() {
    echo "Commands:"
    echo ""
    echo "  ${YELLOW}start <name>${NC}   Create a new feature branch from staging"
    echo "  ${YELLOW}stage${NC}          Push feature branch and prep PR to staging"
    echo "  ${YELLOW}release${NC}        Promote staging to production"
    echo "  ${YELLOW}status${NC}         Show current branch and recent commits"
    echo "  ${YELLOW}sync${NC}           Sync current branch with upstream"
    echo "  ${YELLOW}help${NC}           Show this help"
    echo ""
    echo "Workflow:"
    echo "  1. ./scripts/deploy.sh start my-feature"
    echo "  2. npm run dev (develop)"
    echo "  3. git add . && git commit -m 'message'"
    echo "  4. ./scripts/deploy.sh stage"
    echo "  5. Create PR → staging, test"
    echo "  6. ./scripts/deploy.sh release"
}

# Main
print_header

case "${1:-help}" in
    start)   cmd_start "$2" ;;
    stage)   cmd_stage ;;
    release) cmd_release ;;
    status)  cmd_status ;;
    sync)    cmd_sync ;;
    help)    cmd_help ;;
    *)
        echo -e "${RED}Unknown command: $1${NC}"
        cmd_help
        exit 1
        ;;
esac
