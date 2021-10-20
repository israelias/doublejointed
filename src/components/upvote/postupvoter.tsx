import { graphql } from "gatsby"
import { Button } from "./styles"

const UPDATE_POST = gql`
  mutation votePost($id: String!) {
    votePost(id: $id) {
      id
      votes
      __typename
    }
  }
`

export default function PostUpvoter({ id, votes }) {
  const [updatePost, { error, data }] = useMutation(UPDATE_POST, {
    variables: { id, votes: votes + 1 },
    optimisticResponse: {
      __typename: "Mutation",
      votePost: {
        __typename: "Post",
        id,
        votes: votes + 1,
      },
    },
  })
  return (
    <button onClick={() => updatePost()}>
      {votes}
      <style jsx>{`
      .button {
      backgroundColor: "transparent",
  border: "1px solid #e4e4e4",
  color: "#000",
  ":active": {
    backgroundColor: "transparent"
  }
  :before {
    alignSelf: "center",
    borderColor: "transparent transparent #000000 transparent",
    borderStyle: "solid",
    borderWidth: "0 4px 6px 4px",
    content: '""',
    height: 0,
    marginRight: "5px",
    width: 0
  }}`}</style>
    </button>
  )
}
