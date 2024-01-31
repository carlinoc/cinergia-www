// Import necessary dependencies and types
import React from 'react';
import { HeroCard } from '@/app/ui/components/Content/Hero/HeroCard';
import { fetchFreeShortsList, fetchMovieDetails } from '@/app/lib/data/fetch';

/**
 * Fetches trending movies and renders the HeroCard component.
 *
 * @component
 * @returns {Promise<JSX.Element>} - Promise resolving to the rendered HeroCard component with trending movies.
 * @throws {Error} - Throws an error if there's an issue fetching data for the Hero component.
 */
export async function Hero(): Promise<JSX.Element> {
  try {
    // Fetch the list of trending movies
    const { data: moviesData }: { data: FreeShortsMoviesListAPI[] } =
      await fetchFreeShortsList();

    // Retrieve details of the first movie in the list
    const firstMovie: FreeShortsMoviesListAPI = moviesData[0];
    // Fetch details for the recommended movie
    const { data: firstMovieData }: { data: MovieDetailsAPI[] } =
      await fetchMovieDetails(firstMovie?.slug);

    const firstMovieDetails: MovieDetailsAPI = firstMovieData[0];

    /**
     * Render the JSX for the Hero component
     */
    return (
      <HeroCard firstMovieDetails={firstMovieDetails} movieList={moviesData} />
    );
  } catch (error) {
    // Handle errors and throw an informative error message
    throw new Error(`Error fetching data for Hero component: ${error}`);
  }
}
