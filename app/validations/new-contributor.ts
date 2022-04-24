// validations/employee.js
import {
  validateFormat,
  validatePresence,
} from 'ember-changeset-validations/validators';

const NEWCONTRIBUTOR = {
  email: [
    validatePresence({ presence: true, message: 'validations.email' }),
    validateFormat('email'),
  ],
};

export default NEWCONTRIBUTOR;
