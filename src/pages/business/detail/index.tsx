import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Star, MapPin, Clock, Phone, Mail, Calendar } from 'lucide-react';

const BusinessDetailPage = () => {
  const { businessId } = useParams<{ businessId: string }>();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-start justify-between">
            <div>
              <Badge className="mb-4 bg-white/20 backdrop-blur-sm border-white/30">
                Health & Beauty
              </Badge>
              <h1 className="text-4xl font-bold mb-2">Premium Spa & Wellness</h1>
              <div className="flex items-center gap-4 text-purple-100">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400 mr-1" />
                  <span className="font-semibold">4.8</span>
                  <span className="ml-1">(127 reviews)</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1" />
                  <span>Downtown, City Center</span>
                </div>
              </div>
            </div>
            <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50">
              <Calendar className="mr-2 h-5 w-5" />
              Book Now
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About This Business</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Welcome to Premium Spa & Wellness! We offer a wide range of relaxing massage and spa treatments
                  designed to rejuvenate your body and mind. Our experienced therapists are dedicated to providing
                  you with the best service possible. Business ID: {businessId}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Swedish Massage', 'Deep Tissue Massage', 'Hot Stone Therapy', 'Aromatherapy'].map((service) => (
                    <div key={service} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{service}</h4>
                        <p className="text-sm text-muted-foreground">60 minutes</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-purple-700">$89.99</p>
                        <Button size="sm" variant="outline">Select</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium">Mon - Fri: 9:00 AM - 8:00 PM</p>
                    <p className="text-sm text-muted-foreground">Sat - Sun: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <span>info@premiumspa.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <span>123 Wellness St, Downtown</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailPage;

