import { Layout, XIcon, CheckCircle } from 'lucide-react'
import React from 'react'
import { resumeDataTemplate } from '../../assets/assets'
import { motion } from 'framer-motion';

const SelectResumeModal = ({

    setOpenModal,
    setTitle,
    title,
    template,
    createResume
}) => {

    const cvTemplate = resumeDataTemplate.find((cv) => cv.value === template)
    const modalVariants = {
        hidden: { opacity: 0, y: "-50px" },
        visible: { opacity: 1, y: "0", transition: { duration: 0.3 } },
        exit: { opacity: 0, y: "50px", transition: { duration: 0.3 } }
    };

    return (
        <form
            onSubmit={createResume}
            onClick={() => setOpenModal(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"

        >
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm px-6 py-12"
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



                {/* Templates */}
                <div className=' w-full flex justify-center items-center'>


                    <div
                        key={cvTemplate.value}

                        className={`relative rounded-lg overflow-hidden border transition-all border-green-500 max-w-[35vh]`}
                    >
                        <img
                            src={cvTemplate.image_src}
                            alt={cvTemplate.name}
                            className="h-auto"
                            draggable={false}
                        />

                        <p className={`mt-2 text-green-500 text-center`}>{cvTemplate.name}</p>

                        {/* Tick icon */}

                        <div className="absolute top-2 right-2 bg-white rounded-full">
                            <CheckCircle className="text-green-600" size={22} />
                        </div>

                    </div>


                </div>

                <div className='flex justify-center'>
                    <button type='submit' className="w-full py-2 mt-6 bg-green-600 text-white rounded hover:bg-green-700 transition-colors max-w-sm">
                        Create Resume
                    </button>
                </div>



                <XIcon
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                    onClick={() => {
                        setOpenModal(false)
                        setTitle('')
                    }}
                />
            </motion.div>
        </form>
    )
}

export default SelectResumeModal
