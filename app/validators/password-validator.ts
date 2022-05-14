export default function validatePasswordStrength() {
  return (_key: unknown, newValue: undefined): boolean | string => {
    const numbers_regex = new RegExp(/(?=.*\d)/);
    // const length_regex = new RegExp(LENGTH_REGEX);
    const upper_lower_case_regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])/);
    const specials_regex = new RegExp(/^(?=.*[!@#$%^&*])/);
    const length_regex = new RegExp(/^.{8,}$/);
    if (!upper_lower_case_regex.test(newValue as unknown as string)) {
      return 'validation.password.upperLowerCase';
    }

    if (!numbers_regex.test(newValue as unknown as string)) {
      return 'validation.password.numbers';
    }

    if (!specials_regex.test(newValue as unknown as string)) {
      return 'validation.password.specials';
    }

    if (!length_regex.test(newValue as unknown as string)) {
      return 'validation.password.length';
    }

    return true;
  };
}
