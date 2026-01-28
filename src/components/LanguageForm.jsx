import { GraduationCap, Plus, Trash2 } from 'lucide-react'
import React from 'react'

const LanguageForm = ({ data, onChange }) => {

    const addLanguage = () => {
        const newLanguage = {
            name: "",
            level: "",
        }
        onChange([...data, newLanguage])
    }

    const removeLanguage = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateLanguage = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'> Languages</h3>
                    <p className='text-sm text-gray-500'>Add your Languages</p>
                </div>
                <button onClick={addLanguage} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors '>
                    <Plus className='size-4' />
                    Add Language
                </button>
            </div>

            {data.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                    <GraduationCap className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                    <p>No Language added yet.</p>
                    <p className='text-sm'>Click add language to get started.</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {data.map((language, index) => (
                        <div
                            key={index}
                            className='p-4 border border-gray-200 rounded-lg space-y-3'
                        >
                            <div className='flex justify-between items-start'>
                                <h4>Language #{index + 1}</h4>
                                <button
                                    onClick={() => removeLanguage(index)}
                                    className='text-red-500 hover:text-red-700 transition-colors'
                                >
                                    <Trash2 className='size-4' />
                                </button>
                            </div>
                            <div className='grid md:grid-cols-2 gap-3'>
                                <input
                                    value={language.name || ''}
                                    onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                                    type='text'
                                    placeholder='Language'
                                    className='px-3 py-2 text-sm border border-gray-300 rounded'
                                />

                                {/* Dropdown for "degree" (Level) */}
                                <select
                                    value={language.level || ''}
                                    onChange={(e) => updateLanguage(index, 'level', e.target.value)}
                                    className='px-3 py-2 text-sm border border-gray-300 rounded'
                                >
                                    <option value="">Select Level</option>
                                    <option value="Native">Native</option>
                                    <option value="Fluent">Fluent</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Basic">Basic</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LanguageForm
