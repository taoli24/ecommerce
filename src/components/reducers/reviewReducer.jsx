// state is the current state

function reviewReducer(state, action) {
    switch(action.type){
        case "setReview": {
            return {
                ...state,
                review: action.data
            }
        }
        case "addReview": {
            return {
                ...state,
                review: "",
                reviews: [...state.reviews, {
                    id: state.reviews.length + 1,
                    description: action.data
                }]
            }
        }
        case "deleteReview": {
            return {
                ...state,
                reviews: state.reviews.filter(review => review.id !== action.data)
            }
        }
        case "editReview": {
            return {
                ...state,
                isEditing: true, 
                editedReview: state.reviews.find(review => review.id === action.data).description,
                editReviewId: action.data
            }
        }
        case "setEditReview": {
            return {
                ...state,
                editedReview: action.data
            }
        }
        case "finishEditing": {
            const newReviews = [...state.reviews].map(review => {
                if (review.id === state.editReviewId){
                    review.description = state.editedReview
                }
                return review
            })
            return {
                ...state,
                isEditing: false,
                reviews: newReviews
            }
        }
        default:
            return state

    }

}


export default reviewReducer