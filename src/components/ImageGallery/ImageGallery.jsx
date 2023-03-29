import React, { Component } from 'react';

import Fetch from 'components/ApiService/fetchPixabay';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

const getImage = new Fetch();

export default class ImageGallery extends Component {
  state = {
    images: [],
    largeImage: '',
    page: 1,
    loading: false,
    showModal: false,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { query } = this.props;

    if (prevProps.query !== query) {
      this.setState({ loading: true });
      getImage.pagination = 1;
      try {
        const { hits } = await getImage.dataFetch(query);
        this.setState({ images: hits });
      } catch (error) {
        alert(new Error('Somthing went wrong'));
      } finally {
        this.setState({ loading: false });
      }
    }
  };

  nextPage = async () => {
    getImage.pagination += 1;
    try {
      this.setState({ loading: true });
      const { hits } = await getImage.dataFetch(this.props.query);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
      }));
    } catch (error) {
      alert(new Error('Это конец!'));
    } finally {
      this.setState({ loading: false });
    }
  };

  onModal = e => {
    if (e.target.nodeName === 'DIV') {
      this.toogleModal();
    }
  };

  toogleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  getLargeImage = e => {
    const imgId = Number(e.currentTarget.id);
    const findLargeImage = this.state.images.find(el => el.id === imgId);

    this.setState({ largeImage: findLargeImage.largeImageURL });
    this.toogleModal();
  };

  render() {
    const { images, loading, showModal, largeImage } = this.state;

    return (
      <>
        {showModal && (
          <Modal
            largeImage={largeImage}
            toogleModal={this.toogleModal}
            onModal={this.onModal}
          />
        )}
        <ImageGalleryItem images={images} getLargeImage={this.getLargeImage} />
        {loading && <Loader />}
        {images.length > 1 && <Button btnNextPage={this.nextPage} />}
      </>
    );
  }
}
