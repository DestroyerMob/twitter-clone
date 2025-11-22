import Breakline from "./breakline";

export default function SignupForm() {
    return (
        <div className="panel-container">
            <div className="panel">
                <h1><b>SIGNUP</b></h1>
                <Breakline></Breakline>
                <form>
                    <label>
                        First Name:
                        <input type="text"></input>
                    </label>
                    <label>
                        Last Name:
                        <input type="text"></input>
                    </label>
                    <label>
                        Email:
                        <input type="email"></input>
                    </label>
                    <label>
                        Password:
                        <input type="password"></input>
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
}