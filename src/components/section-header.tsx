import React from "react";
import { Button } from "@heroui/react";

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  action?: string;
}

export function SectionHeader({ title, icon, action }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      {action && (
        <Button variant="light" color="primary" size="sm">
          {action}
        </Button>
      )}
    </div>
  );
}