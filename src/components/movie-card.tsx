import React from "react";
import { Card, CardBody, CardFooter, Image, Button, Chip, Badge } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { getImageUrl } from "../services/tmdb-api";

interface MovieCardProps {
  id: string | number;
  title: string;
  year: string | number;
  category?: string;
  quality?: string;
  rating: number;
  views?: number;
  poster: string;
  isExclusive?: boolean;
}

export function MovieCard({ 
  id, 
  title, 
  year, 
  category, 
  quality = "HD", 
  rating, 
  views, 
  poster,
  isExclusive = false
}: MovieCardProps) {
  const history = useHistory();
  
  const handleClick = () => {
    history.push(`/movie/${id}`);
  };
  
  return (
    <Card className="w-full h-full" isPressable onPress={handleClick}>
      <CardBody className="p-0 overflow-hidden">
        <div className="relative">
          <Image
            removeWrapper
            alt={title}
            className="z-0 w-full h-full object-cover aspect-[2/3]"
            src={poster}
          />
          {isExclusive && (
            <div className="absolute top-2 left-2">
              <Chip color="warning" variant="shadow" size="sm">حصري</Chip>
            </div>
          )}
          {views && (
            <div className="absolute top-2 right-2">
              <Badge content={views > 1000 ? `${Math.floor(views/1000)}K` : views} color="danger" shape="circle">
                <Icon icon="lucide:eye" className="text-xl" />
              </Badge>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
            <h4 className="font-bold text-white">{title} ({typeof year === 'string' ? year.substring(0, 4) : year})</h4>
            <div className="flex items-center gap-2 mt-1">
              {category && <Chip size="sm" color="primary" variant="flat">{category}</Chip>}
              <Chip size="sm" color="secondary" variant="flat">{quality}</Chip>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Icon icon="lucide:star" className="text-warning" />
          <span>{rating.toFixed(1)}/10</span>
        </div>
        <Button color="primary" size="sm" endContent={<Icon icon="lucide:play" />}>
          مشاهدة
        </Button>
      </CardFooter>
    </Card>
  );
}