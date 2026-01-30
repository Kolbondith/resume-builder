import React from "react";
import { CheckCircle, X } from "lucide-react";
import { resumeDataTemplate } from "../../assets/assets";

const TemplateChooserDrawer = ({ open, onClose, onSelect, selectedTemplate }) => {
    return (
        <>
            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
                    onClick={onClose}
                ></div>
            )}

            {/* Drawer */}
            <div
                className={`
                fixed top-0 right-0 h-screen 
                w-full                      /* mobile: full width */
                sm:w-[85%]                  /* tablet: 85% width */
                md:w-[420px]                /* desktop: fixed width */
                bg-white shadow-xl z-50 
                flex flex-col 
                transform transition-transform duration-300 ease-in-out will-change-transform
                ${open ? "translate-x-0" : "translate-x-full"}
            `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b shrink-0">
                    <h2 className="text-lg font-bold text-gray-800">Choose Template</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
                    >
                        <X className="size-5 text-gray-500 hover:text-black" />
                    </button>
                </div>

                {/* Scrollable template grid */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4">
                        {resumeDataTemplate.map((t) => {
                            const isSelected = selectedTemplate === t.value;

                            return (
                                <div
                                    key={t.id}
                                    className={
                                        "relative border rounded-lg overflow-hidden cursor-pointer transition-all " +
                                        (isSelected
                                            ? "border-green-500 ring-2 ring-green-500 shadow-md"
                                            : "border-slate-200 hover:shadow-sm")
                                    }
                                    onClick={() => {
                                        onSelect(t.value);
                                        onClose();
                                    }}
                                >
                                    {/* Preview image */}
                                    <div className="aspect-[1/1.414] w-full overflow-hidden bg-white border-b border-slate-100">
                                        <img
                                            src={t.image_src}
                                            alt={t.name}
                                            className="w-full h-full object-top object-contain transition-transform duration-500 hover:scale-105"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Name label */}
                                    <div className="p-2 text-center text-xs sm:text-sm font-medium bg-white">
                                        {t.name}
                                    </div>

                                    {/* Checkmark */}
                                    {isSelected && (
                                        <div className="absolute top-2 right-2 bg-white rounded-full shadow-sm">
                                            <CheckCircle className="text-green-600" size={20} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TemplateChooserDrawer;
