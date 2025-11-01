import type { Service } from '../store/slices/servicesSlice';
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Star, ArrowRight } from "lucide-react"

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 shadow-md">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={service.image}
          alt={service.businessName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <Badge 
          className="absolute top-4 right-4 bg-white/95 text-purple-700 hover:bg-white border-0 shadow-lg"
        >
          {service.category}
        </Badge>
      </div>

      {/* Content */}
      <CardHeader className="pb-3">
        <h3 className="text-xl font-bold text-gray-900 leading-tight">
          {service.businessName}
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          {service.description}
        </p>
      </CardHeader>

      <CardContent className="pb-4">
        {/* Rating and Price */}
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-1.5">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-gray-900">{service.rating}</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">From</p>
            <p className="text-2xl font-bold text-purple-700">${service.price}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button 
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 group/btn"
          size="lg"
        >
          Book Now
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
