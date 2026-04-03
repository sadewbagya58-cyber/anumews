import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAnimeDetails } from '../services/jikanApi';

const SERVERS = [
  { name: 'Server 1 (Primary)', id: 'vidsrc.to', url: 'https://vidsrc.to/embed/anime/' },
  { name: 'Server 2 (High Speed)', id: 'vidsrc.xyz', url: 'https://vidsrc.xyz/embed/anime/' },
  { name: 'Server 3 (Multi-Source)', id: 'vidsrc.cc', url: 'https://vidsrc.cc/v2/embed/anime/' },
  { name: 'Server 4 (Backup)', id: 'anyembed.to', url: 'https://anyembed.to/embed/anime/' },
];

const Watch = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [activeServer, setActiveServer] = useState(SERVERS[0]);
  const [customAffiliateUrl, setCustomAffiliateUrl] = useState('');
  
  useEffect(() => {
    const getAnimeDetails = async () => {
      setLoading(true);
      const data = await fetchAnimeDetails(id);
      setAnime(data);
      setLoading(false);
    };
    getAnimeDetails();
  }, [id]);

  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  const episodesCount = anime?.episodes || 24; // Fallback to 24 if unknown
  const episodeArray = Array.from({ length: episodesCount }, (_, i) => i + 1);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 container mx-auto">
      {loading ? (
        <div className="flex justify-center items-center h-[60vh] text-primary">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : anime ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Video Section */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-white/5 relative">
              {/* Iframe Loading State */}
              {iframeLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-900/90 backdrop-blur-sm">
                   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                   <p className="text-gray-400">Connecting to {activeServer.name}...</p>
                </div>
              )}
              
              {/* Video Player Container */}
              <div className="relative aspect-video w-full">
                {(() => {
                  const cleanEp = String(currentEpisode).split(':')[0];
                  const generatedUrl = `${activeServer.url}${id}/${cleanEp}`;
                  const src = customAffiliateUrl || generatedUrl;
                  
                  return (
                    <iframe
                      src={src}
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-none"
                      onLoad={handleIframeLoad}
                      title="Video Player"
                    />
                  );
                })()}
              </div>
            </div>

            {/* Server Selection & Info */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-white/5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h1 className="text-2xl font-bold text-white leading-tight">
                  {anime.title} <span className="text-primary block sm:inline">Episode {currentEpisode}</span>
                </h1>
                
                <button className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1.5 bg-red-400/10 hover:bg-red-400/20 px-3 py-1.5 rounded-lg border border-red-400/20 w-fit">
                   <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                   Report Dead Link
                </button>
              </div>

              {/* Server Grid */}
              <div className="mb-6">
                <span className="text-sm font-semibold text-gray-400 flex items-center gap-2 mb-3">
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
                   Servers
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SERVERS.map(server => {
                    const [serverName, providerName] = server.name.split(' (');
                    return (
                      <button
                        key={server.id}
                        onClick={() => {
                          if (activeServer.id !== server.id) {
                            setActiveServer(server);
                            setIframeLoading(true);
                          }
                        }}
                        className={`py-2.5 px-3 rounded-lg text-sm transition-all border flex flex-col items-center justify-center gap-0.5 ${
                          activeServer.id === server.id
                            ? 'bg-primary/10 border-primary shadow-sm shadow-primary/20'
                            : 'bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white hover:border-gray-500'
                        }`}
                      >
                        <span className={`font-bold ${activeServer.id === server.id ? 'text-primary' : 'text-gray-300'}`}>{serverName}</span>
                        <span className="text-[10px] uppercase tracking-wider opacity-75">
                          {providerName ? providerName.replace(')', '') : server.id}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Affiliate Manual Player */}
              <div className="mb-6 border-t border-white/5 pt-6 mt-2">
                <span className="text-sm font-semibold text-gray-400 flex items-center gap-2 mb-3">
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                   Manual Player URL (Affiliate Override)
                </span>
                <input 
                  type="text" 
                  placeholder="Paste override embed link here..." 
                  className="w-full bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none transition-colors placeholder-gray-600"
                  value={customAffiliateUrl}
                  onChange={(e) => setCustomAffiliateUrl(e.target.value)}
                />
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                {anime.synopsis}
              </p>
            </div>
          </div>

          {/* Episodes List Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-white/5 sticky top-24 max-h-[calc(100vh-120px)] flex flex-col">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                Episodes
              </h2>
              
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-4 gap-2">
                {episodeArray.map((ep) => (
                  <button
                    key={ep}
                    onClick={() => {
                      setCurrentEpisode(ep);
                      setIframeLoading(true);
                    }}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      currentEpisode === ep 
                      ? 'bg-primary text-background shadow-lg shadow-primary/30 scale-105' 
                      : 'bg-gray-900 hover:bg-gray-700 text-gray-300 hover:text-white'
                    }`}
                  >
                    {ep}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="text-center text-gray-400 pt-20">Anime not found.</div>
      )}
    </div>
  );
};

export default Watch;
