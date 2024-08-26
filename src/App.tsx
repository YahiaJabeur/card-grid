import { useState } from 'react';
import './App.css';
import { Error } from './components/Error';
import { Grid } from './components/Grid';
import { LoadingIndicator } from './components/LoadingIndicator';
import { LoadMoreButton } from './components/LoadMoreButton';
import { Modal } from './components/Modal';
import { useFetchGiphies } from './hooks/useFetchGiphies';
import { GifType } from './types/GifType';

const App: React.FC = () => {
  const { gifs, loading, error, loadingMore, loadGifs, hasMore } = useFetchGiphies();
  const [selectedGif, setSelectedGif] = useState<GifType | null>(null);

  const handleCardClick = (gif: GifType) => setSelectedGif(gif);
  const handleCloseModal = () => setSelectedGif(null);

  return (
    <div>
      {loading && <LoadingIndicator />}
      {error && <Error message={error} />}
      <Grid gifs={gifs} onCardClick={handleCardClick} />
      {selectedGif && <Modal gif={selectedGif} onClose={handleCloseModal} />}
      {!loading && hasMore && <LoadMoreButton onClick={loadGifs} isLoading={loadingMore} />}
    </div>
  );
};

export default App;
