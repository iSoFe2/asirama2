import React from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Accordion, 
  AccordionItem, 
  Button, 
  Image 
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { getImageUrl } from "../../services/tmdb-api";

interface MovieSeasonsProps {
  tvShow: any;
}

export function MovieSeasons({ tvShow }: MovieSeasonsProps) {
  // Mock seasons data - in a real app, you would fetch this from the API
  const seasons = tvShow.seasons || [];
  
  // Mock episodes data
  const getEpisodes = (seasonNumber: number) => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: `s${seasonNumber}e${i+1}`,
      episode_number: i + 1,
      name: `الحلقة ${i + 1}`,
      overview: `وصف الحلقة ${i + 1} من الموسم ${seasonNumber}`,
      still_path: null,
      air_date: "2023-01-01",
      runtime: 45
    }));
  };

  return (
    <div className="py-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">المواسم والحلقات</h2>
        </CardHeader>
        <CardBody>
          <Accordion variant="splitted" className="p-0">
            {seasons.map((season: any) => (
              <AccordionItem
                key={season.id}
                aria-label={`الموسم ${season.season_number}: ${season.name}`}
                title={
                  <div className="flex items-center gap-4">
                    <Image
                      alt={season.name}
                      className="object-cover rounded-md w-16 h-24"
                      src={getImageUrl(season.poster_path) || `https://picsum.photos/200/300?random=${season.season_number}`}
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{season.name}</h3>
                      <p className="text-sm text-default-500">
                        {season.episode_count} حلقة • {season.air_date?.substring(0, 4) || "غير معروف"}
                      </p>
                    </div>
                  </div>
                }
              >
                <div className="space-y-4 pt-2">
                  {getEpisodes(season.season_number).map((episode) => (
                    <Card key={episode.id} isPressable className="overflow-hidden">
                      <CardBody className="p-0">
                        <div className="flex">
                          <div className="w-32 h-20 bg-default-200 relative">
                            <Image
                              removeWrapper
                              alt={episode.name}
                              className="w-full h-full object-cover"
                              src={episode.still_path ? getImageUrl(episode.still_path) : `https://picsum.photos/300/200?random=${episode.id}`}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                              <Icon icon="lucide:play" className="text-white text-2xl" />
                            </div>
                          </div>
                          <div className="p-3 flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">
                                  {episode.episode_number}. {episode.name}
                                </h4>
                                <p className="text-xs text-default-500 mt-1 line-clamp-2">
                                  {episode.overview || "لا يوجد وصف متاح لهذه الحلقة."}
                                </p>
                              </div>
                              <div className="text-xs text-default-500">
                                {episode.runtime} دقيقة
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <div className="text-xs text-default-500">
                                {episode.air_date}
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" color="primary" variant="flat">
                                  مشاهدة
                                </Button>
                                <Button size="sm" variant="light" isIconOnly>
                                  <Icon icon="lucide:download" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </CardBody>
      </Card>
    </div>
  );
}