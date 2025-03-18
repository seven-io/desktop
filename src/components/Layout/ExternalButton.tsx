import {Button, type ButtonProps} from '../catalyst/button'

type ExternalButtonProps = ButtonProps & {
    url: string
}

export const ExternalButton = ({
                                   children,
                                   className,
                                   url,
                                   ...props
                               }: ExternalButtonProps) => {
    return <Button
        className='text-white'
        onClick={() => window.require('electron').shell.openExternal(url)}
        {...props}
    >
        {children}
    </Button>
}
