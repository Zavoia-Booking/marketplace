import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { CheckCircle, Calendar, Clock, MapPin, User, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookingConfirmPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-muted-foreground">
            Your appointment has been successfully scheduled
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">Premium Spa & Wellness</CardTitle>
                <CardDescription className="text-base mt-1">Swedish Massage - 60 minutes</CardDescription>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Confirmed</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold">Tomorrow, November 24, 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-semibold">2:00 PM - 3:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">123 Wellness St, Downtown</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Therapist</p>
                  <p className="font-semibold">Sarah Johnson</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Service Fee</span>
                <span className="font-semibold">$89.99</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Platform Fee</span>
                <span className="font-semibold">$5.00</span>
              </div>
              <div className="border-t pt-2 flex items-center justify-between">
                <span className="text-lg font-bold">Total Paid</span>
                <span className="text-2xl font-bold text-purple-700">$94.99</span>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg flex items-start gap-3">
              <CreditCard className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-semibold">Visa ending in 4242</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Link to="/profile" className="block">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-700" size="lg">
              View in My Bookings
            </Button>
          </Link>
          <Link to="/" className="block">
            <Button variant="outline" className="w-full" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>

        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>✓ A confirmation email has been sent to your inbox</li>
              <li>✓ You'll receive a reminder 24 hours before your appointment</li>
              <li>✓ The business will contact you if any changes occur</li>
              <li>✓ Please arrive 5 minutes early</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingConfirmPage;

