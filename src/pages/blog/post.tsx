import { useParams, Link } from 'react-router-dom';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Link to="/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-8">
          <Badge className="mb-4">Tips & Guides</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How to Choose the Right Service Provider
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              <span>Sarah Johnson</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>November 20, 2024</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>5 min read</span>
            </div>
          </div>

          <div className="relative h-96 rounded-xl overflow-hidden mb-8">
            <img
              src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&h=600&fit=crop"
              alt="Blog post cover"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex justify-end mb-8">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share Article
            </Button>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            Finding the right service provider can make all the difference in your experience. 
            Whether you're looking for a spa treatment, fitness trainer, or home services, 
            here's what you need to know to make an informed decision. Post slug: {slug}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Check Reviews and Ratings</h2>
          <p className="text-gray-600 mb-6">
            One of the most reliable ways to gauge the quality of a service provider is through 
            reviews from previous customers. Look for consistent patterns in feedback, both positive 
            and negative. Pay attention to how businesses respond to criticism—this can tell you 
            a lot about their customer service approach.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Verify Credentials and Experience</h2>
          <p className="text-gray-600 mb-6">
            Always ensure that your service provider has the necessary certifications, licenses, 
            and insurance. Check how long they've been in business and what specialized training 
            they've received. Experience matters, especially for services that require specific skills.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Compare Pricing</h2>
          <p className="text-gray-600 mb-6">
            While price shouldn't be the only factor, it's important to understand the market rate 
            for the service you need. Be wary of prices that seem too good to be true—they often are. 
            Quality service providers price their work fairly based on their expertise and overhead costs.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Communication is Key</h2>
          <p className="text-gray-600 mb-6">
            Pay attention to how responsive and professional a service provider is during your initial 
            interactions. Do they answer your questions thoroughly? Are they clear about their services 
            and pricing? Good communication from the start usually means a smoother experience overall.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Trust Your Instincts</h2>
          <p className="text-gray-600 mb-6">
            Finally, trust your gut feeling. If something doesn't feel right about a service provider, 
            it's okay to keep looking. The right provider will make you feel comfortable, confident, 
            and valued as a customer.
          </p>

          <Card className="bg-purple-50 border-purple-200 mt-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Tip</h3>
              <p className="text-gray-700">
                Use our platform's advanced filtering options to narrow down your search based on 
                ratings, price range, location, and availability. This can save you hours of research 
                and help you find the perfect match for your needs.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 pt-8 border-t">
          <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/blog/benefits-of-online-booking">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Badge className="mb-3">Business</Badge>
                  <h4 className="font-semibold text-lg mb-2 hover:text-purple-700">
                    5 Benefits of Online Booking for Businesses
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Discover how online booking systems can transform your business operations.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/blog/wellness-trends-2024">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Badge className="mb-3">Wellness</Badge>
                  <h4 className="font-semibold text-lg mb-2 hover:text-purple-700">
                    Top Wellness Trends to Watch in 2024
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Explore the latest trends in health, wellness, and self-care services.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;

