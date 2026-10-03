import type { AppState } from '../context/reducer';

export function desktopPageTitle(state: Pick<AppState, 'tab' | 'vendor' | 'vtab2' | 'estab'>): { title: string; subtitle?: string } {
  if (state.vendor) {
    const map: Record<string, string> = {
      today: 'Today’s orders',
      menu: 'Menu',
      analytics: 'Analytics',
      reviews: 'Reviews',
      promos: 'Promotions',
      settings: 'Settings'
    };
    return { title: 'Vendor', subtitle: map[state.vtab2] || 'Dashboard' };
  }
  switch (state.tab) {
    case 'home':
      return { title: 'Home', subtitle: 'Discover food worth eating near you' };
    case 'explore':
      if (state.estab === 'community') return { title: 'Community', subtitle: 'Ask, share finds, plan food walks' };
      if (state.estab === 'reels') return { title: 'Reels', subtitle: 'Short clips from Jaipur stalls' };
      return { title: 'Explore stalls', subtitle: 'Search, filter, and compare' };
    case 'add':
      return { title: 'Add a spot', subtitle: 'Put a hidden stall on the map' };
    case 'orders':
      return { title: 'Orders', subtitle: 'Track active and past orders' };
    case 'profile':
      return { title: 'Profile', subtitle: 'Saved places, contributions, settings' };
    default:
      return { title: 'Chatorey' };
  }
}
