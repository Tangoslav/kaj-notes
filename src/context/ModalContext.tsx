import React, { createContext, useState, ReactNode, ReactElement } from 'react';

export interface ModalContextProps {
    showModal: (component: ReactElement) => void;
    hideModal: () => void;
    modalContent: ReactElement | null;
}

export const ModalContext = createContext<ModalContextProps | undefined>(
    undefined
);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [modalContent, setModalContent] = useState<ReactElement | null>(null);

    const showModal = (component: ReactElement) => {
        setModalContent(component);
    };

    const hideModal = () => {
        setModalContent(null);
    };

    return (
        <ModalContext.Provider value={{ showModal, hideModal, modalContent }}>
            {children}
            {modalContent && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
                        {modalContent}
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};
