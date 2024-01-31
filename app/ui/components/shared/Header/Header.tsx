// Import necessary dependencies and types
import { fetchTrending } from '@/app/lib/data/data';
import { Navbar } from './Navbar';

/**
 * Header Component
 *
 * A React component representing the header section of the application. It includes the Navbar component,
 * which displays the navigation bar with trending movies.
 *
 * @component
 * @returns {JSX.Element} - JSX element representing the Header component.
 */

export async function Header() {
  // Fetch trending movies
  const { results: trendingResults }: { results: TrendingMovieType[] } =
    await fetchTrending();
  // Extract the top 5 trending movies
  const treandingData = trendingResults.slice(0, 5);
  /**
   * Render the JSX for the Header component
   */
  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full">
      <Navbar myListData={treandingData} />
    </header>
  );
}
