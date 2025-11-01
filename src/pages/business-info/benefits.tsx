import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Calendar, Users, BarChart3, Smartphone, Clock, DollarSign, Star, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

const BusinessBenefitsPage = () => {
  const benefits = [
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Automated booking system that works 24/7, reducing no-shows and double bookings.',
    },
    {
      icon: Users,
      title: 'Customer Management',
      description: 'Keep track of your clients, their preferences, and booking history all in one place.',
    },
    {
      icon: BarChart3,
      title: 'Business Analytics',
      description: 'Get insights into your business performance with detailed reports and metrics.',
    },
    {
      icon: Smartphone,
      title: 'Mobile-First',
      description: 'Manage your business on the go with our powerful mobile app for iOS and Android.',
    },
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Automate repetitive tasks and focus on what matters - growing your business.',
    },
    {
      icon: DollarSign,
      title: 'Increase Revenue',
      description: 'Reduce missed appointments and make it easier for customers to book with you.',
    },
    {
      icon: Star,
      title: 'Build Reputation',
      description: 'Collect reviews and showcase your best work to attract more customers.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      description: 'Get help whenever you need it with our responsive customer support team.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Why Join Our Platform?</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Everything you need to manage and grow your service business, all in one powerful platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/business/register">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/business/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card key={benefit.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-20 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Thousands of Successful Businesses</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            From solo practitioners to large teams, businesses of all sizes trust our platform to manage their bookings
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <p className="text-4xl font-bold text-purple-700 mb-2">10K+</p>
              <p className="text-muted-foreground">Active Businesses</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-700 mb-2">500K+</p>
              <p className="text-muted-foreground">Monthly Bookings</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-700 mb-2">4.9★</p>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
          </div>
          <Link to="/business/register">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-700">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessBenefitsPage;

