import { Link } from 'react-router-dom';

const AnimeCard = ({ anime }) => {
  return (
    <Link to={`/watch/${anime.mal_id}`} className="block group">
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg bg-gray-800 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-primary/20 group-hover:shadow-2xl">
        <img 
          src={anime.images.webp.large_image_url} 
          alt={anime.title} 
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-bold text-white text-sm md:text-md line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {anime.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            {anime.score && (
              <span className="flex items-center gap-1 font-medium text-yellow-400">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                {anime.score}
              </span>
            )}
            <span className="opacity-75">{anime.type}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
