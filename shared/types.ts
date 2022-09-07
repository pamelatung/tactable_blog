export type Author = {
    createdAt: string,
    name: string,
    avatar: string,
    updatedAt: string,
    id: string,
    postId: string,
}

export type Comment = {
    createdAt: string
    title: string,
    description: string,
    updatedAt: string,
    id: string,
    postId: string,
}

export type Post = {
    title: string,
    description: string,
    createdAt: string,
    updatedAt: string,    
    id: string,
    authors: Author[],
    comments: Comment[],
}