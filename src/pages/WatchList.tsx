
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from '@/components/Layout';
import { Auth } from '@/components/Auth';
import { MovieList } from '@/components/MovieList';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Movie } from '@/types/movie';

// Mock data for the watch list
const watchListMovies: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    posterPath: "https://via.placeholder.com/300x450?text=Shawshank+Redemption",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    imdbRating: 9.3,
    rottenTomatoesRating: 91,
    year: 1994
  },
  {
    id: 2,
    title: "The Godfather",
    posterPath: "https://via.placeholder.com/300x450?text=The+Godfather",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    imdbRating: 9.2,
    rottenTomatoesRating: 98,
    year: 1972
  }
];

export function WatchList() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("watch-list");
  const [watchList, setWatchList] = useState<Movie[]>(watchListMovies);
  const navigate = useNavigate();

  const handleSignIn = () => {
    setIsAuthenticated(true);
    setActiveTab("watch-list");
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  const handleToggleFavorite = (id: number) => {
    setWatchList(prevList => 
      prevList.filter(movie => movie.id !== id)
    );
    
    toast({
      title: "Removed from watch list",
      description: "The movie has been removed from your watch list",
    });
  };

  const handleExploreMovies = () => {
    navigate('/movies');
  };

  return (
    <Layout>
      <div className="container mx-auto py-20 px-4 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6">My Watch List</h1>
        
        {isAuthenticated ? (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList>
                  <TabsTrigger value="watch-list">Watch List</TabsTrigger>
                  <TabsTrigger value="watched">Watched</TabsTrigger>
                </TabsList>
                
                <div className="flex justify-end mt-4">
                  <Button variant="outline" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </div>
                
                <TabsContent value="watch-list" className="mt-4">
                  {watchList.length > 0 ? (
                    <MovieList 
                      movies={watchList} 
                      title="Movies to Watch"
                      favorites={watchList.map(m => m.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ) : (
                    <div className="text-center py-16">
                      <h3 className="text-xl font-medium mb-4">Your watch list is empty</h3>
                      <p className="text-muted-foreground mb-6">
                        Start adding movies to build your watch list
                      </p>
                      <Button onClick={handleExploreMovies}>
                        Explore Movies
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="watched" className="mt-4">
                  <div className="text-center py-16">
                    <h3 className="text-xl font-medium mb-4">You haven't marked any movies as watched</h3>
                    <p className="text-muted-foreground mb-6">
                      As you watch movies from your list, they'll appear here
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ) : (
          <div className="max-w-lg mx-auto">
            <Auth onSignIn={handleSignIn} />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default WatchList;
