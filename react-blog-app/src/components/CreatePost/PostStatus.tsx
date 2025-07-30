
import { useCreateContext } from '../../Provider/CreatePostProvider';
const PostStatus = () => {
    const {
        statusState,
        handleStatusChange

    } = useCreateContext()
    return (
        <div className="text-gray-800 dark:text-white my-6">
            <h2 className="text-lg font-semibold mb-2">Post Status</h2>
            {/* Status selection */}
            <div className="flex gap-4 items-center mb-4">
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="status"
                        value="published"
                        checked={statusState.isPublished}
                        onChange={() => {
                            handleStatusChange("SET_PUBLISH")
                        }}
                    />
                    Publish
                </label>

                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="status"
                        value="unpublished"
                        checked={!statusState.isPublished}
                        onChange={() => {
                            handleStatusChange("SET_UNPUBLISH")
                        }

                        }
                    />
                    Unpublish
                </label>

                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="status"
                        value="scheduled"
                        checked={statusState.isScheduled}
                        onChange={() => {
                            handleStatusChange("SET_SCHEDULED")
                        }}
                    />
                    Schedule
                </label>
            </div>

            {/* Scheduled DateTime */}
            {statusState.isScheduled && (
                <div className="mb-4">
                    <label className="block text-sm mb-1">Scheduled At:</label>
                    <input
                        type="datetime-local"
                        value={new Date(statusState.scheduledAt!).toISOString().slice(0, 16)}
                        onChange={(e) =>
                            handleStatusChange("SET_SCHEDULED_DATE", new Date(e.target.value))
                        }
                        className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded"
                    />
                </div>
            )}
        </div>
    )
}

export default PostStatus
