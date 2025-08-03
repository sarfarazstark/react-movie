# MovieFinder - React Movie Search Application

A modern, responsive movie discovery application built with React, Vite, and the TMDB API. Features include movie search, detailed movie information, trending movies tracking, and trailer integration.

## 🎬 Features

### Core Features

- **Movie Search**: Real-time search with debounced input to prevent excessive API calls
- **Popular Movies**: Browse trending and popular movies from TMDB
- **Detailed Movie View**: Comprehensive movie information including ratings, cast, budget, revenue, and more
- **Trailer Integration**: YouTube trailer playback with duration display using YouTube IFrame API
- **Trending Analytics**: Track most searched movies using Appwrite database
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Elegant loading spinners and error handling
- **404 Page**: Custom not found page for invalid routes

### Technical Features

- **React Router**: Client-side routing with dynamic movie pages
- **Custom Hooks**: Reusable logic for data fetching (`useMovies`, `useMovie`)
- **Debounced Search**: Optimized search performance using `react-use` library
- **Abort Controllers**: Proper cleanup of fetch requests to prevent memory leaks
- **Environment Variables**: Secure API key management
- **TypeScript Ready**: ESLint configuration for code quality

## 🚀 Tech Stack

### Frontend

- **React 19.1.0** - Core framework
- **Vite 7.0.4** - Build tool and development server
- **React Router DOM 7.7.1** - Client-side routing
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Lucide React** - Icon library for UI elements

### Backend & APIs

- **TMDB API** - Movie data source
- **YouTube IFrame API** - Trailer integration
- **Appwrite** - Backend-as-a-Service for search analytics

### Development Tools

- **ESLint** - Code linting and quality
- **React Use** - Additional React hooks library

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Badge.jsx       # Styled badge component
│   ├── Movie.jsx       # Basic movie component (placeholder)
│   ├── MovieCard.jsx   # Movie card with poster and details
│   ├── MovieList.jsx   # List container for movies
│   ├── Search.jsx      # Search input component
│   └── Spinner.jsx     # Loading spinner component
├── hooks/              # Custom React hooks
│   ├── useMovie.js     # Individual movie data fetching
│   └── useMovies.js    # Movies list data fetching
├── pages/              # Route components
│   ├── Home.jsx        # Main page with search and movies
│   ├── MoviePage.jsx   # Detailed movie view
│   └── NotFound.jsx    # 404 error page
├── App.jsx             # Main app component with routes
├── appwrite.js         # Appwrite database integration
├── index.css           # Global styles and Tailwind config
└── main.jsx            # React app entry point
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- TMDB API key
- Appwrite project (optional, for trending features)

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_MOVIE_API_KEY=your_tmdb_api_key_here
VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
```

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/sarfarazstark/react-movie.git
   cd react-movie
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**

   ```bash
   npm run preview
   ```

## 🎯 Key Components

### Custom Hooks

#### `useMovies(query)`

- Fetches movies from TMDB API based on search query
- Returns popular movies when no query provided
- Implements debouncing and abort controllers
- Updates search analytics via Appwrite

#### `useMovie(movieId)`

- Fetches detailed movie information
- Integrates trailer data from YouTube
- Calculates trailer duration using YouTube IFrame API

### Core Components

#### `Home.jsx`

- Main application page
- Implements search functionality with debouncing
- Displays trending movies from Appwrite
- Shows search results or popular movies

#### `MoviePage.jsx`

- Detailed movie view with comprehensive information
- Displays movie poster, backdrop, and trailer
- Shows ratings, budget, revenue, cast, and production details
- Responsive grid layout for movie information

#### `Search.jsx`

- Controlled input component
- Search icon integration
- Placeholder text for user guidance

#### `MovieCard.jsx`

- Reusable movie card component
- Displays poster, title, rating, language, and year
- Clickable link to detailed movie page
- Fallback image for missing posters

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS with custom theme configuration:

- Custom color palette for dark theme
- Custom fonts (DM Sans, Bebas Neue)
- Responsive breakpoints
- Utility classes for gradients and effects

### Vite Configuration

- React plugin for JSX support
- Environment variables support
- Development server configuration

### ESLint Configuration

- React hooks linting
- React refresh support
- Modern JavaScript standards

## 🎨 Design Features

### Styling

- Dark theme with purple accent colors
- Gradient backgrounds and text effects
- Custom scrollbar hiding
- Responsive grid layouts
- Fancy text effects with stroke outlines

### User Experience

- Smooth loading states
- Error handling with user-friendly messages
- Debounced search to reduce API calls
- Responsive design for all screen sizes
- Accessible components with proper ARIA labels

## 📊 Analytics & Tracking

The application tracks search analytics using Appwrite:

- **Search Count Tracking**: Records frequency of movie searches
- **Trending Movies**: Displays most searched movies
- **Database Operations**: Creates and updates search records
- **Error Handling**: Graceful handling of database errors

## 🌐 API Integration

### TMDB API

- **Movie Search**: `/search/movie` endpoint
- **Popular Movies**: `/discover/movie` endpoint
- **Movie Details**: `/movie/{id}` endpoint
- **Movie Videos**: `/movie/{id}/videos` endpoint

### YouTube API

- **IFrame API**: For trailer duration calculation
- **Video Embedding**: Trailer playback functionality

## 📱 Responsive Design

The application is fully responsive with:

- Mobile-first approach
- Flexible grid layouts
- Adaptive typography
- Touch-friendly interfaces
- Optimized images and media

## 🚧 Development Scripts

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run lint    # Run ESLint
npm run preview # Preview production build
```

## 🔒 Environment & Security

- Environment variables for API keys
- Client-side API key protection
- Error boundary implementation
- Input sanitization for search queries

## 🎭 Features in Detail

### Search Functionality

- Real-time search with 800ms debounce
- Automatic API switching between search and discovery
- Search analytics tracking
- Error handling for failed requests

### Movie Details

- Comprehensive movie information display
- Budget and revenue formatting
- Production company details
- Multiple language support
- Genre badges and ratings

### Trending System

- Search frequency tracking
- Top 10 trending movies display
- Visual trending indicators
- Real-time analytics updates

## 📈 Performance Optimizations

- Debounced search inputs
- Image lazy loading
- Request abortion on component unmount
- Efficient state management
- Optimized bundle size with Vite

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Sarfaraz Stark**

- GitHub: [@sarfarazstark](https://github.com/sarfarazstark)
- Repository: [react-movie](https://github.com/sarfarazstark/react-movie)

---

Built with ❤️ using React, Vite, and modern web technologies.
