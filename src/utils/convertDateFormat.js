function convertDateFormat(dateString) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
}
export default convertDateFormat;