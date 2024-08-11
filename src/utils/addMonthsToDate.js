function addMonthsToDate(months) {
  const currDate = new Date();
  const futureDate = currDate;

  //   Add months to current data
  futureDate.setMonth(futureDate.getMonth() + months);

  return formatDate(futureDate);
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default addMonthsToDate;
