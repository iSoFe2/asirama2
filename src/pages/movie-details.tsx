import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { 
  Button, 
  Card, 
  CardBody, 
  CardFooter,
  CardHeader,
  Chip, 
  Divider, 
  Image, 
  Progress, 
  Tabs, 
  Tab, 
  Tooltip,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Textarea,
  Badge,
  Accordion,
  AccordionItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Header } from "../components/header";
import { MovieCard } from "../components/movie-card";
import { getMovieDetails, getSimilarMovies, getImageUrl } from "../services/tmdb-api";

// Components for the movie details page
import { MovieHero } from "../components/movie-details/movie-hero";
import { MovieInfo } from "../components/movie-details/movie-info";
import { MovieTrailer } from "../components/movie-details/movie-trailer";
import { MovieWatchOptions } from "../components/movie-details/movie-watch-options";
import { MovieDownloadOptions } from "../components/movie-details/movie-download-options";
import { MovieReviews } from "../components/movie-details/movie-reviews";
import { MovieSeasons } from "../components/movie-details/movie-seasons";
import { SimilarMovies } from "../components/movie-details/similar-movies";
import { UpcomingReleases } from "../components/movie-details/upcoming-releases";

export function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [movie, setMovie] = React.useState<any | null>(null);
  const [similarMovies, setSimilarMovies] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isMovie, setIsMovie] = React.useState(true); // To determine if it's a movie or TV show
  
  React.useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        
        // Fetch movie details and similar movies in parallel
        const [movieData, similarMoviesData] = await Promise.all([
          getMovieDetails(id),
          getSimilarMovies(id)
        ]);
        
        if (!movieData) {
          setError("لم يتم العثور على الفيلم");
          return;
        }
        
        // Check if it's a movie or TV show based on properties
        setIsMovie(movieData.hasOwnProperty('runtime'));
        setMovie(movieData);
        setSimilarMovies(similarMoviesData.slice(0, 6));
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("حدث خطأ أثناء تحميل بيانات الفيلم");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovieDetails();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground" dir="rtl">
        <Header />
        <div className="container mx-auto px-4 py-6 mt-16">
          <div className="flex justify-center items-center h-[70vh]">
            <Progress
              size="lg"
              isIndeterminate
              aria-label="جاري التحميل..."
              className="max-w-md"
            />
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !movie) {
    return (
      <div className="min-h-screen bg-background text-foreground" dir="rtl">
        <Header />
        <div className="container mx-auto px-4 py-6 mt-16">
          <div className="flex flex-col justify-center items-center h-[70vh]">
            <Icon icon="lucide:file-question" className="text-6xl text-default-400" />
            <h2 className="text-2xl font-bold mt-4">لم يتم العثور على الفيلم</h2>
            <p className="text-default-500 mt-2">{error || "الفيلم الذي تبحث عنه غير موجود"}</p>
            <Button color="primary" className="mt-4" onPress={() => history.push("/")}>
              العودة للرئيسية
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      {/* Custom header with back button and blurred background */}
      <div 
        className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-md bg-background/60 border-b border-divider"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.7)), url(${getImageUrl(movie.backdrop_path, "w1280")})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              isIconOnly 
              variant="light" 
              aria-label="العودة" 
              onPress={() => history.push("/")}
            >
              <Icon icon="lucide:arrow-right" className="text-xl" />
            </Button>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:film" className="text-primary text-2xl" />
              <p className="font-bold text-inherit text-xl">آسيراما</p>
            </div>
          </div>
          <div>
            <Button isIconOnly variant="light" aria-label="بحث">
              <Icon icon="lucide:search" className="text-xl" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Hero section with movie info */}
      <MovieHero movie={movie} isMovie={isMovie} />
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs 
          aria-label="تفاصيل الفيلم" 
          color="primary" 
          variant="underlined"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-primary",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-primary"
          }}
        >
          {/* Tab 1: Movie Info */}
          <Tab
            key="info"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:info" />
                <span>التفاصيل</span>
              </div>
            }
          >
            <MovieInfo movie={movie} isMovie={isMovie} />
          </Tab>
          
          {/* Tab 2: Watch Options */}
          <Tab
            key="watch"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:play" />
                <span>المشاهدة</span>
              </div>
            }
          >
            <MovieWatchOptions movie={movie} isMovie={isMovie} />
          </Tab>
          
          {/* Tab 3: Download Options */}
          <Tab
            key="download"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:download" />
                <span>التحميل</span>
              </div>
            }
          >
            <MovieDownloadOptions movie={movie} isMovie={isMovie} />
          </Tab>
          
          {/* Tab 4: Trailers and Clips */}
          <Tab
            key="trailers"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:video" />
                <span>الإعلانات</span>
              </div>
            }
          >
            <MovieTrailer movie={movie} />
          </Tab>
          
          {/* Tab 5: Reviews */}
          <Tab
            key="reviews"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:message-circle" />
                <span>التقييمات</span>
              </div>
            }
          >
            <MovieReviews movie={movie} />
          </Tab>
          
          {/* Tab 6: Seasons (for TV shows only) */}
          {!isMovie && (
            <Tab
              key="seasons"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:layers" />
                  <span>المواسم</span>
                </div>
              }
            >
              <MovieSeasons tvShow={movie} />
            </Tab>
          )}
        </Tabs>
        
        {/* Similar Movies Section */}
        <div className="mt-12">
          <SimilarMovies similarMovies={similarMovies} />
        </div>
        
        {/* Upcoming Releases Section (for TV shows) */}
        {!isMovie && (
          <div className="mt-12">
            <UpcomingReleases tvShow={movie} />
          </div>
        )}
      </div>
    </div>
  );
}