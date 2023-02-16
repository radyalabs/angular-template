const createParams = (object: Record<string, unknown>) => {
  const params: URLSearchParams = new URLSearchParams();
  Object.keys(object).forEach((key: string) => {
    if (object[key]) {
      if (Array.isArray(object[key])) {
        (object[key] as unknown[] || []).forEach((item) => {
          params.append(`${key.toString()}[]`, String(item));
        });
      } else {
        params.append(key.toString(), String(object[key]));
      }
    }
  });
};

export default createParams;
