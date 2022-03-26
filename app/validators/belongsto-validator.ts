export default function validateBelongsToNotEmpty() {
  return (_key: unknown, newValue: object): boolean | string => {
    const translationKey = 'validation.required';

    if (Object.keys(newValue).length > 0) {
      return true;
    }

    return translationKey;
  };
}
