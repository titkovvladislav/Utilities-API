
module.exports.checkDate = (date) => {
    const formatDate = date * 1000;
    const verifiableDate = new Date(formatDate).toString().slice(0,18);
    const correctDate = new Date().toString().slice(0,18);

    return correctDate === verifiableDate;
}
