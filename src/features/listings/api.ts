import { apiClient } from "../../lib/http";

export interface ListingLocation {
  addressComponents: {
    latitude: number;
    longitude: number;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
  };
}

export interface Listing {
  id: string;
  businessName: string;
  category?: string;
  industryId?: number;
  description?: string;
  price?: number;
  rating?: number;
  image?: string;
  locations: ListingLocation[];
  [key: string]: any; // Allow additional fields
}

export interface ListingsSearchParams {
  lat?: number;
  lng?: number;
  radius?: number;
  search?: string;
  industryId?: number;
}

export const searchListingsApi = async (params: ListingsSearchParams): Promise<Listing[]> => {
  const queryParams = new URLSearchParams();
  
  if (params.lat !== undefined) queryParams.append('lat', params.lat.toString());
  if (params.lng !== undefined) queryParams.append('lng', params.lng.toString());
  if (params.radius !== undefined) queryParams.append('radius', params.radius.toString());
  if (params.search) queryParams.append('search', params.search);
  if (params.industryId !== undefined) queryParams.append('industryId', params.industryId.toString());

  const { data } = await apiClient().get<Listing[]>(`/marketplace/public/listings?${queryParams.toString()}`);
  return data;
};

