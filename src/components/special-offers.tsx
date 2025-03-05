import React from "react";
import { Card, CardBody, CardFooter, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface OfferCardProps {
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  color: "primary" | "secondary" | "success" | "warning" | "danger";
  icon: string;
}

function OfferCard({ title, description, price, originalPrice, color, icon }: OfferCardProps) {
  return (
    <Card className="w-full">
      <CardBody className={`bg-${color}-100 dark:bg-${color}-900/20 p-6`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-default-600 mt-2">{description}</p>
          </div>
          <Icon icon={icon} className={`text-${color} text-3xl`} />
        </div>
        <div className="mt-6">
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold">{price}</span>
            {originalPrice && (
              <span className="text-default-400 line-through">{originalPrice}</span>
            )}
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button color={color} fullWidth>
          اشترك الآن
        </Button>
      </CardFooter>
    </Card>
  );
}

export function SpecialOffers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <OfferCard
        title="العرض الشهري"
        description="استمتع بمشاهدة غير محدودة لمدة شهر كامل"
        price="9.99$"
        color="primary"
        icon="lucide:calendar"
      />
      <OfferCard
        title="العرض السنوي"
        description="وفر 40% مع الاشتراك السنوي"
        price="59.99$"
        originalPrice="119.88$"
        color="success"
        icon="lucide:badge-percent"
      />
      <OfferCard
        title="عرض المستخدمين الجدد"
        description="شهر مجاني للمستخدمين الجدد"
        price="مجاناً"
        color="warning"
        icon="lucide:gift"
      />
    </div>
  );
}