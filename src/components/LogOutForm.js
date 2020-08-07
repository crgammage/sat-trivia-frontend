import React from 'react'

function LogOutForm(props) {

    return(
        <form onSubmit={(event) => props.handleLogOut()}>
            <button type="submit">Logout</button>
        </form>
    )
}

export default LogOutForm