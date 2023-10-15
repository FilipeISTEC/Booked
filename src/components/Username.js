import '../assets/styles/FormUsernameAndRating.css'



const Username = ({username}) => {
    return (  
        <div className="username-design">
            <div className="username-outside">
                <div className="username-inside">
                    <label>Username</label>
                    <input
                    value={username}
                    disabled
                    type="text"
                    required
                    placeholder="Your username"
                    />
                </div>
            </div>
        </div>
    );
}
const FormUsername =({username}) => {
    return (
        <div className="username">
            <Username username={userName}/>
        </div>
    )
}
 
export default Username;
    