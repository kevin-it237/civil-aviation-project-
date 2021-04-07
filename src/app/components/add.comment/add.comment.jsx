import React, {useState, useEffect} from 'react'
import {Button, Input, Divider, message} from 'antd'
import {useHistory} from 'react-router-dom'
import {submitComment, authLogout} from '../../../applications/auth/redux/reducer/actions'
import {connect, useDispatch} from 'react-redux'
import './add.comment.scss'
import img from '../../../assets/images/logo.PNG'
const {TextArea} = Input

/**
 * @description empty data
 */

const AddComment = ({commentSubmited, user}) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [comment, setComment] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const closeApplication = () => {
        dispatchEvent(authLogout())
    }

    useEffect(() => {
        if(commentSubmited) {
            setSubmitting(false)
            setComment('')
        }
    }, [commentSubmited])

    const submit = () => {
        if(comment.length) {
            const newcomment = {
                user: user ? user.short_name : 'Anonymous',
                comment,
                date: new Date().toISOString()
            }
            setSubmitting(true)
            dispatch(submitComment(newcomment))
        }
    }
    
    return (
        <div className="comment-page">
            <div className="comments-wrapper">
                <img src={img} alt=""/>
                <p>Please provide your observation regarding the beta version 1.0</p>
                <TextArea 
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder='Enter  comments or observations'></TextArea>
                <Button disabled={submitting} onClick={submit} type="primary" color='primary'>Submit your comment</Button>

                {
                    commentSubmited&&<p className="success">Comment submitted successfully.</p>
                }

                <Divider>Or</Divider>
                <div className="buttons">
                    <Button onClick={closeApplication} danger>EXIT</Button>
                    <Button onClick={() => history.push('/saatm-dashboard')}>Return to the Dashboard</Button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ AuthReducer, AdminReducer }) => ({
    error: AuthReducer.error,
    user: AuthReducer.user,
    commentSubmited: AuthReducer.commentSubmited,
})
export default connect(mapStateToProps)(AddComment);

