export enum CommentActionEnumType {
  like = 'like',
  dislike = 'dislike',
  violate  = 'violate',
}

export type CommentActionType = {
    comment: string,
    action: CommentActionEnumType,
}