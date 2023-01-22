import Title from "./styled/Title";
// import { useState } from "react";
import { useReducer } from "react";
import reviewReducer from "./reducers/reviewReducer";

const initialReviews = [
    {
        id: 1,
        description: "Hard to use, do not recommend",
    },
    {
        id: 2,
        description: "Eacy to use, highly recommend",
    },
];

function Review() {
    // const [reviews, setReviews] = useState(initialReviews);
    // const [review, setReview] = useState("");
    // const [isEditing, setIsEditing] = useState(false);
    // const [editedReview, setEditedReview] = useState("");
    // const [editReviewId, setEditReviewId] = useState(null)

    const initialState = {
        reviews: initialReviews,
        review: "",
        isEditing: false,
        editedReview: "",
        editReviewId: null
    }

    const [store, dispatch] = useReducer(reviewReducer, initialState)
    const { reviews, review, isEditing, editedReview } = store


    const handleReviewChange = (e) => {
        const value = e.target.value;

        dispatch({
            type: "setReview",
            data: value
        })
        // setReview(value);
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();

        dispatch({
            type: "addReview",
            data: review
        })
        // setReviews((prevState) => {
        //     return [
        //         ...prevState,
        //         {
        //             id: prevState.length + 1,
        //             description: review,
        //         },
        //     ];
        // });

        // setReview("");

        console.log(reviews);
    };

    const deleteReview = (id) => {

        dispatch({
            type:"deleteReview",
            data: id
        })
        // setReviews((prevReviews) => {
        //     return prevReviews.filter((review) => {
        //         return review.id !== id;
        //     });
        // });
    };

    const editReview = (id) => {
        dispatch({
            type: "editReview",
            data: id
        })

        // setIsEditing(true)
        // // setEditedReview(reviews.filter(review => review.id === id)[0].description)
        // setEditedReview(reviews.find(review => review.id === id).description)
        // setEditReviewId(id)
    };


    const editReviewTextHandler = (e) => {
        dispatch({
            type: "setEditReview",
            data: e.target.value
        })
        // setEditedReview(e.target.value)
    }

    const finishEditReview = (e) => {
        // const newReviews = [...reviews]
        e.preventDefault()
        dispatch({
            type: "finishEditing",
        })
        // setReviews(newReviews.map(review => {
        //     if (review.id === editReviewId) {
        //         review.description = editedReview
        //     }
        //     return review
        // }))

        // setIsEditing(false)
    }


    return (
        <div
            style={{
                padding: 20,
            }}
        >
            <Title>Review</Title>
            {reviews.map((review) => {
                return (
                    <div
                        key={review.id}
                        style={{
                            padding: "20px 0",
                        }}
                    >
                        <div>{review.description}</div>
                        <button onClick={() => editReview(review.id)}>
                            Edit
                        </button>
                        <button onClick={() => deleteReview(review.id)}>
                            Delete
                        </button>
                    </div>
                );
            })}
            {isEditing && (
                <form onSubmit={finishEditReview}>
                    <div>Edit Review</div>
                    <textarea value={editedReview} onChange={editReviewTextHandler}></textarea>
                    <div>
                        <button>Edit</button>
                    </div>
                </form>
            )}

            <form onSubmit={formSubmitHandler}>
                <div>Add Review</div>
                <textarea
                    value={review}
                    onChange={handleReviewChange}
                ></textarea>
                <div>
                    <button>Add</button>
                </div>
            </form>
        </div>
    );
}

export default Review;
