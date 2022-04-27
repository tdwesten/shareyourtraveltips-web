// validations/employee.js
import {
  validateFormat,
  validatePresence,
  validateConfirmation,
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
  password_confirmation: [
    validateConfirmation({
      on: 'password',
      message: 'validation.password_confirmation',
    }),
  ],
};

export default REGISTER_VALIDATIONS;
