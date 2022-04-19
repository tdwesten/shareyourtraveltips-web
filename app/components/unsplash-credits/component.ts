import Component from '@glimmer/component';
import { Photo } from '../../../types/unsplash';

interface UnsplashCreditsArgs {
  photo: Photo;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class UnsplashCredits extends Component<UnsplashCreditsArgs> {}
