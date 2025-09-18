# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official seven.io desktop application, an Electron-based SMS gateway client built with React, TypeScript, and Tailwind CSS. The application allows users to send SMS, Text2Speech messages, and perform number lookups through the seven.io API.

## Development Commands

- **Start development server**: `npm start`
- **Build for production**: `npm run make`
- **Package application**: `npm run package`
- **Publish release**: `npm run publish`

## Architecture

### Core Technologies
- **Electron**: Desktop application framework with main/renderer process architecture
- **React 19**: UI framework with createRoot API
- **Redux Toolkit**: State management with typed hooks
- **TypeScript**: Type safety throughout the codebase
- **Tailwind CSS**: Utility-first styling with custom seven.io brand colors
- **Webpack**: Module bundling via Electron Forge

### Project Structure
```
src/
├── main.ts              # Electron main process entry point
├── renderer.ts           # React renderer entry point
├── App.tsx              # Root React component
├── preload.ts           # Electron preload script
├── components/          # Reusable UI components
├── pages/               # Main application pages (Sms, Voice, Rcs, Lookup, etc.)
├── store/               # Redux store and feature slices
├── util/                # Utility functions and helpers
├── i18n/                # Internationalization setup
└── assets/              # Static assets (images, icons)
```

### Key Application Pages
- **Sms**: SMS message sending interface
- **Voice**: Text2Speech message functionality
- **Rcs**: Rich Communication Services
- **Lookup**: Number lookup utilities (CNAM, HLR, MNP)
- **Contacts**: Contact management
- **Pricings**: Pricing information display
- **Options**: Application settings and configuration

### State Management
Uses Redux Toolkit with the following feature slices:
- `backdrop`: Loading/backdrop state
- `nav`: Navigation state
- `snackbars`: Notification system
- `to`: Recipient management

Typed Redux hooks are available:
- `useAppDispatch()`: Typed dispatch hook
- `useAppSelector()`: Typed selector hook
- `useAppStore()`: Typed store hook

### Electron Configuration
- Main process: `src/main.ts` handles window creation, IPC, and system integration
- Preload script: `src/preload.ts` provides secure context bridge
- Webpack configuration split between main and renderer processes
- Uses Electron Forge for building and packaging

### Styling System
- Tailwind CSS with custom seven.io branding (`#00d488` green)
- Custom typography configuration in `typography.ts`
- Dark mode support via `darkMode: 'class'`
- HeadlessUI integration for accessible components

### Build System
- Electron Forge handles the complete build pipeline
- Webpack configurations for main (`webpack.main.config.ts`) and renderer processes
- Multi-platform packaging (Windows, macOS, Linux)
- Code signing and publishing to GitHub releases

### Development Tools
- React and Redux DevTools available in development mode
- Sentry integration for error tracking
- electron-devtools-installer for browser extension support
- TypeScript strict mode enabled

## Key Conventions

- Use functional React components with hooks
- Follow Redux Toolkit patterns for state management
- Implement proper TypeScript typing throughout
- Use Tailwind utility classes for styling
- Maintain Electron security best practices (context isolation, preload scripts)