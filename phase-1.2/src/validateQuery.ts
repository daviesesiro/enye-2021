export function validateQuery(base: any, currency: any) {
  const errors: string[] = [];

  if (!base) {
    errors.push("'base' is required");
  }

  if (!currency) {
    errors.push("'currency' is required");
  }

  if (base && (base?.length as number) !== 3) {
    errors.push(`A valid 'base' has only 3 chars and not ${base.length} chars`);
  }

  let currencyArr: string[] = [];

  if (currency) {
    currencyArr = (currency as string).toUpperCase().split(",");
    // making sure all currencies are 3 chars
    currencyArr.forEach((currency) => {
      if (currency.length !== 3)
        errors.push(`'${currency}' is not a valid currency`);
    });
  }

  return { errors, currencyArr };
}
