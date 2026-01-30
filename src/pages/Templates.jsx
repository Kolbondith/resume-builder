import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resumeDataTemplate } from '../assets/assets';
import SelectResumeModal from '../components/app/SelectResumeModal';
import toast from 'react-hot-toast';
import api from '../config/api';
import { useSelector } from 'react-redux';
import i18next from 'i18next';

const Templates = () => {
    const { token } = useSelector(state => state.auth)
    const language = i18next.language
    const navigate = useNavigate()
    const [selectedTemplate, setSelectedTemplate] = useState('');

    const [title, setTitle] = useState('');

    const [openModal, setOpenModal] = useState(false)

    const templateClicked = (template) => {

        if (!token) {
            navigate(`/${language}/app?state=signin`)
        } else {
            setSelectedTemplate(template)
            setOpenModal(true);
        }

    }

    const createResume = async (event) => {
        try {
            event.preventDefault();
            const { data } = await api.post('/api/resumes/create', { title, template: selectedTemplate }, { headers: { Authorization: token } });

            setTitle('')
            setOpenModal(false)
            navigate(`/${language}/app/builder/${data.resume._id}`)
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className="flex flex-col min-h-screen items-center px-6 py-12">

            <div className='max-w-6xl'>
                {/* Title and Description */}
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
                    Find the Perfect CV Template
                </h1>
                <p className="text-lg text-center text-gray-700 mb-8">
                    Choose from a wide range of professionally designed CV templates that best match your target job.
                    Whether you're applying for a creative, business, or technical role, we have a template to help you stand out.
                </p>

                <div className="flex justify-center items-center space-x-4">
                    <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                        Browse Templates
                    </button>
                </div>

                {/* Template Grid */}
                <div className="mt-12 grid grid-cols-2 gap-6  md:grid-cols-3">
                    {resumeDataTemplate.map((cvTemplate) => {

                        return (
                            <button
                                key={cvTemplate.value}
                                type="button"
                                onClick={() => templateClicked(cvTemplate.value)}
                                className='relative group'

                            >
                                <div className={`relative rounded-lg overflow-hidden border border-slate-300 transition-all shadow-md shadow-slate-200`}>
                                    <img
                                        src={cvTemplate.image_src}
                                        alt={cvTemplate.name}
                                        className="w-full h-auto"
                                        draggable={false}
                                    />

                                    {/* Button that appears on hover */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-green-600 text-white py-2 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="w-full">
                                            Use Template
                                        </div>
                                    </div>

                                </div>


                                <p className={`mt-2 text-slate-600`}>{cvTemplate.name}</p>


                            </button>
                        )
                    })}
                </div>
            </div>

            {openModal && <SelectResumeModal setOpenModal={setOpenModal} title={title} setTitle={setTitle} template={selectedTemplate} createResume={createResume} />}
        </div>
    );
};

export default Templates;
