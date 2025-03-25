
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Search, Heart, Film, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home', icon: <Film size={16} /> },
    { to: '/movies', label: 'Discover', icon: <Search size={16} /> },
    { to: '/favorites', label: 'Favorites', icon: <Heart size={16} /> },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-spring py-4 px-6',
        scrolled ? 'glass-effect' : 'bg-transparent'
      )}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-primary font-semibold text-xl transition-opacity duration-200 hover:opacity-80"
        >
          <Film className="h-6 w-6" />
          <span>MovieVibes</span>
        </Link>

        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>

            {mobileMenuOpen && (
              <div className="fixed inset-0 top-16 bg-white/95 backdrop-blur-md animate-fade-in z-40">
                <nav className="flex flex-col p-6 space-y-4">
                  {navLinks.map((link, i) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={cn(
                        'flex items-center py-3 px-4 rounded-md transition-all duration-200 animate-fade-up text-lg',
                        { 'animate-delay-100': i === 0 },
                        { 'animate-delay-200': i === 1 },
                        { 'animate-delay-300': i === 2 },
                        location.pathname === link.to
                          ? 'bg-secondary text-primary font-medium'
                          : 'text-muted-foreground hover:bg-secondary/50'
                      )}
                      style={{ animationDelay: `${(i + 1) * 50}ms` }}
                    >
                      {link.icon}
                      <span className="ml-2">{link.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </>
        ) : (
          <nav className="flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'flex items-center py-2 px-4 rounded-md transition-all duration-200',
                  location.pathname === link.to
                    ? 'bg-secondary text-primary font-medium'
                    : 'text-muted-foreground hover:bg-secondary/50'
                )}
              >
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
