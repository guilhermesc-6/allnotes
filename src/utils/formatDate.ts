export const formatDate = (date: string) => {
  const newDate = date.split(" ");

  return `${newDate[0]}, ${newDate[2]} ${newDate[1]}, ${newDate[3]}`;
};
