# DevOps & SRE Diagram Studio

A free browser-based diagram canvas for DevOps and SRE teams. It can create architecture diagrams, incident response flows, Kubernetes diagrams, CI/CD pipelines, runbook visuals, and simple flowcharts.

## Features

- Full-page canvas
- Text, boxes, circles, decision diamonds, and arrows
- DevOps/SRE icons: Server, Cloud, Database, Security, Network, Git
- Upload images into the canvas
- Export as PNG, SVG, or JSON
- Import JSON to continue editing
- Auto-save in the browser with localStorage
- No backend, no database, no server required
- Ready for GitHub Pages

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Build

```bash
npm run build
```

The production files will be created in the `dist` folder.

## Deploy to GitHub Pages

### 1. Create a GitHub repository

Example repository name:

```txt
devops-sre-diagram-studio
```

### 2. Push the project

```bash
git init
git add .
git commit -m "Initial release"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/devops-sre-diagram-studio.git
git push -u origin main
```

### 3. Deploy

Edit `package.json` and replace this line:

```json
"homepage": "https://YOUR_USERNAME.github.io/devops-sre-diagram-studio"
```

If the line does not exist, add it near the top after `version`:

```json
"homepage": "https://YOUR_USERNAME.github.io/devops-sre-diagram-studio",
```

Then run:

```bash
npm run deploy
```

### 4. Enable GitHub Pages

Go to:

```txt
Repository → Settings → Pages
```

Select:

```txt
Deploy from a branch
Branch: gh-pages
Folder: /root
```

Your app will be available at:

```txt
https://YOUR_USERNAME.github.io/devops-sre-diagram-studio
```

## Connect a subdomain

Example subdomain:

```txt
diagram.yourdomain.com
```

In your DNS provider, add:

```txt
Type: CNAME
Name: diagram
Value: YOUR_USERNAME.github.io
```

Then in GitHub:

```txt
Repository → Settings → Pages → Custom domain
```

Add:

```txt
diagram.yourdomain.com
```

GitHub will create a `CNAME` file automatically in the Pages branch. Enable `Enforce HTTPS` after the certificate is ready.

## Important limitations

This is a static frontend app. It does not need a server, but that also means:

- User projects are saved only in the user's browser.
- There is no login system.
- There is no cloud database.
- Shared team workspaces need a backend later.

For a free public tool where users create and download images, GitHub Pages is enough.
