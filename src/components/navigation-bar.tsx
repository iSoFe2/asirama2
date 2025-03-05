import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";

export function NavigationBar() {
  return (
    <div className="flex w-full flex-col">
      <Tabs 
        aria-label="القائمة الرئيسية" 
        color="primary" 
        variant="underlined"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-primary"
        }}
      >
        <Tab
          key="movies"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:film" />
              <span>أفلام</span>
            </div>
          }
        />
        <Tab
          key="series"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:tv" />
              <span>مسلسلات</span>
            </div>
          }
        />
        <Tab
          key="most-watched"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:flame" />
              <span>الأكثر مشاهدة</span>
            </div>
          }
        />
        <Tab
          key="top-rated"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:star" />
              <span>الأعلى تقييمًا</span>
            </div>
          }
        />
        <Tab
          key="categories"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:layers" />
              <span>حسب التصنيف</span>
            </div>
          }
        />
        <Tab
          key="new"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:sparkles" />
              <span>الإضافات الجديدة</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
}