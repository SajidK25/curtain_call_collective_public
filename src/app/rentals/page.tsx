import { Package, Shirt, Scissors } from 'lucide-react';

export const metadata = {
  title: 'Rentals - CDA Theater Alliance',
  description: 'Rent costumes, props, and sets from local theater organizations.',
};

export default function RentalsPage() {
  const categories = [
    {
      id: 'costumes',
      name: 'Costumes',
      icon: Shirt,
      description: 'Browse costumes from our member productions',
      items: [],
    },
    {
      id: 'props',
      name: 'Props',
      icon: Package,
      description: 'Stage props and set decorations',
      items: [],
    },
    {
      id: 'sets',
      name: 'Sets',
      icon: Scissors,
      description: 'Set pieces and backdrops',
      items: [],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-stone-100 mb-4">Rentals</h1>
      <p className="text-stone-400 mb-8">
        Rent costumes, props, and sets from our member organizations.
      </p>

      <div className="bg-stone-900/50 rounded-lg border border-stone-800 p-8 mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-amber-500/20 rounded-lg">
            <Package className="h-8 w-8 text-amber-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-stone-100">Coming Soon</h2>
            <p className="text-stone-400">We&apos;re building this resource for the community.</p>
          </div>
        </div>
        <p className="text-stone-500 text-sm">
          Our rentals platform will allow you to browse and request costumes, props, and sets 
          from our member organizations. If you&apos;d like to be notified when we launch, 
          please contact us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-6 bg-stone-900/30 rounded-lg border border-stone-800 border-dashed"
          >
            <category.icon className="h-10 w-10 text-stone-600 mb-4" />
            <h3 className="text-lg font-semibold text-stone-300 mb-2">{category.name}</h3>
            <p className="text-stone-500 text-sm">{category.description}</p>
            <div className="mt-4 text-stone-600 text-sm italic">No items available</div>
          </div>
        ))}
      </div>
    </div>
  );
}