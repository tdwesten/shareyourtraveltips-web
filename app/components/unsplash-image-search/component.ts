import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Photo } from '../../../types/unsplash';
import Unsplash from '../../services/unsplash';
import { debounce } from '@ember/runloop';

interface UnsplashImageSearchArgs {
  onSelect: (photo: Photo) => void;
}

export default class UnsplashImageSearch extends Component<UnsplashImageSearchArgs> {
  @service private declare unsplash: Unsplash;

  @tracked public searchQuery = '';
  @tracked public declare results: Photo[];
  @tracked private declare loading: boolean;
  @tracked private currentSelectedImageIndex = 0;

  get imagesCount() {
    return this.results?.length;
  }

  get currentImage() {
    const image = this.results?.[this.currentSelectedImageIndex];

    if (image && this.args.onSelect) {
      this.args.onSelect(image);
    }

    return image?.urls.regular;
  }

  get coverPhotoStyle() {
    return this.currentImage
      ? `background-image: url(${this.currentImage})`
      : '';
  }

  async doSearch() {
    const results = await this.unsplash.search(this.searchQuery);

    if (results !== null) {
      this.results = results as unknown as Photo[];
    }
  }

  @action
  searchResults() {
    if (this.searchQuery.length > 1) {
      debounce(this, this.doSearch, 500);
    }
  }

  @action
  previousImage() {
    this.currentSelectedImageIndex = this.getPreviousImageIndex();
  }

  @action
  nextImage() {
    this.currentSelectedImageIndex = this.getNextImageIndex();
  }

  getNextImageIndex() {
    return this.currentSelectedImageIndex + 1 < this.imagesCount
      ? this.currentSelectedImageIndex + 1
      : 0;
  }

  getPreviousImageIndex() {
    return this.currentSelectedImageIndex - 1 > 0
      ? this.currentSelectedImageIndex - 1
      : this.imagesCount - 1;
  }
}
