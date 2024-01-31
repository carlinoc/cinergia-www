'use client';
// Import necessary dependencies and types
import Link from 'next/link';
import { MouseEvent, Dispatch, SetStateAction, useRef } from 'react';
import useOnClickOutside from '@/app/lib/hooks/useOnClickOutside';
import { MyListCard } from './MyListCard';

/**
 * MyListPreview Component
 *
 * A React component representing the preview of the user's movie list. It includes a list of movies with their posters, titles, and additional information.
 *
 * @component
 * @param {Object} props - The properties of the MyListPreview component.
 * @param {Dispatch<SetStateAction<boolean>>} props.handleMyListState - A function to handle the state of MyListPreview visibility.
 * @param {boolean} props.myListState - The state of MyListPreview visibility.
 * @param {TrendingMovieType[]} props.myListData - An array of objects representing trending movies in the user's list.
 * @returns {JSX.Element} - JSX element representing the MyListPreview component.
 */
export function MyListPreview({
  handleMyListState,
  myListState,
  myListData,
}: {
  handleMyListState: Dispatch<SetStateAction<boolean>>;
  myListState: boolean;
  myListData: TrendingMovieType[];
}): JSX.Element {
  const listRef = useRef(null);

  // Handler for closing MyListPreview
  const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleMyListState(!myListState);
  };

  // Hook to close MyListPreview on clicks outside
  useOnClickOutside(listRef, () => {
    if (myListState) {
      handleMyListState(!myListState);
    }
  });

  /**
   * Render the JSX for the MyListPreview component
   */
  return (
    <section
      ref={listRef}
      className="overflow-hidden w-[80vw] lg:w-[35vw] h-screen bg-bgSecondaryDark shadow-sm shadow-neutral-600"
    >
      <header className="flex justify-between items-center w-full h-[4rem] lg:h-[4.5rem] px-4 border-b border-borderNeutral-50/10 ">
        <span className="flex items-center gap-2 heading-4 font-semibold text-textColorNeutral-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-list-details text-textColorNeutral-400"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M13 5h8" />
            <path d="M13 9h5" />
            <path d="M13 15h8" />
            <path d="M13 19h5" />
            <path d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
            <path d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
          </svg>
          <h3>Mi Lista</h3>
        </span>
        {/* Close button */}
        <button
          type="button"
          className="button-text padding-icon"
          title="Buscar"
          aria-label="Search"
          onClick={(e) => handleClose(e)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-x"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      </header>
      <div className="overflow-hidden w-full h-full pb-[4rem] lg:pb-[4.5rem]">
        <ul className="overflow-y-auto w-full h-full">
          {myListData.map((movie) => (
            <li key={`myListItem-${movie?.id}`} className="w-full">
              <MyListCard movie={movie} />
            </li>
          ))}
          <section className="w-full px-4 my-8">
            <Link
              href={''}
              className="group button-secondary padding-button w-full"
            >
              Ver Más
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-chevron-right md:group-hover:translate-x-2 transition-all duration-300 ease-in-out"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 6l6 6l-6 6" />
              </svg>
            </Link>
          </section>
        </ul>
      </div>
    </section>
  );
}
