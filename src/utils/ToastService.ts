import { toast } from 'react-toastify';

// Function to show success toast
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
  });
};

// Function to show error toast
export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
  });
};
