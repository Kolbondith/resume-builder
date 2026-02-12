import React from 'react'
import ModernTemplate from './templates/ModernTemplate'
import ClassicTemplate from './templates/ClassicTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import AccountingTemplate from './templates/AccountingTemplate'
import { PaintbrushIcon } from 'lucide-react'
import ModernSplitTemplate from './templates/ModernSplitTemplate'

const ResumePreview = ({ data, template, accentColor, classes = "", setShowTemplateDrawer }) => {

    const renderTemplate = () => {
        switch (template) {
            case "modern":
                return <ModernTemplate data={data} accentColor={accentColor} />

            case "accounting":
                return <AccountingTemplate data={data} accentColor={accentColor} />

            case "minimal-image":
                return <MinimalImageTemplate data={data} accentColor={accentColor} />


            case "minimal":
                return <MinimalTemplate data={data} accentColor={accentColor} />

            case "modern-split":
                return <ModernSplitTemplate data={data} accentColor={accentColor} />


            default:
                return <ClassicTemplate data={data} accentColor={accentColor} />
        }
    }

    return (
        <div className='w-full '>
            <div className='relative w-full'>
                <button
                    onClick={() => setShowTemplateDrawer(true)}
                    className="absolute top-3 right-3 bg-white shadow p-2 rounded-md text-xs font-medium flex justify-center gap-2"
                >
                    <PaintbrushIcon className='size-4' />
                    Change Template
                </button>
            </div>

            <div id="resume-preview" className={`border border-gray-200 bg-white min-h-screen print:shadow-none print:border-none ${classes}`}>
                {renderTemplate()}
            </div>

            <style jsx>{`
                @page {
                    size: letter;
                    margin: 0;
                }

                @media print {
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    html, body {
                    width: 8.5in;
                    height: 11in;
                    overflow: visible;
                    }

                    

                    /* hide everything */
                    body * {
                    visibility: hidden;
                    }

                    /* show resume */
                    #resume-preview, #resume-preview * {
                    visibility: visible;
                    }

                    #resume-preview {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: auto;
                    margin: 0;
                    padding: 0;
                    box-shadow: none !important;
                    border: none !important;
                    }
                }
                `}</style>

        </div>
    )
}

export default ResumePreview