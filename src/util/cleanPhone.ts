export const cleanPhone = (phone: string): string => {
    if (phone.startsWith('00')) {
        phone = phone.substring(2);
    }

    if (!phone.startsWith('+')) {
        phone = `+${phone}`;
    }

    return phone;
};