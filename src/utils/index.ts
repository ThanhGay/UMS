export const formatDate = (str: any) => {
  const oriDate = new Date(str);
  const formatDate = oriDate.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  return formatDate;
};
