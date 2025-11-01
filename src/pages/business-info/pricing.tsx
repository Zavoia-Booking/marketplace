import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Check, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const BusinessPricingPage = () => {
  const plans = [
    {
      name: 'Starter',
      price: '29',
      description: 'Perfect for small businesses just getting started',
      features: [
        'Up to 50 bookings per month',
        'Basic calendar management',
        'Email notifications',
        'Mobile app access',
        'Standard support',
      ],
    },
    {
      name: 'Professional',
      price: '79',
      description: 'Ideal for growing businesses',
      features: [
        'Unlimited bookings',
        'Advanced calendar & scheduling',
        'SMS & email notifications',
        'Team management (up to 10)',
        'Priority support',
        'Custom branding',
        'Analytics & reporting',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '199',
      description: 'For established businesses at scale',
      features: [
        'Everything in Professional',
        'Unlimited team members',
        'Advanced analytics',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'White-label solution',
        '24/7 premium support',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing for Businesses</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Choose the perfect plan to grow your business and streamline your bookings
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.popular ? 'border-purple-600 border-2 shadow-xl' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
                    <Zap className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="mb-2">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/business/register" className="block">
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-indigo-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                  >
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Have questions about our pricing?</h3>
          <p className="text-muted-foreground mb-6">Our team is here to help you choose the right plan</p>
          <Button size="lg" variant="outline">
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BusinessPricingPage;

