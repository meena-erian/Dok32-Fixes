import { fetchList } from "./fetchList.js";

namespace API{
    export enum User {
        details = "/api/user/details",
        posts = "/api/user/posts",
        comments = "/api/user/comments",
    }
    export enum Post {
        details = "/api/post/details",
        comments = "/api/post/comments",
    }
}

