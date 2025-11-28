import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { Search, MapPin, Filter, Star, Loader2 } from 'lucide-react';
import { searchListingsApi } from '../../features/listings/api';

interface Business {
  id: string;
  businessName: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  latitude: number;
  longitude: number;
  address: string;
  locationId?: string; // Track which location this business card represents
}

const SearchPage = () => {
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchRadius, setSearchRadius] = useState(20); // Default 20km radius
  const [selectedIndustryId, setSelectedIndustryId] = useState<number | undefined>(undefined);

  // Get user's location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn('Geolocation error:', error);
          // Default to Bucharest if geolocation fails
          setUserLocation({ lat: 44.4268, lng: 26.1025 });
        }
      );
    } else {
      // Default to Bucharest if geolocation not supported
      setUserLocation({ lat: 44.4268, lng: 26.1025 });
    }
  }, []);

  // Fetch listings when search params change
  useEffect(() => {
    if (!userLocation) return;

    const fetchListings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const listings = await searchListingsApi({
          lat: userLocation.lat,
          lng: userLocation.lng,
          radius: searchRadius,
          search: searchQuery || undefined,
          industryId: selectedIndustryId
        });

        // Transform listings to businesses (flatten locations)
        const transformedBusinesses: Business[] = [];
        
        listings.forEach((listing) => {
          listing.locations.forEach((location, locationIndex) => {
            const addressParts = [
              location.addressComponents.address,
              location.addressComponents.city,
              location.addressComponents.state,
              location.addressComponents.country
            ].filter(Boolean);
            
            transformedBusinesses.push({
              id: `${listing.id}-${locationIndex}`,
              businessName: listing.businessName,
              category: listing.category || 'Uncategorized',
              description: listing.description || '',
              price: listing.price || 0,
              rating: listing.rating || 0,
              image: listing.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
              latitude: location.addressComponents.latitude,
              longitude: location.addressComponents.longitude,
              address: addressParts.join(', ') || 'Address not available',
              locationId: `${listing.id}-${locationIndex}`
            });
          });
        });

        setBusinesses(transformedBusinesses);

        // Update map center if we have results
        if (transformedBusinesses.length > 0 && map.current) {
          const avgLat = transformedBusinesses.reduce((sum, b) => sum + b.latitude, 0) / transformedBusinesses.length;
          const avgLng = transformedBusinesses.reduce((sum, b) => sum + b.longitude, 0) / transformedBusinesses.length;
          
          map.current.flyTo({
            center: [avgLng, avgLat],
            zoom: transformedBusinesses.length === 1 ? 15 : 12,
            duration: 1000
          });
        }
      } catch (err: any) {
        console.error('Error fetching listings:', err);
        setError(err?.response?.data?.message || err?.message || 'Failed to fetch listings');
        setBusinesses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [userLocation, searchQuery, searchRadius, selectedIndustryId]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
    if (!apiKey) {
      console.error('VITE_MAPTILER_API_KEY is not set');
      return;
    }

    // Use user location or default
    const center = userLocation 
      ? [userLocation.lng, userLocation.lat] 
      : [26.1025, 44.4268]; // Default to Bucharest

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
      center: center as [number, number],
      zoom: 12
    });

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Update map center when user location changes
    if (userLocation && map.current) {
      map.current.flyTo({
        center: [userLocation.lng, userLocation.lat],
        zoom: 12,
        duration: 1000
      });
    }

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [userLocation]);

  // Add markers to map
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    businesses.forEach((business) => {
      // Create a custom marker element
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = selectedBusiness === business.id ? '#9333ea' : '#3b82f6';
      el.style.border = '3px solid white';
      el.style.cursor = 'pointer';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([business.longitude, business.latitude])
        .addTo(map.current!);

      // Add click handler to marker
      el.addEventListener('click', () => {
        setSelectedBusiness(business.id);
        map.current?.flyTo({
          center: [business.longitude, business.latitude],
          zoom: 15,
          duration: 1000
        });
      });

      markersRef.current.push(marker);
    });
  }, [businesses, selectedBusiness]);

  const handleBusinessClick = (business: Business, event?: React.MouseEvent) => {
    // If clicking on a link or button, don't select the business
    if (event?.target instanceof HTMLElement) {
      if (event.target.closest('a, button')) {
        return;
      }
    }
    
    setSelectedBusiness(business.id);
    if (map.current) {
      map.current.flyTo({
        center: [business.longitude, business.latitude],
        zoom: 15,
        duration: 1000
      });
    }
  };

  const handleViewDetails = (businessId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    // Extract the actual business ID (before the location index)
    const actualBusinessId = businessId.split('-')[0];
    navigate(`/business/${actualBusinessId}`);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Search Header */}
      <div className="bg-white border-b shadow-sm z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="What service are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isLoading) {
                      setIsLoading(true);
                    }
                  }}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-indigo-700"
              onClick={() => {
                // Trigger search by updating state (useEffect will handle the fetch)
                setIsLoading(true);
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Search className="mr-2 h-5 w-5" />
              )}
              Search
            </Button>
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Badge 
              variant={selectedIndustryId === undefined ? "default" : "secondary"} 
              className="cursor-pointer"
              onClick={() => setSelectedIndustryId(undefined)}
            >
              All Categories
            </Badge>
            <Badge 
              variant={selectedIndustryId === 1 ? "default" : "secondary"} 
              className="cursor-pointer"
              onClick={() => setSelectedIndustryId(1)}
            >
              Health & Beauty
            </Badge>
            <Badge 
              variant={selectedIndustryId === 2 ? "default" : "secondary"} 
              className="cursor-pointer"
              onClick={() => setSelectedIndustryId(2)}
            >
              Fitness
            </Badge>
            <Badge 
              variant={selectedIndustryId === 3 ? "default" : "secondary"} 
              className="cursor-pointer"
              onClick={() => setSelectedIndustryId(3)}
            >
              Home Services
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content: Two Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Business List */}
        <div className="w-full md:w-1/2 lg:w-2/5 border-r bg-white overflow-y-auto">
          <div className="p-4">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {isLoading ? 'Searching...' : `${businesses.length} businesses found`}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {location || (userLocation ? `Within ${searchRadius}km of your location` : 'All locations')}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {isLoading && businesses.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              </div>
            ) : businesses.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No businesses found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="space-y-4">
              {businesses.map((business) => (
                <Card
                  key={business.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedBusiness === business.id
                      ? 'ring-2 ring-purple-600 shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => handleBusinessClick(business)}
                >
                  <div className="flex">
                    <div className="w-40 h-32 flex-shrink-0">
                      <img
                        src={business.image}
                        alt={business.businessName}
                        className="w-full h-full object-cover rounded-l-lg"
                      />
                    </div>
                    <CardContent className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {business.businessName}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{business.address}</span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="ml-2">
                          {business.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {business.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-semibold">{business.rating}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-purple-700">
                            ${business.price}
                          </span>
                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700"
                            onClick={(e) => handleViewDetails(business.id, e)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Map */}
        <div className="flex-1 relative">
          <div ref={mapContainer} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
