/// <reference types="astro/client" />

interface Window {
    openPopup: (id: string) => void;
    closePopup: (id: string) => void;
}