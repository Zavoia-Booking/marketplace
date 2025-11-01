import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Star, Calendar } from 'lucide-react';

const BusinessTeamPage = () => {
  const { businessId } = useParams<{ businessId: string }>();

  const teamMembers = [
    { id: '1', name: 'Sarah Johnson', role: 'Lead Therapist', rating: 4.9, reviews: 85, specialty: 'Deep Tissue' },
    { id: '2', name: 'Michael Chen', role: 'Massage Therapist', rating: 4.8, reviews: 67, specialty: 'Swedish' },
    { id: '3', name: 'Emily Rodriguez', role: 'Spa Specialist', rating: 5.0, reviews: 92, specialty: 'Hot Stone' },
    { id: '4', name: 'David Kim', role: 'Aromatherapist', rating: 4.7, reviews: 54, specialty: 'Aromatherapy' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2">Our Team</h1>
          <p className="text-purple-100">Meet our experienced professionals - Business ID: {businessId}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                      <span className="font-semibold">{member.rating}</span>
                      <span className="text-sm text-muted-foreground ml-1">({member.reviews})</span>
                    </div>
                    <Badge variant="secondary">{member.specialty}</Badge>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-700">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book with {member.name.split(' ')[0]}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessTeamPage;

