// Import necessary dependencies and types
import { fetchMovieListForGenre } from '@/app/lib/data/fetch';
import { Hero } from '@/app/ui/components/Genres/Hero';
import { MovieList } from '@/app/ui/components/Genres/MovieList';
import { NoMoviesAvailable } from '@/app/ui/components/Genres/NoMoviesAvailable';
import { ScrollTopButtonWrapper } from '@/app/ui/components/shared/ScrollTopButtonWrapper';

/**
 * Genre Page
 *
 * This page component fetches and displays information about movies belonging to a specific genre.
 * It utilizes the `fetchMovieListForGenre` function to retrieve the list of movies for the specified genre
 * and displays a Hero component featuring the first movie from the fetched list. If no movies are available,
 * it displays a message using the NoMoviesAvailable component.
 *
 * @component
 * @param {Object} params - The parameters object containing the genre slug.
 * @param {string} params.genre - The slug of the genre to display.
 * @returns {JSX.Element} - JSX element representing the Genre Page.
 */
export default async function GenrePage({
  params,
}: {
  params: { genre: string };
}) {
  // Extract genre slug from parameters
  const genreSlug = params.genre;

  try {
    // Fetch the list of movies for the specified genre
    const { data }: { data: GenreInfoAPI[] } = await fetchMovieListForGenre({
      genreSlug: genreSlug,
      top: 10,
    });

    // Extract genre information from the first movie in the list
    const genreInfo: GenreInfoAPI = {
      id: data[0]?.id,
      name: data[0]?.name,
      description: data[0]?.description,
      movies: data[0]?.movies,
    };

    const movieList = data[0]?.movies;

    // If there are movies available, display the Hero component with information about the first movie
    if (movieList.length > 0) {
      const firstMovie = movieList[0];

      return (
        <section className="w-full">
          <ScrollTopButtonWrapper>
            <>
              <Hero genreInfo={genreInfo} movieInfo={firstMovie} />
              <MovieList genreInfo={genreInfo} movieList={movieList} />
            </>
          </ScrollTopButtonWrapper>
        </section>
      );
    }
  } catch (error) {
    // Handle errors when fetching the movie list
    console.error('Error fetching movie list:', error);
  }

  // Display a message when no movies are available
  return <NoMoviesAvailable />;
}
