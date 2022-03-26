// validations/employee.js
import { validatePresence } from 'ember-changeset-validations/validators';
import validateBelongsToNotEmpty from '../validators/belongsto-validator';

const TIPVALIDATIONS = {
  title: [validatePresence({ presence: true, message: 'validations.title' })],
  description: [
    validatePresence({ presence: true, message: 'validations.description' }),
  ],
  category: [validateBelongsToNotEmpty()],
};

export default TIPVALIDATIONS;
