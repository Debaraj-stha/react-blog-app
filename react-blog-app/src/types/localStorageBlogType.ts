import type { Descendant } from "slate"
import type { EditorType } from "./CreatePostType"

export type LocalStorageBlogType={
    content?:Descendant[],
    title?:string,
    tags?:string[],
    category?:string|null
    editors?:EditorType[]
}