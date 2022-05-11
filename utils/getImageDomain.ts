export const getImageDomain = (avt: string) => {
  return process.env.NEXT_PUBLIC_BASE_API_IMAGE_URL + avt;
};
