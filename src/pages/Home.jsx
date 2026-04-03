import { useEffect, useState } from 'react';
import { fetchJJKAnime } from '../services/jikanApi';
import AnimeCard from '../components/AnimeCard';

const Home = () => {
  const [jjkAnime, setJjkAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAnime = async () => {
      setLoading(true);
      const data = await fetchJJKAnime();
      setJjkAnime(data);
      setLoading(false);
    };
    getAnime();
  }, []);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Abstract Background for Hero */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-gray-900 to-indigo-950/40"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-50 mix-blend-screen pointer-events-none"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Jujutsu Kaisen <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Hub</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            The exclusive streaming destination for everything Jujutsu Kaisen. Watch every episode, movie, and special in high quality.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3.5 bg-primary hover:bg-primary/80 text-background font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-primary/25">
              Start Watching
            </button>
            <button className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full backdrop-blur-sm border border-white/10 transition-all hover:scale-105">
              Explore Catalog
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-8 mt-[-40px] relative z-20">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <span className="w-1.5 h-8 bg-red-600 rounded-full"></span>
              Jujutsu Kaisen Collection
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-gray-800/50 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {jjkAnime.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
