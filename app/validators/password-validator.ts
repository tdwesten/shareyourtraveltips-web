import REGEX from './password-regex';

export default function validatePasswordStrength() {
  return (_key: unknown, newValue: undefined): boolean | string => {
    const translationKey = 'validation.password';
    const regex = new RegExp(REGEX);
    //

    if (regex.test(newValue as unknown as string)) {
      return true;
    }

    return translationKey;
  };
}
