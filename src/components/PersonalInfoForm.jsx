import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {
    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value })
    }

    const preview =
        data.image && typeof data.image === 'object'
            ? URL.createObjectURL(data.image)
            : data.image

    const fields = [
        { key: "full_name", label: "Full Name", icon: User, type: "text", requried: true },
        { key: "email", label: "Email Address", icon: Mail, type: "email", requried: true },
        { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
        { key: "location", label: "Location", icon: MapPin, type: "text" },
        { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
        { key: "linkedin", label: "Linkedin Profile", icon: Linkedin, type: "url" },
        { key: "website", label: "Personal Website", icon: Globe, type: "url" }
    ]

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <p className="text-sm text-gray-600">Get started with personal information</p>

            <div className="flex items-center gap-4">
                <label htmlFor="user-image" className="cursor-pointer">
                    {data.image ? (
                        <img
                            src={preview}
                            alt="user"
                            className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80"
                        />
                    ) : (
                        <div className="inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700">
                            <User className="size-10 p-2.5 border rounded-full" />
                            Upload user image
                        </div>
                    )}
                </label>

                <input
                    id="user-image"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        handleChange('image', file)
                        e.target.value = ''
                    }}
                />

                {typeof data.image === 'object' && (
                    <div className="flex flex-col gap-1 text-sm">
                        <p>Remove Background</p>
                        <label className="relative inline-flex items-center cursor-pointer gap-2">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={removeBackground}
                                onChange={() => setRemoveBackground(prev => !prev)}
                            />
                            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-600 transition" />
                            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full peer-checked:translate-x-4 transition-transform" />
                        </label>
                    </div>
                )}
            </div>
            {/* Field Section */}
            <div>
                {fields.map((field) => {
                    const Icon = field.icon;
                    return (
                        <div key={field.key} className='space-y-1 mt-5'>
                            <label className='flex items-center gap-2 text-sm font-medium text-gray-600'>
                                <Icon className='sze-4' />
                                {field.label}
                                {field.requried && <span className='text-red-500'>*</span>}
                            </label>
                            <input
                                type={field.type}
                                value={data[field.key] || ""}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                placeholder={`Enter Your ${field.label.toLowerCase()}`}
                                required={field.requried}
                                className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm'
                            />
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default PersonalInfoForm