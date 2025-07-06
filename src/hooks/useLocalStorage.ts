export const useLocalStorage = (key: string) => {

    const setItem = (value: string) => {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.error(error);
        }
    }

    const getItem = () => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.stringify(item) : undefined;
        } catch (error) {
            console.error(error);
        }
    }

    const removeItem = () => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(error);
        }
    }

    return {setItem, getItem, removeItem};
}