import React from "react";
import { Input, Select, SelectItem, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export function SearchFilter() {
  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());
  
  const categories = [
    "دراما", "أكشن", "رعب", "جريمة", "غموض", 
    "كوميدي", "رومانسي", "خيال علمي", "تاريخي", "فانتازيا"
  ];
  
  const countries = [
    "الولايات المتحدة", "بريطانيا", "إسبانيا", 
    "كوريا الجنوبية", "تركيا", "الهند", "مصر"
  ];
  
  const ratings = ["5+", "6+", "7+", "8+", "9+"];

  return (
    <div className="bg-content2 p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-4">البحث المتقدم</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          label="الاسم"
          placeholder="اكتب اسم الفيلم أو المسلسل"
          startContent={<Icon icon="lucide:search" />}
        />
        
        <Select
          label="سنة الإنتاج"
          placeholder="اختر السنة"
        >
          {years.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </Select>
        
        <Select
          label="التصنيف"
          placeholder="اختر التصنيف"
        >
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </Select>
        
        <Select
          label="الدولة المنتجة"
          placeholder="اختر الدولة"
        >
          {countries.map((country) => (
            <SelectItem key={country} value={country}>
              {country}
            </SelectItem>
          ))}
        </Select>
        
        <Select
          label="التقييم"
          placeholder="اختر التقييم"
        >
          {ratings.map((rating) => (
            <SelectItem key={rating} value={rating}>
              {rating}
            </SelectItem>
          ))}
        </Select>
      </div>
      
      <div className="flex justify-end mt-4">
        <Button color="primary" endContent={<Icon icon="lucide:search" />}>
          بحث
        </Button>
      </div>
    </div>
  );
}