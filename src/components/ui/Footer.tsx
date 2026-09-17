import { Theater, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-900 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 text-amber-500 mb-4">
              <Theater className="h-6 w-6" />
              <span className="text-lg font-serif font-bold">CDA Theater Alliance</span>
            </div>
            <p className="text-stone-400 text-sm">
              Uniting the local arts community in Coeur d&apos;Alene and the greater North Idaho region.
            </p>
          </div>

          <div>
            <h3 className="text-stone-200 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><a href="/events" className="hover:text-amber-500 transition-colors">Events</a></li>
              <li><a href="/organizations" className="hover:text-amber-500 transition-colors">Organizations</a></li>
              <li><a href="/rentals" className="hover:text-amber-500 transition-colors">Rentals</a></li>
              <li><a href="/spaces" className="hover:text-amber-500 transition-colors">Spaces</a></li>
              <li><a href="/directory" className="hover:text-amber-500 transition-colors">Directory</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-stone-200 font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-stone-400">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Coeur d&apos;Alene, ID</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@cdatheateralliance.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-stone-800 text-center text-sm text-stone-500">
          <p>© {new Date().getFullYear()} CDA Theater Alliance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}