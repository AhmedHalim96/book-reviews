export const filterText = text => {
  return text.replace(/[^a-zA-Z ]/g, "").toLowerCase();
};
