
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const backgroundImages = [
  'https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg', // Oppenheimer
  'https://image.tmdb.org/t/p/original/628Dep6AxEtDxjZoGP78TsOxYbK.jpg', // Barbie
  'https://image.tmdb.org/t/p/original/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg', // Dune
  'https://image.tmdb.org/t/p/original/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg', // Inception
];

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-background z-10"></div>
      
      {/* Background image */}
      {backgroundImages.map((image, index) => (
        <div 
          key={index}
          className={cn(
            'absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out bg-cover bg-center',
            currentBg === index ? 'opacity-100' : 'opacity-0'
          )}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
        <div className={cn(
          'transition-all duration-700 transform',
          loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        )}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Find Your Perfect Movie
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Discover films based on trusted ratings from Rotten Tomatoes and IMDb
          </p>
          
          <form 
            onSubmit={handleSearch}
            className={cn(
              'flex mx-auto max-w-md relative transform transition-all duration-700 ease-spring',
              loaded ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-10 opacity-0'
            )}
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a movie..."
                className="pl-4 pr-10 py-3 w-full rounded-l-lg shadow-md focus:outline-none focus:ring-2 focus:ring-accent/60 border-0"
              />
            </div>
            <Button 
              type="submit" 
              className="rounded-r-lg bg-primary hover:bg-primary/90 px-5 flex-shrink-0"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>
          
          <div className={cn(
            'mt-16 flex flex-col items-center transform transition-all duration-700',
            loaded ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-10 opacity-0'
          )}>
            <span className="text-white/80 text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 animate-pulse-slow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
