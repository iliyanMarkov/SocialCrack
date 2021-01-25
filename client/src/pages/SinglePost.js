import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Grid, Image, Dimmer, Loader, Card, Button, Icon, Label } from 'semantic-ui-react'
import moment from 'moment'

import { AuthContext } from '../context/auth'
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'
import { FETCH_POST_QUERY } from '../util/graphql'

function  SinglePost(props){
    const postId = props.match.params.postId
    const { user } = useContext(AuthContext)
    const { loading, error, data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    function deletePostCallback() {
        props.history.push('/')
    }

    let postMarkup

    if (error instanceof Error) {
        postMarkup = (
            <h1>error: {error.message}</h1>
        )
    } else if (loading) {
        postMarkup = (
            <Dimmer active inverted>
                <Loader size='medium'>Loading</Loader>
            </Dimmer>
        )
    } else {
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount } =  data.getPost

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                    <Image
                        src='https://react.semantic-ui.com/images/avatar/large/molly.png' 
                        size='small'
                        float='right'
                    />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card.Content>
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                            <Card.Description>{body}</Card.Description>
                        </Card.Content>
                        <hr/>
                        <Card.Content extra>
                            <LikeButton user={user} post={{ id, likeCount, likes }}/>
                            <Button
                                as='div'
                                labelPosition='right'
                                onClick={() => console.log('Comment on post')}
                            >
                                <Button basic color='blue'>
                                    <Icon name='comments'/>
                                </Button>
                                <Label basic color='blue' pointing='left'>
                                    { commentCount }
                                </Label>
                            </Button>
                            {user && user.username === username && (
                                <DeleteButton postId={id} callback={deletePostCallback}/>
                            )}
                        </Card.Content>
                    </Grid.Column>    
                </Grid.Row>
            </Grid>
        )
    }
    return postMarkup
}

export default SinglePost

