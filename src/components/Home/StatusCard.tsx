const StatusCard: React.FC = () => {
    return (
        <div className="px-24">
            <div className="grid grid-cols-3 gap-10">
                <div className="bg-gray-950/20 rounded-md p-5">
                    จำนวน Agent
                    <p className="text-xl font-bold">25 <span className="text-lg font-normal">คน</span></p>
                </div>
                <div className="bg-gray-950/20 rounded-md p-5">2</div>
                <div className="bg-gray-950/20 rounded-md p-5">Admin</div>
            </div>
        </div>
    )
}
export default StatusCard;