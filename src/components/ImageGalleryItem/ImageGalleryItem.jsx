import { string, func } from 'prop-types';
import './ImageGalleryItem.modules.css';

const ImageGalleryItem = props => {
  const { webformatURL, tags, largeImageURL, openModal } = props;

  return (
    <li>
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={tags}
        largeImage={largeImageURL}
        onClick={() => openModal(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.defaultProps = {
  largeImageURL: 'https://picsum.photos/100%/260',
  webformatURL: 'https://picsum.photos/100%/260',
};

ImageGalleryItem.propTypes = {
  largeImageURL: string,
  webformatURL: string,
  tags: string.isRequired,
  openModal: func.isRequired,
};

export default ImageGalleryItem;
