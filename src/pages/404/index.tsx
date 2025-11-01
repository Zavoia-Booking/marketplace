import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { SearchX, Home, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-12 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-purple-100 mb-6">
            <SearchX className="h-12 w-12 text-purple-600" />
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate(-1)}
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Button>
            <Link to="/">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-700">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-4">Looking for something specific?</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/search">
                <Button variant="ghost" size="sm">Search Services</Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="sm">My Profile</Button>
              </Link>
              <Link to="/blog">
                <Button variant="ghost" size="sm">Blog</Button>
              </Link>
              <Link to="/business/pricing">
                <Button variant="ghost" size="sm">Business Info</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;

