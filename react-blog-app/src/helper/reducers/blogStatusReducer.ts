import type { BlogStatusAction, BlogStatusType } from "../../types/CreatePostType";


const blogStatusReducer = (
    state: BlogStatusType,
    action: BlogStatusAction
): BlogStatusType => {
    switch (action.type) {
        case "SET_PUBLISH":
        case "SET_SCHEDULED":
        case "SET_UNPUBLISH":
        case 'SET_SCHEDULED_DATE':
        case "RESET":
            return { ...action.payload };

        default:
            return state;
    }
};


export default blogStatusReducer;
