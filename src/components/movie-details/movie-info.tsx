import React from "react";
import { Card, CardBody, Divider, Image } from "@heroui/react";
import { getImageUrl } from "../../services/tmdb-api";

interface MovieInfoProps {
  movie: any;
  isMovie: boolean;
}

export function MovieInfo({ movie, isMovie }: MovieInfoProps) {
  // Get director
  const director = movie.credits?.crew?.find((person: any) => person.job === "Director");
  
  // Get cast (limit to 8)
  const cast = movie.credits?.cast?.slice(0, 8) || [];
  
  // Get crew members by department
  const getCrewByDepartment = (department: string) => {
    return movie.credits?.crew?.filter((person: any) => person.department === department) || [];
  };
  
  const writers = getCrewByDepartment("Writing");
  const producers = getCrewByDepartment("Production").slice(0, 3);
  
  return (
    <div className="py-6">
      <h2 className="text-xl font-bold mb-4">قصة {isMovie ? 'الفيلم' : 'المسلسل'}</h2>
      <p className="text-default-600 mb-6 leading-relaxed">
        {movie.overview || "لا يوجد وصف متاح لهذا العمل."}
      </p>
      
      <Divider className="my-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">معلومات {isMovie ? 'الفيلم' : 'المسلسل'}</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-default-500">العنوان الأصلي:</span>
              <span>{movie.original_title || movie.original_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-default-500">تاريخ الإصدار:</span>
              <span>{movie.release_date || movie.first_air_date}</span>
            </div>
            {isMovie ? (
              <div className="flex justify-between">
                <span className="text-default-500">المدة:</span>
                <span>{Math.floor(movie.runtime / 60)}س {movie.runtime % 60}د</span>
              </div>
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="text-default-500">عدد المواسم:</span>
                  <span>{movie.number_of_seasons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-500">عدد الحلقات:</span>
                  <span>{movie.number_of_episodes}</span>
                </div>
              </>
            )}
            <div className="flex justify-between">
              <span className="text-default-500">اللغة الأصلية:</span>
              <span>{movie.spoken_languages?.[0]?.name || "غير معروف"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-default-500">بلد الإنتاج:</span>
              <span>{movie.production_countries?.map((c: any) => c.name).join(', ') || "غير معروف"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-default-500">التصنيف:</span>
              <span>{movie.genres?.map((g: any) => g.name).join(', ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-default-500">الميزانية:</span>
              <span>{movie.budget ? `$${(movie.budget / 1000000).toFixed(1)} مليون` : "غير معروف"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-default-500">الإيرادات:</span>
              <span>{movie.revenue ? `$${(movie.revenue / 1000000).toFixed(1)} مليون` : "غير معروف"}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">فريق العمل</h3>
          <div className="space-y-2">
            {director && (
              <div className="flex justify-between">
                <span className="text-default-500">المخرج:</span>
                <span>{director.name}</span>
              </div>
            )}
            
            {writers.length > 0 && (
              <div className="flex justify-between">
                <span className="text-default-500">الكتّاب:</span>
                <span>{writers.map((w: any) => w.name).join(', ')}</span>
              </div>
            )}
            
            {producers.length > 0 && (
              <div className="flex justify-between">
                <span className="text-default-500">المنتجون:</span>
                <span>{producers.map((p: any) => p.name).join(', ')}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-default-500">شركة الإنتاج:</span>
              <span>{movie.production_companies?.[0]?.name || "غير معروف"}</span>
            </div>
          </div>
        </div>
      </div>
      
      <Divider className="my-6" />
      
      <h2 className="text-xl font-bold mb-4">طاقم التمثيل</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {cast.map((actor: any) => (
          <Card key={actor.id} className="text-center">
            <CardBody className="p-4">
              <Image
                alt={actor.name}
                className="object-cover rounded-full w-20 h-20 mx-auto mb-2"
                src={getImageUrl(actor.profile_path, "w185") || `https://i.pravatar.cc/150?u=${actor.name}`}
              />
              <p className="font-medium text-sm">{actor.name}</p>
              <p className="text-xs text-default-500">{actor.character}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}