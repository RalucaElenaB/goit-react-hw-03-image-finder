import { array, func } from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import './ImageGallery.modules.css';

const ImageGallery = props => {
  const { images, openModal } = props;
  return (
    <ul className="ImageGallery">
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          openModal={openModal}
          tags={tags}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: array.isRequired,
  openModal: func.isRequired,
};

export default ImageGallery;
