import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { validateField } from '../utils/fieldValidator.utils.js';

const ErrorsContext = createContext({
  errors: {},
  errorCounts: {},
  updateFieldErrorState: () => {},
  deleteErrorById: () => {},
});

export const ErrorsContextProvider = ({ children }) => {
  const [errors, setErrors] = useState({});

  const errorCounts = useMemo(() => {
    const aggregateCounts = { invalid: 0, empty: 0 };

    Object.values(errors).forEach((userErrors) => {
      Object.values(userErrors).forEach((fieldErrors) => {
        if (fieldErrors.invalid) aggregateCounts.invalid += 1;
        if (fieldErrors.empty) aggregateCounts.empty += 1;
      });
    });

    return aggregateCounts;
  }, [errors]);

  const updateFieldErrorState = useCallback((userId, field, value) => {
    setErrors((prevErrors) => {
      const userErrors = prevErrors?.[userId] || {};
      const prevFieldError = userErrors?.[field];
      const isValid = validateField(field, value);
      const isEmpty = value.trim() === '';

      const newFieldError = {
        invalid: !isEmpty && !isValid,
        empty: isEmpty,
      };

      if (
        prevFieldError?.invalid !== newFieldError.invalid ||
        prevFieldError?.empty !== newFieldError.empty
      ) {
        return {
          ...prevErrors,
          [userId]: {
            ...userErrors,
            [field]: newFieldError,
          },
        };
      }

      return prevErrors;
    });
  }, []);

  const deleteErrorById = useCallback((userId) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[userId];
      return newErrors;
    });
  }, []);

  const contextValue = useMemo(
    () => ({ errors, errorCounts, updateFieldErrorState, deleteErrorById }),
    [errorCounts, errors, updateFieldErrorState, deleteErrorById]
  );

  return <ErrorsContext.Provider value={contextValue}>{children}</ErrorsContext.Provider>;
};

export const useErrorsContext = () => useContext(ErrorsContext);

export default ErrorsContext;
