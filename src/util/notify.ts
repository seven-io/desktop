export const notify = async (message: string): Promise<boolean> => {
    const isGranted = () => 'granted' === Notification.permission;

    const create = () => new Notification(message);

    if (isGranted()) {
        create();
    } else {
        const permission = await Notification.requestPermission();

        if ('granted' === permission) {
            create();
        }
    }

    const event = new CustomEvent('sms77desktop', {
        detail: {
            action: 'NOTIFY',
            notification: {message}
        }
    });

    return window.dispatchEvent(event);
};