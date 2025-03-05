import React from "react";
import { 
  Button, 
  Card, 
  CardBody, 
  Chip, 
  Image, 
  Tooltip 
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { getImageUrl } from "../../services/tmdb-api";

interface MovieHeroProps {
  movie: any;
  isMovie: boolean;
}

export function MovieHero({ movie, isMovie }: MovieHeroProps) {
  // Get director
  const director = movie.credits?.crew?.find((person: any) => person.job === "Director");
  
  // Get writer
  const writer = movie.credits?.crew?.find((person: any) => 
    person.job === "Screenplay" || person.job === "Writer" || person.job === "Story"
  );
  
  // Get cast (limit to 6)
  const cast = movie.credits?.cast?.slice(0, 6) || [];
  
  // Format runtime
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div 
      className="w-full bg-cover bg-center pt-24 pb-8" 
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url(${getImageUrl(movie.backdrop_path, "original")})`,
        backgroundAttachment: "fixed"
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Movie Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Card className="overflow-hidden">
              <CardBody className="p-0">
                <Image
                  removeWrapper
                  alt={movie.title || movie.name}
                  className="w-full h-full object-cover aspect-[2/3]"
                  src={getImageUrl(movie.poster_path)}
                />
              </CardBody>
            </Card>
          </div>
          
          {/* Movie Info */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="flex flex-col h-full justify-center">
              <div className="flex items-center gap-2 mb-2">
                {movie.genres && movie.genres.map((genre: any) => (
                  <Chip key={genre.id} color="primary" variant="flat">{genre.name}</Chip>
                ))}
                <Chip color="secondary" variant="flat">4K</Chip>
                {movie.vote_average > 8 && (
                  <Chip color="warning" variant="shadow">حصري</Chip>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {movie.title || movie.name} ({(movie.release_date || movie.first_air_date)?.substring(0, 4)})
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-default-400 mb-4">
                {isMovie && (
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:clock" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
                {!isMovie && (
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:tv" />
                    <span>{movie.number_of_seasons} مواسم, {movie.number_of_episodes} حلقة</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Icon icon="lucide:calendar" />
                  <span>{movie.release_date || movie.first_air_date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon icon="lucide:globe" />
                  <span>{movie.spoken_languages?.[0]?.name || "غير معروف"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon icon="lucide:map-pin" />
                  <span>{movie.production_countries?.[0]?.name || "غير معروف"}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1 bg-warning-50 text-warning-600 px-3 py-1 rounded-lg">
                  <Icon icon="lucide:star" />
                  <span className="font-bold">{movie.vote_average?.toFixed(1)}/10</span>
                </div>
                <div className="flex items-center gap-1 bg-danger-50 text-danger-600 px-3 py-1 rounded-lg">
                  <Icon icon="lucide:eye" />
                  <span className="font-bold">{Math.floor((movie.popularity || 0) * 100).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 bg-primary-50 text-primary-600 px-3 py-1 rounded-lg">
                  <Icon icon="lucide:thumbs-up" />
                  <span className="font-bold">{movie.vote_count?.toLocaleString()}</span>
                </div>
              </div>
              
              <p className="text-default-300 mb-6 line-clamp-3 md:line-clamp-none">
                {movie.overview || "لا يوجد وصف متاح لهذا العمل."}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-default-400">المخرج</p>
                  <p className="font-medium text-white">{director?.name || "غير معروف"}</p>
                </div>
                <div>
                  <p className="text-default-400">الكاتب</p>
                  <p className="font-medium text-white">{writer?.name || "غير معروف"}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-default-400 mb-2">الممثلون</p>
                <div className="flex flex-wrap gap-2">
                  {cast.map((actor: any) => (
                    <Chip key={actor.id} variant="flat" color="default">
                      {actor.name}
                    </Chip>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  color="primary" 
                  size="lg"
                  endContent={<Icon icon="lucide:play" />}
                >
                  مشاهدة الآن
                </Button>
                <Button 
                  color="default" 
                  variant="ghost" 
                  size="lg"
                  endContent={<Icon icon="lucide:download" />}
                >
                  تحميل
                </Button>
                <Tooltip content="إضافة إلى المفضلة">
                  <Button isIconOnly color="danger" variant="flat" size="lg">
                    <Icon icon="lucide:heart" />
                  </Button>
                </Tooltip>
                <Tooltip content="مشاهدة لاحقًا">
                  <Button isIconOnly color="warning" variant="flat" size="lg">
                    <Icon icon="lucide:bookmark" />
                  </Button>
                </Tooltip>
                <Tooltip content="مشاركة">
                  <Button isIconOnly color="primary" variant="flat" size="lg">
                    <Icon icon="lucide:share" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}