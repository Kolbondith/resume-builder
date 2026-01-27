import React from 'react'
import { motion } from 'framer-motion'
import { LoaderCircleIcon, UploadCloud, XIcon } from 'lucide-react'

const UploadResumeModal = ({ uploadResume, title, setShowUploadResume, setTitle, resume, setResume, isLoading }) => {
    const modalVariants = {
        hidden: { opacity: 0, y: "-50px" },
        visible: { opacity: 1, y: "0", transition: { duration: 0.3 } },
        exit: { opacity: 0, y: "50px", transition: { duration: 0.3 } }
    };
    return (
        <form
            onSubmit={uploadResume}
            value={title}
            onClick={() => setShowUploadResume(false)}
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
                <h2 className='text-xl font-bold mb-4'>Upload a Resume</h2>
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type='text'
                    placeholder='Enter Resume Title'
                    className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600'
                    required
                />
                <div>
                    <label htmlFor='resume-input' className='block text-sm text-slate-700'>
                        Select Resume File
                        <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors'>
                            {resume ? (
                                <p className='text-green-700'>{resume.name}</p>
                            ) : (
                                <>
                                    <UploadCloud className='size-14 stroke-1' />
                                    <p>Upload Resume</p>
                                </>
                            )}
                        </div>
                    </label>
                    <input
                        type='file'
                        id='resume-input'
                        accept='.pdf'
                        hidden
                        onChange={(e) => setResume(e.target.files[0])}
                    />
                </div>
                <button disabled={isLoading} className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2'>
                    {isLoading && <LoaderCircleIcon className='animate-spin size-4 text-white' />}
                    {isLoading ? 'Uploading...' : 'Upload Resume'}

                </button>
                <XIcon
                    className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors'
                    onClick={() => { setShowUploadResume(false), setTitle('') }}
                />
            </motion.div>
        </form>
    )
}

export default UploadResumeModal