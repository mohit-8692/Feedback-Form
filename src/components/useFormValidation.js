import { useState } from 'react';

const useFormValidation = (validate) => {
    const [errors, setErrors] = useState({});

    const validateForm = (formData) => {
        const validationErrors = validate(formData);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    return { errors, validate: validateForm };
};

export default useFormValidation;
