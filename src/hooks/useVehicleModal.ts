import { useState } from 'react';

export const useVehicleModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
    const [vehicleType, setVehicleType] = useState<'lkw' | 'chassi'>('lkw');

    const openModal = (vehicle: any, type: 'lkw' | 'chassi') => {
        setSelectedVehicle(vehicle);
        setVehicleType(type);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedVehicle(null);
    };

    return {
        isOpen,
        selectedVehicle,
        vehicleType,
        openModal,
        closeModal
    };
};