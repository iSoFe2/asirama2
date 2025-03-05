import React from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Textarea, 
  Avatar, 
  Divider,
  Progress
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface MovieReviewsProps {
  movie: any;
}

export function MovieReviews({ movie }: MovieReviewsProps) {
  const [reviewText, setReviewText] = React.useState("");
  const [userRating, setUserRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  
  // Mock reviews
  const reviews = [
    {
      id: 1,
      user: {
        name: "أحمد محمد",
        avatar: "https://i.pravatar.cc/150?u=ahmed"
      },
      rating: 4.5,
      date: "منذ 3 أيام",
      content: "فيلم رائع جدًا، أحببت القصة والأداء التمثيلي. أنصح الجميع بمشاهدته!",
      likes: 15,
      dislikes: 2
    },
    {
      id: 2,
      user: {
        name: "سارة أحمد",
        avatar: "https://i.pravatar.cc/150?u=sara"
      },
      rating: 3.5,
      date: "منذ أسبوع",
      content: "الفيلم جيد، لكن النهاية كانت متوقعة. أداء الممثلين كان ممتازًا.",
      likes: 8,
      dislikes: 1
    },
    {
      id: 3,
      user: {
        name: "محمد علي",
        avatar: "https://i.pravatar.cc/150?u=mohamed"
      },
      rating: 5,
      date: "منذ أسبوعين",
      content: "من أفضل الأفلام التي شاهدتها هذا العام. القصة مشوقة والإخراج رائع والتصوير سينمائي جميل. أنصح بشدة بمشاهدته.",
      likes: 22,
      dislikes: 0
    }
  ];
  
  // Calculate rating distribution
  const ratingDistribution = {
    5: 65,
    4: 20,
    3: 10,
    2: 3,
    1: 2
  };
  
  const handleSubmitReview = () => {
    if (reviewText.trim() && userRating > 0) {
      alert("تم إرسال التقييم بنجاح!");
      setReviewText("");
      setUserRating(0);
    }
  };
  
  return (
    <div className="py-6">
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-bold">التقييمات والمراجعات</h2>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-warning">{movie.vote_average?.toFixed(1)}</div>
                <div className="flex items-center gap-1 my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon 
                      key={star}
                      icon="lucide:star" 
                      className={star <= Math.round(movie.vote_average / 2) ? "text-warning" : "text-default-300"} 
                    />
                  ))}
                </div>
                <p className="text-default-500">{movie.vote_count?.toLocaleString()} تقييم</p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">توزيع التقييمات</h3>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2 mb-2">
                    <span>{rating}</span>
                    <Icon icon="lucide:star" className="text-warning" />
                    <Progress 
                      value={ratingDistribution[rating as keyof typeof ratingDistribution]} 
                      className="flex-1" 
                      size="sm"
                      color={rating > 3 ? "success" : rating > 1 ? "warning" : "danger"}
                    />
                    <span className="text-sm text-default-500">
                      {ratingDistribution[rating as keyof typeof ratingDistribution]}%
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">تقييمات خارجية</h3>
                <div className="flex items-center justify-between mb-2">
                  <span>IMDb</span>
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:star" className="text-warning" />
                    <span>{(movie.vote_average / 10 * 8.5).toFixed(1)}/10</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Rotten Tomatoes</span>
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:percent" className="text-danger" />
                    <span>{Math.round(movie.vote_average * 10)}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Divider orientation="vertical" className="hidden md:block" />
            
            <div className="w-full md:w-2/3">
              <h3 className="text-lg font-semibold mb-3">أضف تقييمك</h3>
              <div className="flex items-center gap-2 mb-4">
                <span>التقييم:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-2xl cursor-pointer"
                    >
                      <Icon 
                        icon="lucide:star" 
                        className={(hoverRating || userRating) >= star ? "text-warning" : "text-default-300"} 
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <Textarea
                label="اكتب تقييمك"
                placeholder="شاركنا رأيك في الفيلم..."
                value={reviewText}
                onValueChange={setReviewText}
                minRows={3}
                className="mb-4"
              />
              
              <Button 
                color="primary" 
                onPress={handleSubmitReview}
                isDisabled={!reviewText.trim() || userRating === 0}
              >
                إرسال التقييم
              </Button>
              
              <Divider className="my-6" />
              
              <h3 className="text-lg font-semibold mb-4">تقييمات المستخدمين</h3>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardBody className="p-4">
                      <div className="flex gap-4">
                        <Avatar
                          src={review.avatar}
                          alt={review.user.name}
                          className="w-12 h-12"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{review.user.name}</h4>
                              <div className="flex items-center">
                                <Icon icon="lucide:star" className="text-warning text-sm" />
                                <span className="text-sm">{review.rating}</span>
                              </div>
                            </div>
                            <span className="text-small text-default-500">{review.date}</span>
                          </div>
                          <p className="text-default-600 mb-3">
                            {review.content}
                          </p>
                          <div className="flex items-center gap-4">
                            <Button size="sm" variant="light" startContent={<Icon icon="lucide:thumbs-up" />}>
                              {review.likes}
                            </Button>
                            <Button size="sm" variant="light" startContent={<Icon icon="lucide:thumbs-down" />}>
                              {review.dislikes}
                            </Button>
                            <Button size="sm" variant="light">
                              رد
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
              
              <div className="mt-4 flex justify-center">
                <Button variant="light" color="primary">
                  عرض المزيد من التقييمات
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}