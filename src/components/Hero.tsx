import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Search } from "lucide-react"

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
      
      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Book Services from{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Trusted Businesses
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
            Connect with the best service providers in your area. From wellness to home services,
            find and book everything you need in one place.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-full shadow-2xl">
              <Input
                type="text"
                placeholder="What service are you looking for?"
                className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base h-12 px-6"
              />
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 rounded-full px-8 h-12 shadow-lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {["Health & Beauty", "Fitness", "Home Services", "Events", "Photography"].map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 cursor-pointer transition-all hover:-translate-y-1 text-sm py-2 px-4"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
