const parseNumber = num => Number(num).toLocaleString();

const parseCurrency = (amount, { split = false } = {}) => {
    const float = parseFloat(amount).toFixed(2);
    const parts = float.split('.');
    const sign = amount < 0 ? '-' : '';

    if (split) {
        return {
            sign,
            integer_part: parseNumber(Math.abs(parts[0])),
            fractional_part: parts[1],
        };
    }

    // first part as formatted number (add commas for US) + decimal points
    const amount_formatted = parseNumber(Math.abs(parts[0])) + '.' + parts[1];

    return sign + '$' + amount_formatted;
};

const size = bytes => {
    const units = ['TB', 'GB', 'MB', 'KB', 'Bytes'];
    let unit;
    for (unit = units.pop(); units.length && bytes >= 1024; unit = units.pop()) {
        bytes /= 1024;
    }
    return bytes.toFixed(2) + unit;
};

export default {
    currency: parseCurrency,
    number: parseNumber,
    size,
};
