import { useParams } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import ServiceCard from '../../components/ServiceCard';
import { Search, Filter } from 'lucide-react';

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  
  const categoryName = categorySlug?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') || 'Category';

  const mockServices = [
    {
      id: '1',
      businessName: 'Premium Spa & Wellness',
      category: categoryName,
      description: 'Relaxing massage and spa treatments',
      price: 89.99,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      businessName: 'Serenity Day Spa',
      category: categoryName,
      description: 'Full body massage and relaxation',
      price: 95.00,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
    },
    {
      id: '3',
      businessName: 'Wellness Center',
      category: categoryName,
      description: 'Therapeutic massage services',
      price: 79.99,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=400&h=300&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
          <p className="text-purple-100">
            Discover the best {categoryName.toLowerCase()} services near you
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={`Search in ${categoryName}...`}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </Card>

        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {mockServices.length} results in <strong>{categoryName}</strong>
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

export default CategoryPage;

