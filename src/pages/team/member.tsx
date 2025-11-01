import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Star, Calendar, Award, Clock } from 'lucide-react';

const TeamMemberPage = () => {
  const { memberId } = useParams<{ memberId: string }>();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-4xl font-bold border-4 border-white/30">
              SJ
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Sarah Johnson</h1>
              <p className="text-purple-100 text-lg">Lead Therapist • Member ID: {memberId}</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400 mr-1" />
                  <span className="font-semibold">4.9</span>
                  <span className="ml-1">(85 reviews)</span>
                </div>
                <Badge className="bg-white/20 backdrop-blur-sm border-white/30">
                  Deep Tissue Specialist
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Sarah is a certified massage therapist with over 10 years of experience. She specializes in 
                  deep tissue massage and has helped hundreds of clients achieve pain relief and relaxation.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Deep Tissue</Badge>
                  <Badge variant="secondary">Sports Massage</Badge>
                  <Badge variant="secondary">Trigger Point Therapy</Badge>
                  <Badge variant="secondary">Myofascial Release</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certifications & Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Certified Massage Therapist (CMT)</h4>
                      <p className="text-sm text-muted-foreground">National Certification Board, 2014</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Advanced Deep Tissue Specialist</h4>
                      <p className="text-sm text-muted-foreground">Institute of Therapeutic Arts, 2016</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">10+ Years Experience</h4>
                      <p className="text-sm text-muted-foreground">Over 3,000 sessions completed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Book a Session</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-700" size="lg">
                  <Calendar className="mr-2 h-5 w-5" />
                  Check Availability
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  Next available: Tomorrow at 2:00 PM
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-3">
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  </div>
                  <p className="text-sm text-gray-600">"Amazing therapist! Really knows deep tissue."</p>
                  <p className="text-xs text-muted-foreground mt-1">- John D.</p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  </div>
                  <p className="text-sm text-gray-600">"Best massage I've ever had!"</p>
                  <p className="text-xs text-muted-foreground mt-1">- Emily R.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberPage;

