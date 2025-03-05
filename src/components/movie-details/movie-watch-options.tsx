import React from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Tabs, 
  Tab, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem 
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface MovieWatchOptionsProps {
  movie: any;
  isMovie: boolean;
}

export function MovieWatchOptions({ movie, isMovie }: MovieWatchOptionsProps) {
  const [selectedServer, setSelectedServer] = React.useState("server1");
  const [selectedQuality, setSelectedQuality] = React.useState("1080p");
  const [selectedSubtitle, setSelectedSubtitle] = React.useState("arabic");
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(100);
  
  // Mock server options
  const servers = [
    { id: "server1", name: "سيرفر 1 (سريع)" },
    { id: "server2", name: "سيرفر 2" },
    { id: "server3", name: "سيرفر 3" },
    { id: "server4", name: "سيرفر 4 (احتياطي)" },
  ];
  
  // Mock quality options
  const qualities = [
    { id: "480p", name: "480p (جودة منخفضة)", icon: "lucide:wifi-low" },
    { id: "720p", name: "720p (HD)", icon: "lucide:wifi" },
    { id: "1080p", name: "1080p (Full HD)", icon: "lucide:wifi" },
    { id: "4k", name: "4K (Ultra HD)", icon: "lucide:wifi" },
  ];
  
  // Mock subtitle options
  const subtitles = [
    { id: "none", name: "بدون ترجمة" },
    { id: "arabic", name: "العربية" },
    { id: "english", name: "الإنجليزية" },
  ];
  
  // Mock episodes for TV shows
  const episodes = isMovie ? [] : Array.from({ length: 10 }, (_, i) => ({
    id: `ep${i+1}`,
    number: i+1,
    title: `الحلقة ${i+1}`,
    duration: "45 دقيقة",
    thumbnail: `https://picsum.photos/300/200?random=${i+1}`,
  }));
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="py-6">
      <Card className="mb-6">
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-xl font-bold">مشاهدة {isMovie ? 'الفيلم' : 'المسلسل'}</h2>
          <div className="flex gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="flat" 
                  endContent={<Icon icon="lucide:chevron-down" />}
                >
                  {servers.find(s => s.id === selectedServer)?.name}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="اختر السيرفر"
                onAction={(key) => setSelectedServer(key as string)}
              >
                {servers.map(server => (
                  <DropdownItem key={server.id}>
                    {server.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="flat" 
                  endContent={<Icon icon="lucide:chevron-down" />}
                >
                  {qualities.find(q => q.id === selectedQuality)?.name}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="اختر الجودة"
                onAction={(key) => setSelectedQuality(key as string)}
              >
                {qualities.map(quality => (
                  <DropdownItem 
                    key={quality.id}
                    startContent={<Icon icon={quality.icon} />}
                  >
                    {quality.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="flat" 
                  endContent={<Icon icon="lucide:chevron-down" />}
                >
                  {subtitles.find(s => s.id === selectedSubtitle)?.name}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="اختر الترجمة"
                onAction={(key) => setSelectedSubtitle(key as string)}
              >
                {subtitles.map(subtitle => (
                  <DropdownItem key={subtitle.id}>
                    {subtitle.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>
        <CardBody>
          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                isIconOnly
                size="lg"
                color="primary"
                variant="shadow"
                onPress={handlePlayPause}
                className="w-16 h-16 rounded-full"
              >
                <Icon icon={isPlaying ? "lucide:pause" : "lucide:play"} className="text-3xl" />
              </Button>
            </div>
            
            {/* Video controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white text-sm">{formatTime(currentTime)}</span>
                <div className="flex-1 h-1 bg-white/30 rounded-full">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></div>
                </div>
                <span className="text-white text-sm">{formatTime(duration)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button isIconOnly variant="light" size="sm">
                    <Icon icon="lucide:play" className="text-white" />
                  </Button>
                  <Button isIconOnly variant="light" size="sm">
                    <Icon icon="lucide:volume-2" className="text-white" />
                  </Button>
                  <Button isIconOnly variant="light" size="sm">
                    <Icon icon="lucide:subtitles" className="text-white" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button isIconOnly variant="light" size="sm">
                    <Icon icon="lucide:settings" className="text-white" />
                  </Button>
                  <Button isIconOnly variant="light" size="sm">
                    <Icon icon="lucide:maximize" className="text-white" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {!isMovie && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">الحلقات</h2>
          </CardHeader>
          <CardBody>
            <Tabs aria-label="المواسم" color="primary">
              <Tab key="season1" title="الموسم 1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  {episodes.map((episode) => (
                    <Card key={episode.id} isPressable className="flex flex-row h-24">
                      <img 
                        src={episode.thumbnail} 
                        alt={episode.title}
                        className="h-full w-32 object-cover"
                      />
                      <div className="flex flex-col justify-center p-3 flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{episode.title}</h3>
                          <span className="text-sm text-default-500">{episode.duration}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <Button size="sm" color="primary" endContent={<Icon icon="lucide:play" />}>
                            مشاهدة
                          </Button>
                          <Button isIconOnly size="sm" variant="light">
                            <Icon icon="lucide:download" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Tab>
              <Tab key="season2" title="الموسم 2">
                <div className="flex items-center justify-center h-40">
                  <p className="text-default-500">لا توجد حلقات متاحة حاليًا</p>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      )}
    </div>
  );
}