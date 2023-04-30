import { useState, useEffect } from 'react';
import getImages from '../components/PixabayApi/PixabayApi';
import clsx from 'clsx';
import {
  Searchbar,
  ImageGallery,
  ImageGalleryItem,
  Modal,
  Loader,
  Button,
} from './index';
import imageDefault from '../images/image_default.svg';

const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');

  const fetchImages = async (searchValue, pageValue) => {
    setIsLoading(true);

    try {
      const images = await new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          try {
            const fetchedImages = await getImages(searchValue, pageValue);
            resolve(fetchedImages);
          } catch (error) {
            reject(error);
          }
        }, 1500);
      });

      setImages(prevImages => [...prevImages, ...images]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (search) {
      fetchImages(search, 1);
    }
  }, [search]);

  const handleSearchSubmit = search => {
    setSearch(search);
    setImages([]);
    setPage(1);
  };

  const openModal = largeImageUrl => {
    setShowModal(true);
    setLargeImageUrl(largeImageUrl);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageUrl('');
  };

  return (
    <div className={clsx('App')}>
      <Searchbar onSubmit={handleSearchSubmit} />
      {images.length === 0 && !isLoading && (
        <div className={clsx('placeholderWrapper')}>
          <img
            src={imageDefault}
            alt="No results"
            className={clsx('placeholderImage')}
          />
        </div>
      )}
      {images.length > 0 && (
        <ImageGallery>
          {images.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              image={webformatURL}
              onClick={() => openModal(largeImageURL)}
            />
          ))}
        </ImageGallery>
      )}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <Button onClick={() => fetchImages(search, page)} />
      )}
      {showModal && (
        <Modal largeImageUrl={largeImageUrl} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
