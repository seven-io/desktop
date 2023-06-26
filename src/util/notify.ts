const isGranted = (): boolean => {
    return 'granted' === Notification.permission;
};

const createNotification = (message: string): Notification => {
    return new Notification(message);
};

export const notify = async (message: string): Promise<boolean> => {
    if (!isGranted()) {
        const permission = await Notification.requestPermission();

        if ('granted' !== permission) {
            window.alert(message);

            return false;
        }
    }

    const event = new CustomEvent('sevendesktop', {
        detail: {
            action: 'NOTIFY',
            notification: {
                message: createNotification(message),
            },
        },
    });

    return window.dispatchEvent(event);
};
