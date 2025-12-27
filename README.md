# Piano Trainer MVP

A web-based piano training application for practicing note recognition. Built with React, TypeScript, Vite, and Tone.js.

## Features

- **Virtual Keyboard**: Touch/click to play notes on a virtual piano keyboard
- **MIDI Support**: Connect a physical MIDI keyboard (Chrome/Edge desktop only)
- **Note Recognition Exercises**: Practice identifying notes highlighted on the keyboard
- **Session Statistics**: Track your progress with accuracy, streaks, and response times
- **Customizable Settings**: Adjust note range, include/exclude accidentals, and more

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Chrome or Edge browser (for MIDI support)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Start Practice**: Click "Start Practice" to initialize audio
2. **Connect MIDI** (optional): Click "Connect MIDI Device" if you have a MIDI keyboard
3. **Practice**: A target note will be highlighted - play it on your keyboard (virtual or MIDI)
4. **Track Progress**: View your statistics in real-time
5. **Adjust Settings**: Customize note range, accidentals, and auto-advance behavior

## Browser Support

- **Chrome/Edge Desktop**: Full support including MIDI
- **Chrome Android**: Virtual keyboard only (MIDI not supported on mobile)
- **Firefox/Safari**: Virtual keyboard only (MIDI not supported)

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tone.js** - Audio synthesis
- **Zustand** - State management
- **Tailwind CSS** - Styling

## Project Structure

```
src/
├── components/     # React components
│   ├── common/     # Reusable UI components
│   ├── keyboard/    # Piano keyboard components
│   ├── exercise/    # Exercise-related components
│   ├── midi/       # MIDI connection UI
│   └── screens/     # Full-screen views
├── hooks/          # Custom React hooks
├── lib/            # Framework-agnostic utilities
│   ├── audio/      # Audio management
│   ├── midi/       # MIDI handling
│   ├── input/      # Unified input handler
│   └── exercises/  # Exercise logic
├── stores/         # Zustand state management
├── utils/          # Helper functions
├── constants/      # Constants
└── types/          # TypeScript definitions
```

## Development

The project uses:
- ESLint for code quality
- TypeScript for type checking
- Tailwind CSS for styling

## License

MIT
