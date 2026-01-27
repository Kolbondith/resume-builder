import React from 'react';
import { Link } from 'react-router-dom';
import { resumeDataTemplate } from '../assets/assets';

const Templates = () => {
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
                                // onClick={() => setTemplate(cvTemplate.value)}
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
                                        <button className="w-full">
                                            Use Template
                                        </button>
                                    </div>

                                </div>


                                <p className={`mt-2 text-slate-600`}>{cvTemplate.name}</p>


                            </button>
                        )
                    })}
                </div>
            </div>


        </div>
    );
};

export default Templates;
