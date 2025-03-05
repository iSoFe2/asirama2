import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/header";
import { NavigationBar } from "./components/navigation-bar";
import { MovieCard } from "./components/movie-card";
import { EpisodeItem } from "./components/episode-item";
import { SectionHeader } from "./components/section-header";
import { CategoryCard } from "./components/category-card";
import { CountryCard } from "./components/country-card";
import { UpcomingCard } from "./components/upcoming-card";
import { SearchFilter } from "./components/search-filter";
import { UserLists } from "./components/user-lists";
import { MovieDetails } from "./pages/movie-details";
import { Icon } from "@iconify/react";
import { useTMDBData } from "./hooks/use-tmdb-data";
import { Progress } from "@heroui/react";

function HomePage() {
  const { 
    loading, 
    error, 
    latestMovies, 
    trendingMovies, 
    topRatedMovies, 
    latestEpisodes, 
    genres, 
    upcomingMovies 
  } = useTMDBData();

  // Countries data
  const countries = [
    { code: "us", name: "مسلسلات أمريكية", flag: "https://flagcdn.com/w80/us.png" },
    { code: "gb", name: "مسلسلات بريطانية", flag: "https://flagcdn.com/w80/gb.png" },
    { code: "es", name: "مسلسلات إسبانية", flag: "https://flagcdn.com/w80/es.png" },
    { code: "kr", name: "مسلسلات كورية", flag: "https://flagcdn.com/w80/kr.png" },
    { code: "tr", name: "مسلسلات تركية", flag: "https://flagcdn.com/w80/tr.png" },
    { code: "in", name: "مسلسلات هندية", flag: "https://flagcdn.com/w80/in.png" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <Progress
            size="lg"
            isIndeterminate
            aria-label="جاري التحميل..."
            className="max-w-md mb-4"
          />
          <p className="text-default-500">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <Icon icon="lucide:alert-circle" className="text-6xl text-danger mb-4" />
          <h2 className="text-2xl font-bold mb-2">حدث خطأ</h2>
          <p className="text-default-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <Header />
      
      <main className="container mx-auto px-4 py-6 mt-16">
        <NavigationBar />
        
        <div className="mt-8">
          <SectionHeader 
            title="آخر الأفلام المضافة" 
            icon={<Icon icon="lucide:film" className="text-primary" />}
            action="عرض المزيد"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {latestMovies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SectionHeader 
              title="آخر الحلقات المضافة" 
              icon={<Icon icon="lucide:tv" className="text-primary" />}
              action="عرض المزيد"
            />
            <div className="grid grid-cols-1 gap-2">
              {latestEpisodes.map((episode) => (
                <EpisodeItem key={episode.id} {...episode} />
              ))}
            </div>
          </div>
          
          <div>
            <SectionHeader 
              title="قوائم المستخدمين" 
              icon={<Icon icon="lucide:list" className="text-primary" />}
            />
            <UserLists />
          </div>
        </div>
        
        <div className="mt-12">
          <SectionHeader 
            title="الأفلام والمسلسلات الأكثر مشاهدة" 
            icon={<Icon icon="lucide:flame" className="text-danger" />}
            action="عرض المزيد"
          />
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {trendingMovies.map((item) => (
              <MovieCard key={item.id} {...item} />
            ))}
          </div>
        </div>
        
        <div className="mt-12">
          <SectionHeader 
            title="الأعلى تقييمًا" 
            icon={<Icon icon="lucide:star" className="text-warning" />}
            action="عرض المزيد"
          />
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {topRatedMovies.map((item) => (
              <MovieCard key={item.id} {...item} />
            ))}
          </div>
        </div>
        
        <div className="mt-12">
          <SectionHeader 
            title="تصفح حسب النوع" 
            icon={<Icon icon="lucide:layers" className="text-primary" />}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {genres.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </div>
        </div>
        
        <div className="mt-12">
          <SectionHeader 
            title="الإصدارات القادمة" 
            icon={<Icon icon="lucide:calendar" className="text-primary" />}
          />
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {upcomingMovies.map((item) => (
              <UpcomingCard key={item.id} {...item} />
            ))}
          </div>
        </div>
        
        <div className="mt-12">
          <SectionHeader 
            title="المسلسلات حسب البلد" 
            icon={<Icon icon="lucide:globe" className="text-primary" />}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {countries.map((country, index) => (
              <CountryCard key={index} {...country} />
            ))}
          </div>
        </div>
        
        <div className="mt-12">
          <SearchFilter />
        </div>
      </main>
      
      <footer className="bg-content1 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Icon icon="lucide:film" className="text-primary text-2xl" />
              <p className="font-bold text-xl">آسيراما</p>
            </div>
            <div className="flex gap-4">
              <Icon icon="lucide:facebook" className="text-2xl cursor-pointer" />
              <Icon icon="lucide:twitter" className="text-2xl cursor-pointer" />
              <Icon icon="lucide:instagram" className="text-2xl cursor-pointer" />
              <Icon icon="lucide:youtube" className="text-2xl cursor-pointer" />
            </div>
          </div>
          <div className="mt-6 text-center text-default-500">
            جميع الحقوق محفوظة © آسيراما 2023
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/movie/:id">
          <MovieDetails />
        </Route>
      </Switch>
    </Router>
  );
}