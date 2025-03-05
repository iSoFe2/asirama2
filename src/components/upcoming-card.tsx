import React from "react";
import { Card, CardBody, CardFooter, Image, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface UpcomingCardProps {
  id: string | number;
  title: string;
  poster: string;
  releaseDate: string;
}

export function UpcomingCard({ id, title, poster, releaseDate }: UpcomingCardProps) {
  return (
    <Card className="w-full">
      <CardBody className="p-0 overflow-hidden">
        <div className="relative">
          <Image
            removeWrapper
            alt={title}
            className="z-0 w-full h-full object-cover aspect-[2/3]"
            src={poster}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
            <h4 className="font-bold text-white">{title}</h4>
            <div className="flex items-center gap-2 mt-1 text-white/80">
              <Icon icon="lucide:calendar" />
              <span>{releaseDate}</span>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button 
          fullWidth 
          color="warning" 
          endContent={<Icon icon="lucide:bell" />}
        >
          تذكير عند التوفر
        </Button>
      </CardFooter>
    </Card>
  );
}