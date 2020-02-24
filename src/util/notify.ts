export const notify = (message: string): boolean => {
    const isGranted = () => 'granted' === Notification.permission;

    const create = () => new Notification(message);

    if (isGranted()) {
        create();
    } else {
        Notification.requestPermission(() => {
            if (isGranted()) {
                create();
            }
        });
    }

    const event = new CustomEvent('sms77desktop', {
        detail: {
            action: 'NOTIFY',
            notification: {message}
        }
    });

    return window.dispatchEvent(event);
};