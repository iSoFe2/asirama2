import React from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell,
  Chip,
  Progress
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface MovieDownloadOptionsProps {
  movie: any;
  isMovie: boolean;
}

export function MovieDownloadOptions({ movie, isMovie }: MovieDownloadOptionsProps) {
  const [downloadProgress, setDownloadProgress] = React.useState<Record<string, number>>({});
  const [countdowns, setCountdowns] = React.useState<Record<string, number>>({});
  const [activeDownloads, setActiveDownloads] = React.useState<Record<string, boolean>>({});
  
  // Mock download options
  const downloadOptions = [
    { 
      id: "480p", 
      quality: "480p (SD)", 
      size: "700 MB", 
      format: "MKV", 
      servers: ["سيرفر 1", "سيرفر 2", "تورنت"] 
    },
    { 
      id: "720p", 
      quality: "720p (HD)", 
      size: "1.2 GB", 
      format: "MKV", 
      servers: ["سيرفر 1", "سيرفر 2", "تورنت"] 
    },
    { 
      id: "1080p", 
      quality: "1080p (Full HD)", 
      size: "2.5 GB", 
      format: "MKV", 
      servers: ["سيرفر 1", "سيرفر 2", "تورنت"] 
    },
    { 
      id: "4k", 
      quality: "4K (Ultra HD)", 
      size: "8.5 GB", 
      format: "MKV", 
      servers: ["سيرفر 1", "تورنت"] 
    }
  ];
  
  // Mock subtitle options
  const subtitleOptions = [
    { id: "ar", language: "العربية", format: "SRT", size: "25 KB" },
    { id: "en", language: "الإنجليزية", format: "SRT", size: "28 KB" },
    { id: "fr", language: "الفرنسية", format: "SRT", size: "26 KB" },
  ];
  
  const startDownload = (id: string, server: string) => {
    // Start countdown for direct downloads
    if (server !== "تورنت") {
      setCountdowns(prev => ({ ...prev, [`${id}-${server}`]: 10 }));
      
      const countdownInterval = setInterval(() => {
        setCountdowns(prev => {
          const currentCount = prev[`${id}-${server}`];
          if (currentCount <= 1) {
            clearInterval(countdownInterval);
            simulateDownload(id, server);
            return { ...prev, [`${id}-${server}`]: 0 };
          }
          return { ...prev, [`${id}-${server}`]: currentCount - 1 };
        });
      }, 1000);
    } else {
      // For torrent, start download immediately
      simulateDownload(id, server);
    }
  };
  
  const simulateDownload = (id: string, server: string) => {
    const key = `${id}-${server}`;
    setActiveDownloads(prev => ({ ...prev, [key]: true }));
    setDownloadProgress(prev => ({ ...prev, [key]: 0 }));
    
    const downloadInterval = setInterval(() => {
      setDownloadProgress(prev => {
        const currentProgress = prev[key] || 0;
        if (currentProgress >= 100) {
          clearInterval(downloadInterval);
          setActiveDownloads(prevDownloads => ({ ...prevDownloads, [key]: false }));
          return prev;
        }
        return { ...prev, [key]: currentProgress + 5 };
      });
    }, 500);
  };

  return (
    <div className="py-6">
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-bold">تحميل {isMovie ? 'الفيلم' : 'المسلسل'}</h2>
        </CardHeader>
        <CardBody>
          <Table aria-label="خيارات التحميل" className="mb-6">
            <TableHeader>
              <TableColumn>الجودة</TableColumn>
              <TableColumn>الحجم</TableColumn>
              <TableColumn>الصيغة</TableColumn>
              <TableColumn>السيرفرات</TableColumn>
            </TableHeader>
            <TableBody>
              {downloadOptions.map((option) => (
                <TableRow key={option.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Icon 
                        icon={option.id === "4k" ? "lucide:badge" : "lucide:film"} 
                        className={option.id === "4k" ? "text-warning" : ""}
                      />
                      <span>{option.quality}</span>
                    </div>
                  </TableCell>
                  <TableCell>{option.size}</TableCell>
                  <TableCell>{option.format}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {option.servers.map((server) => {
                        const key = `${option.id}-${server}`;
                        const isDownloading = activeDownloads[key];
                        const progress = downloadProgress[key] || 0;
                        const countdown = countdowns[key] || 0;
                        
                        return (
                          <div key={server} className="flex flex-col gap-1">
                            {isDownloading ? (
                              <div className="w-32">
                                <Progress 
                                  value={progress} 
                                  color="primary" 
                                  size="sm"
                                  className="mb-1"
                                />
                                <div className="flex justify-between text-xs">
                                  <span>{progress}%</span>
                                  <span>{Math.round((parseInt(option.size) * progress) / 100 * 10) / 10} MB</span>
                                </div>
                              </div>
                            ) : countdown > 0 ? (
                              <Button 
                                size="sm" 
                                color="warning" 
                                variant="flat"
                                isDisabled
                              >
                                انتظر {countdown} ثوان
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                color={server === "تورنت" ? "secondary" : "primary"} 
                                variant={server === "تورنت" ? "flat" : "solid"}
                                startContent={
                                  <Icon 
                                    icon={server === "تورنت" ? "lucide:download-cloud" : "lucide:download"} 
                                  />
                                }
                                onPress={() => startDownload(option.id, server)}
                              >
                                {server}
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">ملفات الترجمة</h2>
        </CardHeader>
        <CardBody>
          <Table aria-label="ملفات الترجمة">
            <TableHeader>
              <TableColumn>اللغة</TableColumn>
              <TableColumn>الصيغة</TableColumn>
              <TableColumn>الحجم</TableColumn>
              <TableColumn>التحميل</TableColumn>
            </TableHeader>
            <TableBody>
              {subtitleOptions.map((subtitle) => (
                <TableRow key={subtitle.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Chip size="sm" color="primary" variant="flat">{subtitle.language}</Chip>
                    </div>
                  </TableCell>
                  <TableCell>{subtitle.format}</TableCell>
                  <TableCell>{subtitle.size}</TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      color="primary" 
                      variant="light"
                      startContent={<Icon icon="lucide:download" />}
                    >
                      تحميل
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}