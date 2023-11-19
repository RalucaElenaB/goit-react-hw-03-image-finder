import React, { Component } from 'react';
import Notify from 'notiflix/build/notiflix-notify-aio';
import getImages from './API/Api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      query: '',
      page: 1,
      loading: false,
      openModal: false,
      largeImageURL: '',
      loadMore: false,
      toTop: false,
    };

    this.bottomRef = React.createRef();
  }

  scrollToBottom = () => {
    this.bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  handleSubmit = query => {
    this.setState({
      loading: true,
      images: [],
      query: query,
      page: 1,
    });
  };

  handleOpenModal = url => {
    this.setState({
      openModal: true,
      largeImageURL: url,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
      loadMore: true,
      toTop: true,
    }));
  };

  backToTop = () => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  };

  handleModalClose = () => {
    this.setState({
      openModal: false,
      largeImageURL: '',
    });
  };

  componentDidMount() {
    this.getGallery();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.getGallery();
    }
  }

  getGallery = async () => {
    const { query, page } = this.state;

    if (!query) return;

    try {
      const response = await getImages(query, page);
      let imageData = response.data;
      let imageCount = imageData.hits.length;
      let imageTotal = imageData.totalHits;
      let totalPages = Math.round(imageTotal / imageCount);

      if (imageCount === 0) {
        this.setState({
          images: [],
          loadMore: false,
          toTop: false,
        });
        Notify.failure(
          `Sorry, there are no images matching your search query: ${query}. Please try again.`
        );
        return;
      }

      const newState = { images: [...this.state.images, ...imageData.hits] };

      if (imageCount < 12) {
        this.setState({ ...newState, toTop: true });
        if (page === 1) {
          this.setState({
            loadMore: false,
            toTop: false,
          });
          Notify.success(
            `Maximum search value found, there are ${imageCount} images.`
          );
        }
      } else {
        this.setState({
          ...newState,
          loadMore: page !== totalPages,
        });
        if (page >= 2 && page <= 41) {
          this.setState({
            loadMore: true,
            toTop: true,
          });
        } else if (page === 42) {
          this.setState({
            toTop: true,
            loadMore: false,
          });
        } else if (imageTotal > 12) {
          this.setState({
            loading: true,
            loadMore: true,
            toTop: true,
          });
        }
      }
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { images, loading, loadMore, toTop, openModal, largeImageURL } =
      this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />

        <ImageGallery
          images={images}
          openModal={this.handleOpenModal}
          loadMore={this.handleLoadMore}
        />
        <div ref={this.bottomRef}></div>
        {''}
        {loading && <Loader />}
        <div className="Center-buttons">
          {loadMore && (
            <Button clickHandler={this.handleLoadMore} text="Load More" />
          )}
          {toTop && <Button clickHandler={this.backToTop} text="To Top" />}
        </div>
        {openModal && (
          <Modal
            largeImageURL={largeImageURL}
            modalClose={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}
