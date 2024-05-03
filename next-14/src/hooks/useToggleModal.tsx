import { useState } from "react";

export const useToggleModal = () => {
	const [openModal, setOpenModal] = useState<any>(false);
	return [openModal, setOpenModal];
};