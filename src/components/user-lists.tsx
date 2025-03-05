import React from "react";
import { Tabs, Tab, Card, CardBody, Image } from "@heroui/react";
import { Icon } from "@iconify/react";

interface MediaItemProps {
  id: string;
  title: string;
  poster: string;
  progress?: number;
}

function MediaItem({ id, title, poster, progress }: MediaItemProps) {
  return (
    <Card className="w-full" isPressable>
      <CardBody className="p-0">
        <div className="flex gap-3 p-2">
          <Image
            alt={title}
            className="object-cover rounded-md w-16 h-20"
            src={poster}
          />
          <div className="flex flex-col justify-center">
            <h4 className="font-medium text-sm">{title}</h4>
            {progress !== undefined && (
              <div className="w-full bg-default-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export function UserLists() {
  const favoriteItems = [
    { id: "1", title: "الحفرة", poster: "https://picsum.photos/200/300?random=1" },
    { id: "2", title: "لعبة الحبار", poster: "https://picsum.photos/200/300?random=2" },
    { id: "3", title: "بيكي بلايندرز", poster: "https://picsum.photos/200/300?random=3" }
  ];
  
  const watchLaterItems = [
    { id: "4", title: "المنزل الورقي", poster: "https://picsum.photos/200/300?random=4" },
    { id: "5", title: "الأموات السائرون", poster: "https://picsum.photos/200/300?random=5" }
  ];
  
  const historyItems = [
    { id: "6", title: "الوادي", poster: "https://picsum.photos/200/300?random=6", progress: 75 },
    { id: "7", title: "أوزارك", poster: "https://picsum.photos/200/300?random=7", progress: 30 },
    { id: "8", title: "تاج", poster: "https://picsum.photos/200/300?random=8", progress: 100 }
  ];

  return (
    <div className="w-full">
      <Tabs aria-label="قوائم المستخدمين" color="primary">
        <Tab
          key="favorites"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:heart" />
              <span>قائمتي</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 gap-2 mt-2">
            {favoriteItems.map((item) => (
              <MediaItem key={item.id} {...item} />
            ))}
          </div>
        </Tab>
        <Tab
          key="watch-later"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:bookmark" />
              <span>المشاهدة لاحقًا</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 gap-2 mt-2">
            {watchLaterItems.map((item) => (
              <MediaItem key={item.id} {...item} />
            ))}
          </div>
        </Tab>
        <Tab
          key="history"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:history" />
              <span>التاريخ</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 gap-2 mt-2">
            {historyItems.map((item) => (
              <MediaItem key={item.id} {...item} progress={item.progress} />
            ))}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}