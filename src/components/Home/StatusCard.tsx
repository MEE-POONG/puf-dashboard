const StatusCard: React.FC = () => {
    return (
        <div className="px-24">
            <div className="grid grid-cols-3 gap-10">
                <div className="bg-gray-950/20 rounded-md p-3">จำนวน Agent</div>
                <div className="bg-gray-950/20 rounded-md p-3">2</div>
                <div className="bg-gray-950/20 rounded-md p-3">Admin</div>
            </div>
        </div>
    )
}
export default StatusCard;