'use client';
// Import necessary dependencies and types
import { useState, MouseEvent } from 'react';
import { PlayButton } from './PlayButton';
import { InfoSection } from './InfoSection';
import { OverviewSectionSM } from './OverviewSectionSM';
import { VideoPlayerModal } from '@/app/ui/components/shared/Modals/VideoPlayerModal';
import { HeroCardProps } from './HeroCard.model';
import { VideoPlayer } from '../../../shared/VideoPlayer';
import Script from 'next/script';

/**
 * HeroCard Component
 *
 * The HeroCard component represents a card displaying detailed information
 * about a movie, including title, release date, runtime, and overview.
 * It also includes a background image and a button to view the movie.
 *
 * @component
 * @param {HeroCardProps} props - Props for configuring the HeroCard component.
 * @param {MovieType} props.movieData - Movie data used to populate the card.
 * @param {VideoList} props.videos - List of videos related to the movie.
 * @returns {JSX.Element} - JSX element representing the HeroCard component.
 */

export function HeroCard({ movieData }: HeroCardProps): JSX.Element {
  // Destructure movieData for easier access
  const { description, whySee, image2, urlId } = movieData;
  // // State to dynamically adjust the width of the backdrop image based on screen size
  // const [widthBackdropMovie, setWidthBackdropMovie] =
  //   useState<string>('original');
  const [openModal, setOpenModal] = useState<boolean>(false);

  // useEffect(() => {
  //   // Function to handle resizing and adjust the width accordingly
  //   const handleResize = () => {
  //     const width = window.innerWidth >= 768 ? 'original' : 'original';
  //     setWidthBackdropMovie(width);
  //   };

  //   // Add event listener for window resize
  //   window.addEventListener('resize', handleResize);

  //   // Call handleResize initially
  //   handleResize();

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  const handleOpenModal = (e: MouseEvent) => {
    e.preventDefault;
    setOpenModal(!openModal);
  };

  // Render the HeroCard component with movie details
  return (
    <>
      <section
        className="overflow-hidden w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url('https://cdn.cursosya.info/${image2}')`,
        }}
      >
        <article className="w-full h-screen flex justify-center items-center bg-gradient-to-t from-bgPrimaryDark/80 via-bgPrimaryDark/10 to-transparent">
          <div className="grid grid-rows-2 justify-items-center items-end gap-16 w-11/12 h-screen py-16 lg:pt-[4.5rem] lg:pb-9">
            <PlayButton
              title="Reproducir"
              aria-label="Reproducir"
              onClick={(e) => handleOpenModal(e)}
            />
            <InfoSection movieData={movieData} />
          </div>
        </article>
      </section>
      <OverviewSectionSM overview={description || ''} whySeeIt={whySee || ''} />
      {/* Video Player */}
      {openModal ? (
        <VideoPlayerModal
          openModalState={openModal}
          handleOpenModal={setOpenModal}
        >
          <VideoPlayer
            src={`https://muse.ai/embed/${urlId}?search=0&links=0&logo=0&title=0&cover_play_position=center`}
            allowFullScreen
          />
        </VideoPlayerModal>
      ) : null}
      <Script src="https://sandbox-checkout.izipay.pe/payments/v1/js/index.js" strategy="beforeInteractive" />
      <Script src="/static/izipay.js" />
    </>
  );
}
