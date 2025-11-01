import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { User, Calendar, Settings, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const upcomingBookings = [
    { id: '1', business: 'Premium Spa & Wellness', service: 'Swedish Massage', date: 'Tomorrow, 2:00 PM' },
    { id: '2', business: 'Elite Personal Training', service: 'Training Session', date: 'Nov 25, 10:00 AM' },
  ];

  const pastBookings = [
    { id: '3', business: 'Creative Photography', service: 'Portrait Session', date: 'Oct 15, 2024', rating: 5 },
    { id: '4', business: 'Home Cleaning Experts', service: 'Deep Cleaning', date: 'Oct 10, 2024', rating: 4 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-4xl font-bold border-4 border-white/30">
                JD
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">John Doe</h1>
                <p className="text-purple-100">john.doe@example.com</p>
                <Badge className="mt-2 bg-white/20 backdrop-blur-sm border-white/30">
                  Member since 2024
                </Badge>
              </div>
            </div>
            <Link to="/profile/settings">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50">
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Upcoming Bookings
                </CardTitle>
                <CardDescription>Your scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div>
                        <h4 className="font-semibold text-lg">{booking.business}</h4>
                        <p className="text-muted-foreground">{booking.service}</p>
                        <p className="text-sm text-purple-600 font-medium mt-1">{booking.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Reschedule</Button>
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-700">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Past Bookings</CardTitle>
                <CardDescription>Your booking history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{booking.business}</h4>
                        <p className="text-sm text-muted-foreground">{booking.service}</p>
                        <p className="text-xs text-gray-500 mt-1">{booking.date}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex mr-3">
                          {[...Array(booking.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <Button variant="outline" size="sm">Book Again</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Account Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Favorite Category</p>
                  <p className="text-lg font-semibold">Health & Beauty</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Rating Given</p>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400 mr-1" />
                    <span className="text-lg font-semibold">4.8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

