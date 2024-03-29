import MenuItem from '@mui/material/MenuItem'
import {ipcRenderer} from 'electron'
import os from 'os'
import {useTranslation} from 'react-i18next'
import {toMegaBytes} from '../../util/toMegaBytes'
import {PopupMenu} from '../PopupMenu'

type MessageToolbarProps = {
    onClick: (label: string) => void
}

export const SystemUtils = ({onClick}: MessageToolbarProps) => {
    const trans = useTranslation('message')
    const t = (k: string) => trans.t(`toolbar.system.${k}`)
    const userInfo = os.userInfo()

    const SYSTEM_PAIRS: { name: string, value: string | number | Promise<any> }[] = [
        {
            name: 'username',
            value: userInfo.username,
        },
        {
            name: 'gid',
            value: userInfo.gid,
        },
        {
            name: 'uid',
            value: userInfo.uid,
        },
        {
            name: 'shell',
            value: userInfo.shell || '',
        },
        {
            name: 'networkInterfaces',
            value: JSON.stringify(os.networkInterfaces()),
        },
        {
            name: 'cpus',
            value: JSON.stringify(os.cpus()),
        },
        {
            name: 'loadAverage',
            value: JSON.stringify(os.loadavg()),
        },
        {
            name: 'arch',
            value: os.arch(),
        },
        {
            name: 'ramFree',
            value: toMegaBytes(os.freemem()),
        },
        {
            name: 'homeDir',
            value: os.homedir(),
        },
        {
            name: 'hostname',
            value: os.hostname(),
        },
        {
            name: 'platform',
            value: os.platform(),
        },
        {
            name: 'release',
            value: os.release(),
        },
        {
            name: 'tempDir',
            value: os.tmpdir(),
        },
        {
            name: 'ramTotal',
            value: toMegaBytes(os.totalmem()),
        },
        {
            name: 'osType',
            value: os.type(),
        },
        {
            name: 'uptime',
            value: os.uptime(),
        },
        {
            name: 'endianness',
            value: os.endianness(),
        },
        {
            name: 'userDataDir',
            value: ipcRenderer.invoke('get-user-data-path'),
        },
    ]

    const children = SYSTEM_PAIRS.map((p, i) =>
        <MenuItem key={i} onClick={async () => onClick(await p.value as string)}>
            {t(p.name)}
        </MenuItem>)

    return <PopupMenu
        buttonText={t('label')} children={children}
        identifier='system'
    />
}
