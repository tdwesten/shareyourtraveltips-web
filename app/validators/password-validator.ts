import { passwordStrength } from 'check-password-strength';

export default function validatePasswordStrength() {
  return (_key: unknown, newValue: undefined): boolean | string => {
    const translationKey = 'validation.password';

    const strength = passwordStrength(newValue as unknown as string);

    if (strength.id >= 3) {
      return true;
    }

    return translationKey;
  };
}
