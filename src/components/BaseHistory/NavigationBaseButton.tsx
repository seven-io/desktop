import {JSXElementConstructor, SVGProps} from 'react'
import type {NavigationBaseProps, Operator} from '../../types'
import {Button, type ButtonProps} from '../Button'

type NavigationBaseButtonProps = NavigationBaseProps & {
    Icon: JSXElementConstructor<SVGProps<SVGSVGElement>>
    ButtonProps: Pick<ButtonProps, 'onClick' | 'style'>
    operator: Operator
}

export const NavigationBaseButton = ({
                                         Icon,
                                         ButtonProps,
                                         index,
                                         list,
                                         operator,
                                     }: NavigationBaseButtonProps) => {
    ButtonProps.style!.position = 'absolute'

   // console.log(list)

    // @ts-ignore
    return <Button
        //className='absolute'
        disabled={undefined === list['+' === operator ? index + 1 : index - 1]}
        plain
        {...ButtonProps}
    >
        <Icon fontSize='large' style={{fontSize: '3rem'}}/>
    </Button>
}
