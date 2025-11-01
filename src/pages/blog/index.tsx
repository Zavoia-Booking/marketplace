import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogIndexPage = () => {
  const posts = [
    {
      slug: 'how-to-choose-right-service-provider',
      title: 'How to Choose the Right Service Provider',
      excerpt: 'Learn the key factors to consider when selecting a service provider for your needs.',
      category: 'Tips & Guides',
      author: 'Sarah Johnson',
      date: 'Nov 20, 2024',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&h=400&fit=crop',
    },
    {
      slug: 'benefits-of-online-booking',
      title: '5 Benefits of Online Booking for Businesses',
      excerpt: 'Discover how online booking systems can transform your business operations.',
      category: 'Business',
      author: 'Michael Chen',
      date: 'Nov 18, 2024',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    },
    {
      slug: 'wellness-trends-2024',
      title: 'Top Wellness Trends to Watch in 2024',
      excerpt: 'Explore the latest trends in health, wellness, and self-care services.',
      category: 'Wellness',
      author: 'Emily Rodriguez',
      date: 'Nov 15, 2024',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
    },
    {
      slug: 'maximizing-your-bookings',
      title: 'Maximizing Your Bookings: Best Practices',
      excerpt: 'Expert tips for businesses to increase their booking rates and customer satisfaction.',
      category: 'Business',
      author: 'David Kim',
      date: 'Nov 12, 2024',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Tips, insights, and stories about services, wellness, and growing your business
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-white/95 text-purple-700 hover:bg-white">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-purple-700 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-base">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">By {post.author}</span>
                    <Button variant="ghost" size="sm" className="group-hover:text-purple-700">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogIndexPage;

