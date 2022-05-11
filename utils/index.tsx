export const formatCurrency = (price: Number) => {
  return (price || 0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

export const formatPhoneNumber = (phoneNumber: String) => {
  const match = phoneNumber.match(/^(\d{4})(\d{3})(\d{3})$/);
  if (match) {
    return match[1] + " " + match[2] + " " + match[3];
  }
  return phoneNumber;
};

export const dateTimeFormat = (dt: any) => {
  const date = new Date(dt);
  const dateStr =
    ("00" + date.getDate()).slice(-2) +
    "/" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getFullYear() +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2);
  return dateStr;
};

export const timeDateFormat = (dt: any) => {
  const date = new Date(dt);
  const dateStr =
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    " " +
    ("00" + date.getDate()).slice(-2) +
    "/" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getFullYear();
  return dateStr;
};

export const timeSince = (date: any) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval;

  interval = seconds / 31536000;
  if (interval > 1) {
    return dateTimeFormat(date);
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return dateTimeFormat(date);
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return dateTimeFormat(date);
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " giờ trước";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " phút trước";
  }
  if (interval <= 1) {
    return "Vừa xong";
  }
  return dateTimeFormat(date);
};

export const timeSecondsDistance = (dt: any) => {
  const seconds = Math.floor((new Date().getTime() - dt) / 1000);
  return seconds;
};

export const queryString = (params: any) => {
  const query = Object.keys(params).filter((key) => !!params?.[key]);
  return query?.map((key) => key + "=" + params?.[key]).join("&");
};

export const slugToId = (slug: any) => {
  return [...String(slug).matchAll(/(.+?\-)?(\d+)$/gi)]?.[0]?.[2];
};
