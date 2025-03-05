import React from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell,
  Button,
  Chip
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface UpcomingReleasesProps {
  tvShow: any;
}

export function UpcomingReleases({ tvShow }: UpcomingReleasesProps) {
  // Mock upcoming episodes
  const upcomingEpisodes = [
    {
      id: "up1",
      title: "الحلقة 8",
      season: 3,
      episode: 8,
      releaseDate: "15 يونيو 2023",
      status: "قريبًا"
    },
    {
      id: "up2",
      title: "الحلقة 9",
      season: 3,
      episode: 9,
      releaseDate: "22 يونيو 2023",
      status: "قريبًا"
    },
    {
      id: "up3",
      title: "الحلقة 10 (الأخيرة)",
      season: 3,
      episode: 10,
      releaseDate: "29 يونيو 2023",
      status: "قريبًا"
    }
  ];
  
  // Mock upcoming seasons
  const upcomingSeasons = [
    {
      id: "s4",
      title: "الموسم 4",
      episodes: 10,
      releaseDate: "مارس 2024",
      status: "قيد الإنتاج"
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Icon icon="lucide:calendar" className="text-primary" />
        <span>الإصدارات القادمة</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Episodes */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">الحلقات القادمة</h3>
          </CardHeader>
          <CardBody>
            {upcomingEpisodes.length > 0 ? (
              <Table aria-label="الحلقات القادمة">
                <TableHeader>
                  <TableColumn>الحلقة</TableColumn>
                  <TableColumn>تاريخ العرض</TableColumn>
                  <TableColumn>الحالة</TableColumn>
                  <TableColumn>تذكير</TableColumn>
                </TableHeader>
                <TableBody>
                  {upcomingEpisodes.map((episode) => (
                    <TableRow key={episode.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{episode.title}</div>
                          <div className="text-xs text-default-500">
                            الموسم {episode.season} • الحلقة {episode.episode}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{episode.releaseDate}</TableCell>
                      <TableCell>
                        <Chip color="warning" variant="flat" size="sm">
                          {episode.status}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          color="warning" 
                          variant="light"
                          startContent={<Icon icon="lucide:bell" />}
                        >
                          تذكير
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex items-center justify-center h-24">
                <p className="text-default-500">لا توجد حلقات قادمة حاليًا</p>
              </div>
            )}
          </CardBody>
        </Card>
        
        {/* Upcoming Seasons */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">المواسم القادمة</h3>
          </CardHeader>
          <CardBody>
            {upcomingSeasons.length > 0 ? (
              <Table aria-label="المواسم القادمة">
                <TableHeader>
                  <TableColumn>الموسم</TableColumn>
                  <TableColumn>عدد الحلقات</TableColumn>
                  <TableColumn>تاريخ العرض</TableColumn>
                  <TableColumn>الحالة</TableColumn>
                </TableHeader>
                <TableBody>
                  {upcomingSeasons.map((season) => (
                    <TableRow key={season.id}>
                      <TableCell>
                        <div className="font-medium">{season.title}</div>
                      </TableCell>
                      <TableCell>{season.episodes}</TableCell>
                      <TableCell>{season.releaseDate}</TableCell>
                      <TableCell>
                        <Chip color="primary" variant="flat" size="sm">
                          {season.status}
                        </Chip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex items-center justify-center h-24">
                <p className="text-default-500">لا توجد مواسم قادمة حاليًا</p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}