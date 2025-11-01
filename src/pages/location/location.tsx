import { useParams } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import ServiceCard from '../../components/ServiceCard';
import { MapPin, Navigation } from 'lucide-react';

const LocationPage = () => {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  
  const locationName = locationSlug?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') || 'Location';

  const popularCategories = ['Health & Beauty', 'Fitness', 'Home Services', 'Events', 'Photography'];

  const mockServices = [
    {
      id: '1',
      businessName: 'Premium Spa & Wellness',
      category: 'Health & Beauty',
      description: 'Relaxing massage and spa treatments',
      price: 89.99,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      businessName: 'Elite Personal Training',
      category: 'Fitness',
      description: 'One-on-one personal training sessions',
      price: 65.00,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    },
    {
      id: '3',
      businessName: 'Home Cleaning Experts',
      category: 'Home Services',
      description: 'Deep cleaning and maintenance',
      price: 120.00,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-8 w-8" />
            <h1 className="text-4xl font-bold">{locationName}</h1>
          </div>
          <p className="text-purple-100 mb-6">
            Browse services available in {locationName}
          </p>
          <Button className="bg-white text-purple-700 hover:bg-purple-50">
            <Navigation className="mr-2 h-5 w-5" />
            Use My Location
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Popular Categories in {locationName}</h2>
          <div className="flex flex-wrap gap-3">
            {popularCategories.map((category) => (
              <Badge key={category} variant="secondary" className="cursor-pointer hover:bg-purple-100 text-base py-2 px-4">
                {category}
              </Badge>
            ))}
          </div>
        </Card>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Featured Services</h2>
          <p className="text-muted-foreground">
            {mockServices.length} businesses in {locationName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationPage;

