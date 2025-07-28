import type { AuthorEditFormStateType, AuthorFormActionType } from "../../types/author";

const authorReducer = (
    state: AuthorEditFormStateType, action: AuthorFormActionType): AuthorEditFormStateType => {
    switch (action.type) {
        case "RESET":
            return action.payload;
        case "UPDATE_NAME":
            return { ...state, name: action.payload };
         case "UPDATE_EMAIL":
            return { ...state, name: action.payload };
        case "UPDATE_PROFILE":
            return { ...state, profile: action.payload };
        case "UPDATE_DETAILS_USERNAME":
            return { ...state, details: { ...state.details, username: action.payload } };
        case "UPDATE_DETAILS_EMAIL":
            return { ...state, email: action.payload  };
        case "UPDATE_DETAILS_BIO":
            return { ...state, details: { ...state.details, bio: action.payload } };
        case "UPDATE_DETAILS_LOCATION":
            return { ...state, details: { ...state.details, location: action.payload } };
        case "UPDATE_DETAILS_EDUCATION":
            return { ...state, details: { ...state.details, education: action.payload } };
        case "UPDATE_DETAILS_PROFESSION":
            return { ...state, details: { ...state.details, profession: action.payload } };
        case "UPDATE_DETAILS_WEBSITE":
            return { ...state, details: { ...state.details, website: action.payload } };
        case "UPDATE_DETAILS_SOCIAL":
            return {
                ...state,
                details: {
                    ...state.details,
                    social: { ...state.details.social, ...action.payload },
                },
            };
        case "UPDATE_DETAILS_EXPERIENCE":
            const { index, field, value } = action.payload;
            const updatedExperience = [...(state.details.experience || [])];
            if (!updatedExperience[index]) {
                updatedExperience[index] = { company: '', role: '', duration: '' };
            }
            updatedExperience[index][field] = value;
            return {
                ...state,
                details: {
                    ...state.details,
                    experience: updatedExperience,
                },
            };
        case "SET_DETAILS_EXPERIENCE":
            return {
                ...state,
                details: {
                    ...state.details,
                    experience: action.payload,
                }
            }
        case "SET_DETAILS_LANGUAGES":
            return {
                ...state,
                details: {
                    ...state.details,
                    languages: action.payload,
                }
            }
        case 'SET_DETAILS_SKILLS':
            return {
                ...state,
                details: {
                    ...state.details,
                    skills: action.payload,
                }
            }
            case "SET_PROFILE":
            return {
                ...state,
                profile: action.payload,
            }
            case 'SET_DETAILS_HOBBIES':
                return{
                    ...state,
                    details:{
                        ...state.details,
                        hobbies:action.payload
                    }
                }
        default:
            return state;
    }
};
export default authorReducer;