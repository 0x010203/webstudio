export type CommentType = {
      id: string,
      text: string,
      date: string,
      likesCount: number,
      dislikesCount: number,
      user: {
        id: string,
        name: string
      }
}

export type MoreCommentType = {
      allCount: number,
      comments: CommentType[],
}