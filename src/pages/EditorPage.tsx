import SplitterComponent from "@/components/SplitterComponent"
import ConnectionStatusPage from "@/components/connection/ConnectionStatusPage"
import Sidebar from "@/components/sidebar/Sidebar"
import WorkSpace from "@/components/workspace"
import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import useFullScreen from "@/hooks/useFullScreen"
import useUserActivity from "@/hooks/useUserActivity"
import { SocketEvent } from "@/types/socket"
import { USER_STATUS, User } from "@/types/user"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import VideoCall from "@/components/VideoCall"

function EditorPage() {
    const [showVideo, setShowVideo] = useState(false)

    useUserActivity()
    useFullScreen()
    const navigate = useNavigate()
    const { roomId } = useParams()
    const { status, setCurrentUser, currentUser } = useAppContext()
    const { socket } = useSocket()
    const location = useLocation()

    useEffect(() => {
        if (currentUser.username.length > 0) return
        const username = location.state?.username
        if (username === undefined) {
            navigate("/", { state: { roomId } })
        } else if (roomId) {
            const user: User = { username, roomId }
            setCurrentUser(user)
            socket.emit(SocketEvent.JOIN_REQUEST, user)
        }
    }, [
        currentUser.username,
        location.state?.username,
        navigate,
        roomId,
        setCurrentUser,
        socket,
    ])

    if (status === USER_STATUS.CONNECTION_FAILED) {
        return <ConnectionStatusPage />
    }

    return (
        <>
            {/* Main resizable layout */}
            <SplitterComponent>
                <Sidebar />
                <WorkSpace />
            </SplitterComponent>

            {/* Floating video button */}
            <button
                className="fixed bottom-[220px] right-4 bg-blue-500 text-white text-sm px-3 py-1 rounded shadow-md z-50"
                onClick={() => setShowVideo(!showVideo)}
            >
                {showVideo ? 'Hide' : 'Show'} Video
            </button>

            {/* Floating video window */}
            {showVideo && (
                <div className="fixed bottom-4 right-4 w-[400px] h-[450px] bg-white shadow-xl rounded overflow-hidden z-40">
                    <VideoCall />
                </div>
            )}
        </>
    )
}


export default EditorPage
