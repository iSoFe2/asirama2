import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

interface CategoryCardProps {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export function CategoryCard({ id, name, icon, color }: CategoryCardProps) {
  return (
    <Card className="w-full" isPressable>
      <CardBody className="flex flex-col items-center justify-center p-4 gap-2">
        <Icon icon={icon} className={`text-${color} text-3xl`} />
        <p className="font-medium text-center">{name}</p>
      </CardBody>
    </Card>
  );
}