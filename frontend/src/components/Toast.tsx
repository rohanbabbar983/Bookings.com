import { useEffect } from "react";

type ToastProps = {
    message: string;
    type: "SUCCESS" | "ERROR";
    onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => {
            clearTimeout(timer);
        }
    }, [onClose]);

    const styles = type === "SUCCESS"
        ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-black text-white border border-green-800 shadow-lg transform transition-transform duration-500 ease-in-out"
        : "fixed top-4 right-4 z-50 p-4 rounded-md bg-black text-red-500 border border-red-500 shadow-lg transform transition-transform duration-500 ease-in-out";

    return (
        <div className={styles}>
            <div className="flex items-center">
                <div className="flex-grow">
                    <span className="text-lg font-semibold">{message}</span>
                </div>
                <button onClick={onClose} className="ml-4 text-white font-bold">
                    &times;
                </button>
            </div>
        </div>
    )
}

export default Toast;
