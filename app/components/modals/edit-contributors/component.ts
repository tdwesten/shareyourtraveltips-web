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
  @tracked error = false;
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
        .then((response: any) => {
          if (response.errors === undefined) {
            this.handleContributorAdded(response);
          }
        })
        .catch((response: any) => {
          this.handleContributorError(response);
        });
    }
  }

  handleContributorError(response: any) {
    this.isLoading = false;
    this.error = response.errors?.firstObject.code;
    this.resetModel();
    setTimeout(() => {
      this.error = false;
    }, 3000);
  }

  resetModel() {
    this.newContributor = {
      email: '',
    };
  }

  handleContributorAdded(contributor: any) {
    this.isLoading = false;
    this.contributorSuccessfullAdded = true;
    this.resetModel();

    setTimeout(() => {
      this.contributorSuccessfullAdded = false;
    }, 3000);
  }
}
