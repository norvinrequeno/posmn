import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
interface ModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "full";
  showCloseButton?: boolean;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-3xl",
  full: "w-full h-full rounded-none",
};
export default function Modal({
  isOpen,
  setIsOpen,
  children,
  size = "md",
  title = "POS",
  showCloseButton = true,
}: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black opacity-65"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            exit={{ opacity: 0 }}
          />
          <div className="fixed inset-0 z-50 flex  items-end md:items-center justify-center ">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`bg-white w-full md:rounded-xl md:mx-4 md:my-8 ${sizeClasses[size]} shadow-lg max-h-full overflow-y-auto`}
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                {title && <h2 className="text-lg font-semibold">{title}</h2>}
                {showCloseButton && (
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-black"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
              <div className="p-4">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
