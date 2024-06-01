// This helper function, clearAlertWithDelay, utilizes setTimeout to clear an alert message after a delay of 2 seconds.
// It takes a setMessage function as an argument, which is used to update the state to null after the specified delay.
export const clearAlertWithDelay = (
  setMessage: React.Dispatch<React.SetStateAction<string | null>>
) => {
  setTimeout(() => {
    setMessage(null);
  }, 2000);
};
