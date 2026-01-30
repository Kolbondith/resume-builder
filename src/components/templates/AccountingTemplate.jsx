import React from "react";
import { Mail, Phone, MapPin, Circle } from "lucide-react";

const AccountingTemplate = ({ data, accentColor = "#003d5b" }) => {
    // Helper to format dates for the right-hand column labels
    const formatDateRange = (start, end, isCurrent) => {
        if (!start) return "";

        const startDate = new Date(start).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
        });

        if (isCurrent) {
            return `${startDate} - Present`;
        }

        const endDate = new Date(end).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
        });

        return `${startDate} - ${endDate}`;
    };
    return (
        <div className="max-w-4xl mx-auto bg-white shadow-xl flex min-h-[1100px] font-sans text-slate-800">

            {/* LEFT COLUMN - Sidebar */}
            <div className="w-[35%] bg-[#e9ecef] flex flex-col">
                {/* Profile Image with specific white border padding */}
                <div className="p-8 pb-4">
                    <div className="w-full aspect-[4/5] bg-white p-2 shadow-sm">
                        {data.personal_info?.image && typeof data.personal_info.image === 'string' ? (
                            <img src={data.personal_info.image} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            data.personal_info?.image && typeof data.personal_info.image === 'object' ? (
                                <div className="mb-6">
                                    <img src={URL.createObjectURL(data.personal_info.image)} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                            ) : <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 italic text-xs">Photo Profile</div>
                        )}

                    </div>
                </div>

                {/* Sidebar Content */}
                <div className="px-8 py-4 space-y-10">
                    {/* Contact */}
                    <section>
                        <h2 className="font-bold text-lg mb-4 border-b border-gray-300" style={{ color: accentColor }}>Personal Information</h2>
                        <div className="space-y-4 text-[13px]">
                            {data.personal_info?.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone size={16} style={{ color: accentColor }} fill={accentColor} />
                                    <span>{data.personal_info.phone}</span>
                                </div>
                            )}
                            {data.personal_info?.email && (
                                <div className="flex items-center gap-3">
                                    <Mail size={16} style={{ color: accentColor }} fill={accentColor} />
                                    <span className="break-all">{data.personal_info.email}</span>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="flex items-center gap-3">
                                    <MapPin size={16} style={{ color: accentColor }} fill={accentColor} />
                                    <span>{data.personal_info.location}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Languages - Dynamic Pill indicators */}
                    {data.languages?.length > 0 && (
                        <section>
                            <h2 className="font-bold text-lg mb-4 border-b border-gray-300" style={{ color: accentColor }}>Languages</h2>
                            <div className="space-y-3 text-[13px]">
                                {data.languages.map((lang, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <span>{lang.name}</span>
                                        <div className="flex gap-1">
                                            {/* Simplified 3-pill logic based on level string */}
                                            <div className="w-6 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
                                            <div className="w-6 h-1.5 rounded-full" style={{ backgroundColor: lang.level?.includes('Native') || lang.level?.includes('F') ? accentColor : '#d1d5db' }}></div>
                                            <div className="w-6 h-1.5 rounded-full" style={{ backgroundColor: lang.level?.includes('Native') ? accentColor : '#d1d5db' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Competences (Skills) */}
                    {data.skills?.length > 0 && (
                        <section>
                            <h2 className="font-bold text-lg mb-4 border-b border-gray-300" style={{ color: accentColor }}>Skill</h2>
                            <ul className="text-[13px] space-y-1.5 font-medium" style={{ color: accentColor }}>
                                {data.skills.map((skill, i) => <li key={i}>{skill}</li>)}
                            </ul>
                        </section>
                    )}

                    {/* Interests (Centres d'intérêt) */}
                    {data.interests?.length > 0 && (
                        <section>
                            <h2 className="font-bold text-lg mb-4 border-b border-gray-300" style={{ color: accentColor }}>Centres d’intérêt</h2>
                            <ul className="text-[13px] space-y-1 font-medium" style={{ color: accentColor }}>
                                {data.interests.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </section>
                    )}
                </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="w-[65%] flex flex-col">
                {/* Navy Header Block */}
                <div className="mt-16 py-8 px-12 text-white" style={{ backgroundColor: accentColor }}>
                    <h1 className="text-4xl font-bold tracking-wider mb-1 uppercase">
                        {data.personal_info?.full_name || "Nom Prénom"}
                    </h1>
                    <p className="text-xl italic font-light opacity-90">
                        {data.personal_info?.profession || "Titre du Poste"}
                    </p>
                </div>

                <div className="px-12 py-10 space-y-12">
                    {/* Formation */}
                    {data.education?.length > 0 && (
                        <section>
                            <h2 className="font-extrabold text-xl mb-6 uppercase tracking-tight" style={{ color: accentColor }}>Education</h2>
                            <div className="space-y-6">
                                {data.education.map((edu, i) => (
                                    <div key={i} className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-[15px]" style={{ color: accentColor }}>{edu.degree} {edu.field && `en ${edu.field}`}</h3>
                                            <p className="text-gray-500 italic text-sm">{edu.institution} - {edu.location || "City"}</p>
                                        </div>
                                        <span className="text-xs text-gray-400 italic font-bold">
                                            {new Date(edu.graduation_date).getFullYear() || "Date"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Professional Experience */}
                    {data.experience?.length > 0 && (
                        <section>
                            <h2 className="font-extrabold text-xl mb-6 uppercase tracking-tight" style={{ color: accentColor }}>Professional Experiences</h2>
                            <div className="relative border-l-2 ml-1.5 pl-8 space-y-10" style={{ borderColor: accentColor }}>
                                {data.experience.map((exp, i) => (
                                    <div key={i} className="relative">
                                        {/* Timeline Node */}
                                        <div
                                            className="absolute -left-[39px] top-1.5 w-3 h-3 rounded-full border-2 border-white shadow-sm"
                                            style={{ backgroundColor: accentColor }}
                                        ></div>

                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-[16px] leading-tight" style={{ color: accentColor }}>{exp.position}</h3>
                                                <p className="text-gray-500 italic text-[13px]">{exp.company} - {exp.location || "City"}</p>
                                            </div>
                                            <span className="text-[10px] text-gray-400 italic font-bold text-right w-32 leading-tight uppercase">
                                                {formatDateRange(exp.start_date, exp.end_date, exp.is_current)}
                                            </span>
                                        </div>

                                        <div className="text-[13px] text-slate-700 leading-relaxed whitespace-pre-line">
                                            {exp.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountingTemplate;