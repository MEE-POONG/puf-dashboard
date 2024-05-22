const StatusCard: React.FC = () => {
    return (
        <div className="px-2 lg:px-24">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white drop-shadow-md border rounded-md p-5 mb-4">
                    จำนวน Agent
                    <p className="text-xl font-bold">25 <span className="text-lg font-normal">คน</span></p>
                </div>
                <div className="bg-white drop-shadow-md border rounded-md p-5 mb-4">2</div>
                <div className="bg-white drop-shadow-md border rounded-md p-5 mb-4">Admin</div>
                <div className="bg-white drop-shadow-md border rounded-md p-5 mb-4">Admin</div>
            </div>
        </div>
    )
}
export default StatusCard;