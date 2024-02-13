const HealthDateNavigation = (props) => {

    const { msgAlert, user } = props
    const showDateObj = new Date(props.showDate)
    console.log('showDateObj = ', showDateObj)

    const startOfWeek = () => {
        console.log('showDateObj = ', showDateObj)
        const diff = showDateObj.getDate() - showDateObj.getDay() + (showDateObj.getDay() === 0 ? 6 : 1)
        return new Date(showDateObj.setDate(diff))
    }

    return (
        <>
            <section className='date-nav-section'>
                <div className='date-nav-container'>
                    <div className='month-nav'>
                        February
                    </div>
                    <div className=''>
                        { startOfWeek().toString() }
                        { user ? user.userName : 'no' } user
                    </div>
                </div>
            </section>
        </>
    )
}

export default HealthDateNavigation