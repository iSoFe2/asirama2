import React from "react";
import { Card, CardBody, Image, Button, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { getImageUrl } from "../services/tmdb-api";

interface EpisodeItemProps {
  id: string | number;
  seriesName: string;
  season: number;
  episode: number;
  year: string | number;
  category?: string;
  quality?: string;
  thumbnail: string;
}

export function EpisodeItem({
  id,
  seriesName,
  season,
  episode,
  year,
  category,
  quality = "HD",
  thumbnail
}: EpisodeItemProps) {
  return (
    <Card className="w-full mb-2" isPressable>
      <CardBody className="p-2">
        <div className="flex gap-3">
          <Image
            alt={`${seriesName} S${season}E${episode}`}
            className="object-cover rounded-md w-24 h-16"
            src={thumbnail}
          />
          <div className="flex flex-col justify-center flex-1">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-sm">{seriesName}</h4>
              <Chip size="sm" color="secondary" variant="flat">{quality}</Chip>
            </div>
            <div className="flex items-center gap-2 text-xs text-default-500">
              <span>الموسم {season} - الحلقة {episode}</span>
              <span>•</span>
              <span>{typeof year === 'string' ? year.substring(0, 4) : year}</span>
              {category && (
                <>
                  <span>•</span>
                  <span>{category}</span>
                </>
              )}
            </div>
          </div>
          <Button isIconOnly size="sm" color="primary" aria-label="مشاهدة">
            <Icon icon="lucide:play" />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}