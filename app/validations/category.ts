// validations/employee.js
import { validatePresence } from 'ember-changeset-validations/validators';
import validateBelongsToNotEmpty from '../validators/belongsto-validator';

const CATEGORYVALIDATIONS = {
  name: [validatePresence({ presence: true, message: 'validations.title' })],
  icon: [validatePresence({ presence: true, message: 'validations.title' })],
  backgroundColor: [validateBelongsToNotEmpty()],
};

export default CATEGORYVALIDATIONS;
