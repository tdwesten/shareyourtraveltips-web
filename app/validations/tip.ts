// validations/employee.js
import { validatePresence } from 'ember-changeset-validations/validators';

const TIPVALIDATIONS = {
  title: [validatePresence({ presence: true, message: 'validations.title' })],
  description: [
    validatePresence({ presence: true, message: 'validations.description' }),
  ],
  category: [
    validatePresence({ presence: true, message: 'validations.category' }),
  ],
};

export default TIPVALIDATIONS;
