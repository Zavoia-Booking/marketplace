import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import Hero from '../../components/Hero';

const HomePage = () => {
  const dispatch = useAppDispatch();
  // const { services, loading, error } = useAppSelector(state => state.services);

  useEffect(() => {
    console.log('HomePage');
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Hero />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Featured Services
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover and book services from top-rated businesses test
            </p>
          </div>

          {/* Loading State */}
          {/* {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-purple-600 mb-4" />
              <p className="text-lg text-muted-foreground">Loading services...</p>
            </div>
          )} */}

          {/* Error State */}
          {/* {error && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <p className="text-lg text-red-600">Error loading services: {error}</p>
            </div>
          )} */}

          {/* Services Grid */}
          {/* {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service: Service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )} */}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

