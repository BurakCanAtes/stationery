const sortByDefault = (addresses) => (
  addresses.sort((a, b) => {
    return (b.isDefault === true) - (a.isDefault === true);
  })
);

module.exports = { sortByDefault };