import { Mail, Phone, MapPin, Linkedin, Globe, User } from "lucide-react";

const ModernSplitTemplate = ({ data, accentColor = "#2d3e50" }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="flex max-w-5xl mx-auto bg-white min-h-screen shadow-2xl">
            {/* Sidebar (Left Column) */}
            <aside className="w-1/3 text-white p-8" style={{ backgroundColor: accentColor }}>
                {/* Profile Image Placeholder */}
                <div className="flex justify-center mb-8">
                    <div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                        {data.personal_info?.image ? (
                            <img src={data.personal_info.image} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-full h-full p-8 text-gray-400" />
                        )}
                    </div>
                </div>

                {/* About Me */}
                <section className="mb-10">
                    <h2 className="text-center font-bold text-lg mb-4 py-1 bg-white text-gray-800 rounded-full">About Me</h2>
                    <p className="text-sm leading-relaxed opacity-90">{data.professional_summary}</p>
                </section>

                {/* Contact */}
                <section className="mb-10">
                    <h2 className="text-center font-bold text-lg mb-4 py-1 bg-white text-gray-800 rounded-full">Contact</h2>
                    <ul className="space-y-4 text-sm">
                        {data.personal_info?.phone && (
                            <li className="flex items-center gap-3"><Phone size={16} /> {data.personal_info.phone}</li>
                        )}
                        {data.personal_info?.website && (
                            <li className="flex items-center gap-3"><Globe size={16} /> {data.personal_info.website}</li>
                        )}
                        {data.personal_info?.email && (
                            <li className="flex items-center gap-3"><Mail size={16} /> {data.personal_info.email}</li>
                        )}
                        {data.personal_info?.location && (
                            <li className="flex items-center gap-3"><MapPin size={16} /> {data.personal_info.location}</li>
                        )}
                    </ul>
                </section>

                {/* Skills with Progress Bars */}
                <section className="mb-10">
                    <h2 className="text-center font-bold text-lg mb-4 py-1 bg-white text-gray-800 rounded-full">Skills</h2>
                    <div className="space-y-3">
                        {data.skills?.map((skill, i) => (
                            <div key={i}>
                                <div className="text-xs mb-1 uppercase tracking-wider">{skill}</div>
                                <div className="h-1.5 w-full bg-gray-600 rounded-full">
                                    <div className="h-full bg-white rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </aside>

            {/* Main Content (Right Column) */}
            <main className="w-2/3 p-12 bg-gray-50">
                <header className="mb-12">
                    <h1 className="text-5xl font-extrabold uppercase tracking-tighter text-gray-800">
                        {data.personal_info?.full_name?.split(' ')[0]} <br />
                        <span className="font-light">{data.personal_info?.full_name?.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <p className="text-xl tracking-widest text-gray-500 mt-2 uppercase">Graphic Designer</p>
                </header>

                {/* Experience */}
                <section className="mb-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-1 bg-yellow-500 flex-grow max-w-[20px]"></div>
                        <h2 className="bg-slate-800 text-white px-6 py-1 rounded-full text-sm font-bold uppercase tracking-widest">Work Experience</h2>
                    </div>

                    <div className="space-y-8">
                        {data.experience?.map((exp, i) => (
                            <div key={i} className="relative pl-6 border-l-2 border-gray-300">
                                <div className="absolute w-3 h-3 bg-yellow-500 rounded-full -left-[7px] top-1.5"></div>
                                <h3 className="font-bold text-gray-800">{exp.position}</h3>
                                <p className="text-sm text-gray-500 font-medium">{exp.company} / {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</p>
                                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-1 bg-yellow-500 flex-grow max-w-[20px]"></div>
                        <h2 className="bg-slate-800 text-white px-6 py-1 rounded-full text-sm font-bold uppercase tracking-widest">Education</h2>
                    </div>
                    <div className="space-y-6">
                        {data.education?.map((edu, i) => (
                            <div key={i} className="relative pl-6 border-l-2 border-gray-300">
                                <div className="absolute w-3 h-3 bg-yellow-500 rounded-full -left-[7px] top-1.5"></div>
                                <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                                <p className="text-sm text-gray-500">{edu.institution}</p>
                                <p className="text-sm text-gray-400">{formatDate(edu.graduation_date)}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ModernSplitTemplate;