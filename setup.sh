#!/bin/bash

# Healthy Choices Setup Script
# Run: chmod +x setup.sh && ./setup.sh

echo "🥣 Healthy Choices Setup"
echo "========================"
echo ""

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js $NODE_VERSION detected"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Create env file
if [ ! -f .env.local ]; then
    echo ""
    echo "🔐 Creating .env.local template..."
    cp .env.example .env.local
    echo "⚠️  Please fill in your Supabase credentials in .env.local"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your Supabase credentials"
echo "2. Run 'npm run dev' to start development server"
echo "3. Visit http://localhost:3000"
echo ""
echo "Happy coding! 🚀"
