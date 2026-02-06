import ResizableTh from '../ResizableTh';

const LoginHistoryTable = () => {
    return (
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-[0_20px_40px_rgba(147,129,255,0.15)] transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
            <h2 className="text-xl font-semibold text-primary mb-6">📊 Login Activity</h2>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse mt-2">
                    <thead>
                        <tr>
                            <ResizableTh className="p-3 bg-secondary text-gray-800 rounded-l-lg text-sm font-semibold uppercase">Device</ResizableTh>
                            <ResizableTh className="p-3 bg-secondary text-gray-800 text-sm font-semibold uppercase">Browser</ResizableTh>
                            <ResizableTh className="p-3 bg-secondary text-gray-800 text-sm font-semibold uppercase">IP</ResizableTh>
                            <ResizableTh className="p-3 bg-secondary text-gray-800 rounded-r-lg text-sm font-semibold uppercase">Date</ResizableTh>
                        </tr>
                    </thead>
                    <tbody className="space-y-2">
                        {/* Add spacing between rows using transparent borders or separate divs if needed, 
                            but standard table padding works here */}
                        <tr className="hover:bg-accent-cream transition-colors group">
                            <td className="p-3 bg-bg-light rounded-l-lg mt-2 group-hover:bg-accent-cream">Windows</td>
                            <td className="p-3 bg-bg-light group-hover:bg-accent-cream">Chrome</td>
                            <td className="p-3 bg-bg-light group-hover:bg-accent-cream">192.168.1.2</td>
                            <td className="p-3 bg-bg-light rounded-r-lg group-hover:bg-accent-cream">30 Jan 2026</td>
                        </tr>
                        <tr className="block h-2"></tr> {/* Spacer */}
                        <tr className="hover:bg-accent-cream transition-colors group">
                            <td className="p-3 bg-bg-light rounded-l-lg group-hover:bg-accent-cream">Android</td>
                            <td className="p-3 bg-bg-light group-hover:bg-accent-cream">Edge</td>
                            <td className="p-3 bg-bg-light group-hover:bg-accent-cream">192.168.1.8</td>
                            <td className="p-3 bg-bg-light rounded-r-lg group-hover:bg-accent-cream">29 Jan 2026</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LoginHistoryTable;
