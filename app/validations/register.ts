// validations/employee.js
import {
  validateFormat,
  validatePresence,
} from 'ember-changeset-validations/validators';
import validatePasswordStrength from '../validators/password-validator';

const REGISTER_VALIDATIONS = {
  first_name: [
    validatePresence({ presence: true, message: 'validation.first_name' }),
  ],
  last_name: [
    validatePresence({ presence: true, message: 'validation.last_name' }),
  ],
  email: [
    validatePresence({ presence: true, message: 'validation.email' }),
    validateFormat({ type: 'email', message: 'validation.email' }),
  ],
  password: [validatePasswordStrength()],
};

export default REGISTER_VALIDATIONS;
