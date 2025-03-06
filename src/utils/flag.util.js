export default {
    enable: (flag, value) => value | flag,
    disable: (flag, value) => value & ~flag,
    toggle: (flag, value) => value ^ flag,
    isEnabled: (flag, value) => Boolean(value & flag),
    isDisabled: (flag, value) => (value & flag) !== flag,
}
