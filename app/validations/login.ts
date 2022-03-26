// validations/employee.js
import {
  validateFormat,
  validatePresence,
} from 'ember-changeset-validations/validators';

const LOGIN_VALIDATIONS = {
  email: [
    validatePresence({ presence: true, message: 'validation.email' }),
    validateFormat({ type: 'email', message: 'validation.email' }),
  ],
  password: [
    validatePresence({ presence: true, message: 'validation.required' }),
  ],
};

export default LOGIN_VALIDATIONS;
