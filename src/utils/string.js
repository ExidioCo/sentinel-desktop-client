export const capitalizeFirstLetter = (value) => {
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
};

export const addScheme = (link) => /https?/.test(link) ? link : `https://${link}`;
