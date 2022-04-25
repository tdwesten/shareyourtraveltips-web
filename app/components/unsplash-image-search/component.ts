import { action } from '@ember/object';
import { debounce } from '@ember/runloop';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { BufferedChangeset } from 'validated-changeset';
import { Photo } from '../../../types/unsplash';
import Unsplash from '../../services/unsplash';

interface UnsplashImageSearchArgs {
  image: Photo | null;
  changeset: BufferedChangeset;
  id: string;
}

export default class UnsplashImageSearch extends Component<UnsplashImageSearchArgs> {
  @service private declare unsplash: Unsplash;
  @tracked public searchQuery = '';
  @tracked public results: Photo[] = [];
  @tracked public loading = false;
  @tracked private currentSelectedImageIndex = 0;
  @tracked errors: Errors<string> = [];

  constructor(owner: unknown, args: UnsplashImageSearchArgs) {
    super(owner, args);

    this.setDefaultImage();

    this.args.changeset.on('afterValidation', () => {
      this.errors = this.args.changeset.errors.filter(
        (error: { key: string }) => error.key === this.args.id
      );
    });
  }

  @action
  setDefaultImage() {
    if (this.args.image) {
      this.unsplash.getImageById(this.args.image.id).then((img) => {
        if (img) {
          this.results = [img];
        }
      });
    } else {
      this.results = [];
    }
  }

  get errorMessage() {
    return this.errors.length > 0 ? this.errors[0]?.validation[0] : undefined;
  }

  get hasError() {
    return this.errors.length > 0;
  }

  get imagesCount() {
    return this.results?.length;
  }

  get hasMultipleImages() {
    return this.results?.length > 1;
  }

  get noResults() {
    return this.results?.length === 0 && this.loading === false;
  }

  get currentImage() {
    const image = this.results?.[this.currentSelectedImageIndex];

    return image?.urls.regular;
  }

  get coverPhotoStyle() {
    return this.currentImage
      ? `background-image: url(${this.currentImage})`
      : '';
  }

  async doSearch() {
    this.results = [];
    const results = await this.unsplash.search(this.searchQuery);

    if (results !== null) {
      this.loading = false;
      this.results = results as unknown as Photo[];
      this.currentSelectedImageIndex = 0;
      this.setImage();
    }
  }

  @action
  setImage() {
    if (this.results?.[this.currentSelectedImageIndex]) {
      const photo = this.results[this.currentSelectedImageIndex];
      if (photo) {
        this.unsplash.hitDownloadEvent(photo);
      }
      this.args.changeset.set(
        this.args.id,
        this.results?.[this.currentSelectedImageIndex]
      );
    }
  }

  @action
  searchResults() {
    if (this.searchQuery.length > 1) {
      this.loading = true;
      debounce(this, this.doSearch, 200);
    }
  }

  @action
  previousImage() {
    this.currentSelectedImageIndex = this.getPreviousImageIndex();
    this.setImage();
  }

  @action
  nextImage() {
    this.currentSelectedImageIndex = this.getNextImageIndex();
    this.setImage();
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
