import { FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../config/api'
import toast from 'react-hot-toast';
import pdfToText from 'react-pdftotext'
import CreateResumeModal from '../components/app/CreateResumeModal'
import i18next from 'i18next'
import EditResumeModal from '../components/app/EditResumeModal'
import UploadResumeModal from '../components/app/UploadResumeModal'

const Dashboard = () => {

    const { token } = useSelector(state => state.auth);
    const language = i18next.language



    const colors = ['#9333ea', '#d97706', '#dc2626', '#0284c7', '#16a34a']

    const [allResumes, setAllResumes] = useState([])
    const [showCreateResume, setShowCreateResume] = useState(false)
    const [showUploadResume, setShowUploadResume] = useState(false)

    const [title, setTitle] = useState('');
    const [template, setTemplate] = useState('classic')
    const [resume, setResume] = useState(null)
    const [editResumeId, setEditResumeId] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const createResume = async (event) => {
        try {
            event.preventDefault();
            const { data } = await api.post('/api/resumes/create', { title, template }, { headers: { Authorization: token } });
            setAllResumes([...allResumes, data.resume]);
            setTitle('')
            setShowCreateResume(false)
            navigate(`/${language}/app/builder/${data.resume._id}`)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const loadAllResumes = async () => {
        try {
            const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } });
            setAllResumes(data.resumes)
        } catch (error) {
            toast.error(error?.message)
        }
    }


    const uploadResume = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            const resumeText = await pdfToText(resume)
            const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, { headers: { Authorization: token } });
            setTitle('')
            setResume(null)
            setShowUploadResume(false)
            navigate(`/app/builder/${data.resumeId}`)
        } catch (error) {
            toast.error(error?.message)
        }

        setIsLoading(false)
    }

    const editTitle = async (event) => {
        try {
            event.preventDefault()
            const { data } = await api.put(`/api/resumes/update`, { resumeId: editResumeId, resumeData: { title } }, { headers: { Authorization: token } })
            setAllResumes(allResumes.map(resume => resume._id === editResumeId ? { ...resume, title } : resume))
            setTitle('')
            setEditResumeId('')
            toast.success(data?.message)
        } catch (error) {
            toast.error(error?.message)
        }
    }

    const deleteResume = async (resumeId) => {

        try {
            const confirm = window.confirm('Are you sure you want to delete this resume?')

            if (confirm) {
                const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, { headers: { Authorization: token } });
                setAllResumes(prev => prev.filter(resume => resume._id !== resumeId))
                toast.success(data?.message)
            }
        } catch (error) {
            toast.error(error?.message)
        }


    }

    useEffect(() => {
        loadAllResumes()
    }, [])



    return (
        <div>
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>
                    Welcome, john Doe
                </p>
                <div className='flex gap-4'>
                    <button
                        onClick={() => setShowCreateResume(true)}
                        className='w-full bg-white sm:max-w-65 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'
                    >
                        <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full' />
                        <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>Create Resume</p>
                    </button>
                    <button
                        onClick={() => setShowUploadResume(true)}
                        className='w-full bg-white sm:max-w-65 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer'
                    >
                        <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full' />
                        <p className='text-sm group-hover:text-purple-600 transition-all duration-300'>Upload Existing</p>
                    </button>
                </div>

                <hr className='border-slate-300 my-6 sm:w-[305px]' />

                <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
                    {allResumes.map((resume, index) => {
                        const baseColor = colors[index % colors.length];
                        return (
                            <button
                                key={resume._id.toString()}
                                onClick={() => navigate(`/${language}/app/builder/${resume._id}`)}
                                className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer'
                                style={{
                                    background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                                    borderColor: baseColor + '40'
                                }}
                            >
                                <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all' />
                                <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{ color: baseColor }}>{resume.title}</p>
                                <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center' style={{ color: baseColor + '90' }}>
                                    Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                                </p>
                                <div onClick={(e) => { e.stopPropagation() }} className='absolute top-1 right-1 group-hover:flex items-center hidden'>
                                    <TrashIcon onClick={() => deleteResume(resume._id)} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors' />

                                    <PencilIcon onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors' />
                                </div>
                            </button>
                        )
                    })}
                </div>

                {showCreateResume && (
                    <CreateResumeModal createResume={createResume} setShowCreateResume={setShowCreateResume} setTitle={setTitle} title={title} template={template} setTemplate={setTemplate} />
                )}

                {showUploadResume && (
                    <UploadResumeModal setResume={setResume} resume={resume} title={title} setTitle={setTitle} uploadResume={uploadResume} isLoading={isLoading} setShowUploadResume={setShowUploadResume} />
                )}

                {editResumeId && (
                    <EditResumeModal editTitle={editTitle} setEditResumeId={setEditResumeId} title={title} setTitle={setTitle} />
                )}
            </div>
        </div>
    )
}

export default Dashboard