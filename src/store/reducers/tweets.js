import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets'

export default function tweets(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      }
    case TOGGLE_TWEET:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes:
            action.hasLiked === true
              ? //removes username if they've already liked the tweet
                state[action.id].likes.filter(uid => uid !== action.authedUser)
              : //adds the username if they have not already liked the tweet
                state[action.id].likes.concat([action.authedUser])
        }
      }
    case ADD_TWEET:
      const { tweet } = action
      let replyingTo = {}

      if (tweet.replyingTo !== null) {
        replyingTo = {
          [tweet.replyingTo]: {
            ...state[tweet.replyingTo],
            replies: state[tweet.replyingTo].replies.concat([tweet.id])
          }
        }
      }
      return {
        ...state,
        //adds new tweet to tweets array
        [action.tweet.id]: action.tweet,
        //if new tweet is a reply to a previous tweet, spreads previous replies and adds new tweet to those replies
        ...replyingTo
      }
    default:
      return state
  }
}
