// validations/employee.js
import { validatePresence } from 'ember-changeset-validations/validators';

const TRIPVALIDATIONS = {
  title: [validatePresence({ presence: true, message: 'validations.title' })],
  description: [
    validatePresence({ presence: true, message: 'validations.description' }),
  ],
  unsplashPhotoId: [
    validatePresence({ presence: true, message: 'validations.photo' }),
  ],
};

export default TRIPVALIDATIONS;
