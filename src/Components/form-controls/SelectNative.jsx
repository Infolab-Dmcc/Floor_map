import React from 'react'

export default function SelectNative({
    options,
    onChange,
    className,
    ...otherProps
}) {
    return (
        <select
            className={`select select-bordered ${className}`}
            onChange={onChange}
            {...otherProps}
        >
            {options.map(({ name, ...props }) => (
                <option key={props.value} {...props}>
                    {name}
                </option>
            ))}
        </select>
    )
}
