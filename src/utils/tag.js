export function checkClass(condtion, classNames) {
    return classNames?.[condtion ? 0 : 1] || ''
}

export function buildClass(...classNames) {
    const classes = []

    for (const className of classNames) {
        if (typeof className === 'string') classes.push(className)
        else if (typeof className === 'function') {
            classes.push(className())
        } else if (typeof className === 'object') {
            for (const key in className) {
                if (Object.hasOwnProperty.call(className, key)) {
                    const condtion = className[key]
                    if (condtion) classes.push(key)
                    else continue
                }
            }
        } else continue
    }

    return classes.join(' ')
}
