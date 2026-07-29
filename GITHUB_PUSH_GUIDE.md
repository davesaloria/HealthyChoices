# Git & GitHub Push Guide

## Initial Setup

If you haven't already initialized Git in this project:

```bash
cd c:\Users\daves\Documents\Healthy\ Choices
git init
```

## Configure Git

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## Stage and Commit

```bash
# Stage all files
git add .

# Verify staged files (optional)
git status

# Commit with message
git commit -m "Initial commit: Healthy Choices ecommerce website - complete project with design system, pages, auth, cart, checkout, and Supabase integration"
```

## Push to GitHub

### First Time Push

```bash
# Rename branch to main if needed
git branch -M main

# Add remote repository
git remote add origin https://github.com/davesaloria/HealthyChoices.git

# Push to GitHub
git push -u origin main
```

### Subsequent Pushes

```bash
git push origin main
```

## Verify on GitHub

Go to [github.com/davesaloria/HealthyChoices](https://github.com/davesaloria/HealthyChoices) and verify all files are there.

## Deploy to Vercel

### Option 1: Automatic Deployment

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Import Project"
4. Select `davesaloria/HealthyChoices`
5. Configure project settings
6. Add environment variables
7. Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set as production
vercel --prod
```

## Environment Variables for Vercel

In your Vercel project settings, add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Troubleshooting

### Authentication Issues

```bash
# Clear git credentials
git config --global --unset credential.helper

# Use personal access token
# Generate at https://github.com/settings/tokens
git remote set-url origin https://your-token@github.com/davesaloria/HealthyChoices.git
```

### Large Files

If you get file size errors:

```bash
# Install Git LFS
git lfs install

# Track large files
git lfs track "*.mp4" "*.zip"
git add .gitattributes
git commit -m "Add LFS tracking"
git push
```

## Continuous Updates

For future updates:

```bash
# Make changes
# ...

# Stage changes
git add .

# Commit
git commit -m "Describe your changes"

# Push
git push origin main

# Vercel automatically deploys on push!
```

## View Deployment

After deployment to Vercel, your site will be live at:

```
https://healthy-choices.vercel.app
```

(Or your custom domain if configured)

## Next Steps

1. ✅ Push to GitHub
2. ✅ Deploy to Vercel
3. ⏳ Configure Supabase database
4. ⏳ Set up payment processing (Stripe)
5. ⏳ Add product photos from your Images folder
6. ⏳ Configure analytics
7. ⏳ Set up email notifications
