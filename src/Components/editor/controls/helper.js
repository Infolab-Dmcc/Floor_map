export const textSizeOptions = (current) => {
    const options = []
    for (let index = 7; index < 100; index++) {
        const size = index + 1
        const selected = size == current
        options.push({ name: size + 'px', value: size, selected })
    }
    return options
}

export const controlsInfo = [
    { name: 'tl', state: false },
    { name: 'bl', state: false },
    { name: 'tr', state: false },
    { name: 'br', state: true },
    { name: 'ml', state: true },
    { name: 'mb', state: true },
    { name: 'mr', state: true },
    { name: 'mt', state: false },
    { name: 'mtr', state: false }
]
