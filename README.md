# Anime & Manga Recommendation System

A modern web application for discovering and exploring anime, manga, manhwa, and manhua. Built with React, this platform offers personalized recommendations, community features, and a seamless user experience.

## 🌟 Features

- **Discovery Hub**: Browse trending anime, manga, manhwa, and manhua with detailed information
- **Search Functionality**: Find specific titles using our integrated search
- **User Authentication**: Sign in with Google to access personalized features
- **Community Posts**: Share and read posts from the community (requires login)
- **Bookmarks**: Save your favorite titles for later (requires login)
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Data**: Powered by Jikan API for up-to-date anime/manga information

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: SCSS
- **Authentication & Database**: Firebase (Auth, Firestore)
- **Forms**: React Hook Form with Yup validation
- **API**: Jikan API (MyAnimeList data)
- **UI Components**: React Slick for carousels, React Icons

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/binghazy/Movie-Recommendation-System.git
   cd Movie-Recommendation-System
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Google provider) and Firestore
   - Copy your Firebase config to `src/config/firebase.js`

4. **Set up reCAPTCHA Enterprise**
   - Create a `.env` file in the project root
   - Add your reCAPTCHA Enterprise keys:

   ```bash
   REACT_APP_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   REACT_APP_RECAPTCHA_API_KEY=your_google_api_key
   REACT_APP_RECAPTCHA_PROJECT_ID=netfillx
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Usage

- **Home**: View trending content and personalized recommendations
- **Discovery**: Explore different categories (Anime, Manga, Manhwa, Manhua)
- **Search**: Use the search bar in the sidebar to find specific titles
- **Community**: Read and create posts (login required)
- **Bookmarks**: Save and manage your favorite titles (login required)

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
├── config/             # Firebase configuration
├── store/              # Redux store and slices
├── styles/             # SCSS stylesheets
└── assets/             # Static assets
```

## 🚀 Deployment

This project is configured for deployment on GitHub Pages.

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```
   (Note: Ensure you have `gh-pages` package installed and configured)

The live version is available at: [https://binghazy.github.io/Movie-Recommendation-System/](https://binghazy.github.io/Movie-Recommendation-System/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **GitHub Repository**: [https://github.com/binghazy/Movie-Recommendation-System](https://github.com/binghazy/Movie-Recommendation-System)
- **Live Demo**: [https://binghazy.github.io/Movie-Recommendation-System/](https://binghazy.github.io/Movie-Recommendation-System/)
- **Jikan API**: [https://jikan.moe/](https://jikan.moe/)
- **Firebase**: [https://firebase.google.com/](https://firebase.google.com/)

## 📞 Contact

For questions or suggestions, please open an issue on GitHub.

---

_Built with ❤️ using React and modern web technologies_
