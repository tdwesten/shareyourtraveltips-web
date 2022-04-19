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
};

export default TRIPVALIDATIONS;
