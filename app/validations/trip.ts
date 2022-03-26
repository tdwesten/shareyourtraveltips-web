// validations/employee.js
import {
  validateLength,
  validatePresence,
} from 'ember-changeset-validations/validators';

const TRIPVALIDATIONS = {
  title: [
    validatePresence({ presence: true, message: 'validations.title' }),
    validateLength({ min: 1 }),
  ],
  description: [
    validatePresence({ presence: true, message: 'validations.description' }),
  ],
  unsplashPhotoUrl: [
    validatePresence({ presence: true, message: 'validations.photo' }),
  ],
};

export default TRIPVALIDATIONS;
