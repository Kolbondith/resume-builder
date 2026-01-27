import { XIcon } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'

const EditResumeModal = ({ editTitle, setEditResumeId, setTitle, title }) => {
    const modalVariants = {
        hidden: { opacity: 0, y: "-50px" },
        visible: { opacity: 1, y: "0", transition: { duration: 0.3 } },
        exit: { opacity: 0, y: "50px", transition: { duration: 0.3 } }
    };
    return (
        <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId('')}
            action={""}
            className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'
        >
            <motion.div
                onClick={e => e.stopPropagation()}
                className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6 '
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
            >
                <h2 className='text-xl font-bold mb-4'>Edit Resume Title</h2>
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type='text'
                    placeholder='Enter Resume Title'
                    className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600'
                    required
                />
                <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>
                    Update
                </button>
                <XIcon
                    className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors'
                    onClick={() => { setEditResumeId(''), setTitle('') }}
                />
            </motion.div>
        </form>
    )
}

export default EditResumeModal