import React from "react";
import { Card, CardBody, CardHeader, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";

interface MovieTrailerProps {
  movie: any;
}

export function MovieTrailer({ movie }: MovieTrailerProps) {
  // Get trailer and other videos
  const videos = movie.videos?.results || [];
  const trailer = videos.find((video: any) => 
    video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser")
  );
  
  // Filter videos by type
  const trailers = videos.filter((video: any) => video.type === "Trailer" && video.site === "YouTube");
  const teasers = videos.filter((video: any) => video.type === "Teaser" && video.site === "YouTube");
  const clips = videos.filter((video: any) => video.type === "Clip" && video.site === "YouTube");
  const behindTheScenes = videos.filter((video: any) => video.type === "Behind the Scenes" && video.site === "YouTube");
  
  const renderVideoPlayer = (videoKey: string) => {
    return (
      <div className="aspect-video w-full rounded-lg overflow-hidden">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  };
  
  const renderEmptyState = () => {
    return (
      <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <Icon icon="lucide:video" className="text-6xl text-default-400 mb-4" />
            <p className="text-default-500">الفيديو غير متوفر حاليًا</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="py-6">
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-bold">الإعلان الرسمي</h2>
        </CardHeader>
        <CardBody>
          {trailer ? renderVideoPlayer(trailer.key) : renderEmptyState()}
        </CardBody>
      </Card>
      
      <Tabs aria-label="مقاطع الفيديو" color="primary">
        {trailers.length > 0 && (
          <Tab 
            key="trailers" 
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:film" />
                <span>الإعلانات ({trailers.length})</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              {trailers.map((video: any) => (
                <Card key={video.id} className="overflow-hidden">
                  <CardBody className="p-0">
                    {renderVideoPlayer(video.key)}
                  </CardBody>
                </Card>
              ))}
            </div>
          </Tab>
        )}
        
        {teasers.length > 0 && (
          <Tab 
            key="teasers" 
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:sparkles" />
                <span>التشويقات ({teasers.length})</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              {teasers.map((video: any) => (
                <Card key={video.id} className="overflow-hidden">
                  <CardBody className="p-0">
                    {renderVideoPlayer(video.key)}
                  </CardBody>
                </Card>
              ))}
            </div>
          </Tab>
        )}
        
        {clips.length > 0 && (
          <Tab 
            key="clips" 
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:scissors" />
                <span>مقاطع ({clips.length})</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              {clips.map((video: any) => (
                <Card key={video.id} className="overflow-hidden">
                  <CardBody className="p-0">
                    {renderVideoPlayer(video.key)}
                  </CardBody>
                </Card>
              ))}
            </div>
          </Tab>
        )}
        
        {behindTheScenes.length > 0 && (
          <Tab 
            key="behindTheScenes" 
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:camera" />
                <span>خلف الكواليس ({behindTheScenes.length})</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              {behindTheScenes.map((video: any) => (
                <Card key={video.id} className="overflow-hidden">
                  <CardBody className="p-0">
                    {renderVideoPlayer(video.key)}
                  </CardBody>
                </Card>
              ))}
            </div>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}