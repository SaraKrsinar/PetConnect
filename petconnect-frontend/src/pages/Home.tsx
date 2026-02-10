import { Link } from 'react-router-dom';
import { Button, Card, CardContent } from '../components/ui';

const features = [
  {
    icon: '📍',
    title: 'Care Points',
    description: 'Find and maintain feeding stations, water bowls, and shelters for street animals in your area.',
    link: '/care-points',
    color: 'from-primary-500 to-primary-600',
  },
  {
    icon: '🔍',
    title: 'Lost & Found',
    description: 'Report lost pets, found animals, or sightings to help reunite pets with their families.',
    link: '/lost-found',
    color: 'from-secondary-500 to-secondary-600',
  },
  {
    icon: '🏠',
    title: 'Shelters',
    description: 'Connect with local shelters and rescue organizations for adoption opportunities.',
    link: '/shelters',
    color: 'from-amber-500 to-amber-600',
  },
  {
    icon: '🗺️',
    title: 'Map View',
    description: 'Explore an interactive map showing all care points, reports, and shelters near you.',
    link: '/map',
    color: 'from-blue-500 to-blue-600',
  },
];

const stats = [
  { value: '2,500+', label: 'Care Points' },
  { value: '1,200+', label: 'Pets Reunited' },
  { value: '150+', label: 'Partner Shelters' },
  { value: '50K+', label: 'Community Members' },
];

export function Home() {
  return (
    <div className="animate-fade-in">
      <section className="bg-gradient-hero py-20 md:py-32">
        <div className="container-app">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-neutral-900 leading-tight">
              Connecting Communities to{' '}
              <span className="text-gradient">Care for Pets</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-neutral-600 leading-relaxed">
              PetConnect is a community-driven platform that helps people care for street animals,
              report lost and found pets, and connect with shelters for adoption opportunities.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/lost-found">
                <Button variant="primary" size="lg">
                  Report a Pet
                </Button>
              </Link>
              <Link to="/map">
                <Button variant="outline" size="lg">
                  Explore Map
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-neutral-100">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-primary-500">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="section-title">How PetConnect Helps</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Our platform provides tools and resources to make a real difference
              in the lives of animals in your community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <Link key={feature.title} to={feature.link}>
                <Card interactive className="h-full">
                  <CardContent className="flex gap-5">
                    <div
                      className={`
                        w-14 h-14 rounded-2xl bg-linear-to-br ${feature.color}
                        flex items-center justify-center shrink-0
                        text-2xl shadow-soft
                      `}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-neutral-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-linear-to-br from-primary-500 to-secondary-600">
        <div className="container-app text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of community members who are helping animals every day.
            Start by exploring care points near you or reporting a pet in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/care-points">
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-primary-600 border-white hover:bg-white/90"
              >
                Find Care Points
              </Button>
            </Link>
            <Link to="/shelters">
              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10"
              >
                View Shelters
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
