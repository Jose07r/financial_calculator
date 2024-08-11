function reduceDecimalsFromObject(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      return [
        key,
        typeof value === 'number' ? parseFloat(value.toFixed(2)) : value,
      ];
    })
  );
}

export default reduceDecimalsFromObject;
