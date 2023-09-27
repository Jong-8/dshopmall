export const apiHeader = (token: string, multipart?: boolean) => {
  if (!token && !multipart) return {};
  else if (token && !multipart)
    return { headers: { Authorization: `Bearer ${token}` } };
  else if (!token && multipart)
    return { headers: { "Content-Type": "multipart/form-data" } };
  else
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
};
