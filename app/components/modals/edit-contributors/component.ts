import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { FlashMessageType } from '../../../enum/flash-message-type.enum';
import Trip from '../../../models/trip';
import NEWCONTRIBUTOR from '../../../validations/new-contributor';
import ModalsModal from '../modal/component';

export default class ModalsEditContributors extends ModalsModal<Trip> {
  validations = NEWCONTRIBUTOR;
  flashmessageTypes = FlashMessageType;
  @tracked contributorSuccessfullAdded = false;
  @tracked errors = false;
  @tracked isLoading = false;
  @tracked newContributor = {
    email: '',
  };

  get getContributors() {
    return this.args.options.model?.contributors;
  }

  get getNewContributorModel() {
    return this.newContributor;
  }

  @action
  onSuccess(): void {
    this.isLoading = true;
    if (this.args.options.model) {
      this.args.options.model
        .inviteContributor(this.newContributor)
        .then(() => {
          this.contributorSuccessfullAdded = true;
          this.newContributor = {
            email: '',
          };

          setTimeout(() => {
            this.contributorSuccessfullAdded = false;
          }, 3000);
        })
        .catch((error) => (this.errors = error));
    }
  }
}
