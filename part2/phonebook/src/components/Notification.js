const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className='addedNotification'>
            {message}
        </div>
    )
}
export default Notification