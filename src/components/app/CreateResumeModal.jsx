import { Layout, XIcon, CheckCircle } from 'lucide-react'
import React from 'react'
import { resumeDataTemplate } from '../../assets/assets'
import { motion } from 'framer-motion';

const CreateResumeModal = ({
    createResume,
    setShowCreateResume,
    setTitle,
    title,
    template,
    setTemplate
}) => {
    const modalVariants = {
        hidden: { opacity: 0, y: "-50px" },
        visible: { opacity: 1, y: "0", transition: { duration: 0.3 } },
        exit: { opacity: 0, y: "50px", transition: { duration: 0.3 } }
    };
    return (
        <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"

        >
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-5xl px-6 py-12"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
            >
                <h2 className="text-xl font-bold mb-4">Create a Resume</h2>

                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    placeholder="Enter Resume Title"
                    className="w-full px-4 py-2 mb-4 focus:border-green-500 ring-green-600 max-w-sm"
                    required
                    autoFocus
                />

                <div className="flex gap-2 items-center mb-3">
                    <Layout size={14} />
                    <span className="max-sm:hidden">Choose Your Template</span>
                </div>

                {/* Templates */}
                <div className="grid grid-cols-4 gap-4">
                    {resumeDataTemplate.map((cvTemplate) => {
                        const isSelected = template === cvTemplate.value

                        return (
                            <button
                                key={cvTemplate.value}
                                type="button"
                                onClick={() => setTemplate(cvTemplate.value)}
                                className={`relative rounded-lg overflow-hidden border transition-all
                  ${isSelected ? 'border-green-500 ring-2 ring-green-400' : 'border-gray-200 hover:border-green-300'}
                `}
                            >
                                <img
                                    src={cvTemplate.image_src}
                                    alt={cvTemplate.name}
                                    className="w-full h-auto"
                                    draggable={false}
                                />

                                <p className={`mt-2 ${isSelected ? 'text-green-500' : 'text-slate-600'}`}>{cvTemplate.name}</p>

                                {/* Tick icon */}
                                {isSelected && (
                                    <div className="absolute top-2 right-2 bg-white rounded-full">
                                        <CheckCircle className="text-green-600" size={22} />
                                    </div>
                                )}
                            </button>
                        )
                    })}
                </div>

                <div className='flex justify-center'>
                    <button className="w-full py-2 mt-6 bg-green-600 text-white rounded hover:bg-green-700 transition-colors max-w-sm">
                        Create Resume
                    </button>
                </div>



                <XIcon
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                    onClick={() => {
                        setShowCreateResume(false)
                        setTitle('')
                    }}
                />
            </motion.div>
        </form>
    )
}

export default CreateResumeModal
