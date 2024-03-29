import { toast } from "react-toastify";

export function mapValidationErrors(errors) {
    const mappedErrors = [];

    Object.keys(errors).forEach((name) => {
        mappedErrors.push({
            name,
            type: 'serverSideError',
            message: errors[name][0],
        });
    });

    return mappedErrors;
}

export const handleUnprocessableEntity = (response, setError, status) => {
    const msg = response.data.message;
    const errors = response.data.errors;

    if (setError) {
        mapValidationErrors(errors).forEach(({ name, message, type }) => {
            setError(name, { type, message });
        });
    }
    return toast.error(`${msg} code: ${status}`, { theme: 'colored' });
};

const handleClientError = (response, status) => {
    const msg = response.data.message;

    if (msg) {
        return toast.error(`${msg} code: ${status}`, { theme: 'colored' });
    } else {
        return handleServerError(status);
    }
};

const handleServerError = (status) => {
    return toast.error(`The service is unavailable now. Please try again later code: ${status}`, {
        theme: 'colored',
    });
};

export const handleErrorResponse = (error, setError) => {
    const response = error.response;
    const status = response.status;

    if (status === 422) {
        return handleUnprocessableEntity(response, setError, status)
    }

    if (status === 401) {
        return
    }

    if (status >= 400 && status <= 499) {
        return handleClientError(response, status);
    }

    if (status >= 500 && status <= 599) {
        return handleServerError(status);
    }
};