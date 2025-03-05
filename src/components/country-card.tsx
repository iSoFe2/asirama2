import React from "react";
import { Card, CardBody, Image } from "@heroui/react";

interface CountryCardProps {
  code: string;
  name: string;
  flag: string;
}

export function CountryCard({ code, name, flag }: CountryCardProps) {
  return (
    <Card className="w-full" isPressable>
      <CardBody className="flex flex-col items-center justify-center p-4 gap-2">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            removeWrapper
            alt={name}
            className="w-full h-full object-cover"
            src={flag}
          />
        </div>
        <p className="font-medium text-center">{name}</p>
      </CardBody>
    </Card>
  );
}