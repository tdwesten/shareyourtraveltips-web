import Service from '@ember/service';
import { createApi } from 'unsplash-js';
import { Photo } from '../../types/unsplash';
import ENV from '../config/environment';

export default class Unsplash extends Service {
  async search(keyword: string) {
    const api = createApi({
      accessKey: ENV.APP.unsplashApiKey as string,
    });

    const photos = await api.search.getPhotos({
      query: keyword,
      orientation: 'landscape',
    });

    return photos.status === 200 ? photos.response?.results : null;
  }

  async getImageById(id: string): Promise<Photo | null> {
    if (!id) {
      return null;
    }

    const api = createApi({
      accessKey: ENV.APP.unsplashApiKey as string,
    });

    return await api.photos.get({ photoId: id }).then((results) => {
      return results.response as unknown as Photo;
    });
  }

  hitDownloadEvent(photo: Photo) {
    const api = createApi({
      accessKey: ENV.APP.unsplashApiKey as string,
    });

    api.photos.trackDownload({
      downloadLocation: photo.links.download_location,
    });
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    unsplash: Unsplash;
  }
}
