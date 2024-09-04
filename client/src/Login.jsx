import { useRef } from "react"
import { useNavigate } from "react-router-dom"

export default function Login({setCurrentUser}) {
  const  navigate = useNavigate()
 
    

    async function loginHandler(event) {
        event.preventDefault()

        const result = await fetch("http://134.122.15.236:7000/auth/login", {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: event.target.elements.username.value,
            password: event.target.elements.password.value,
          }),
        });
        let res = await result.json()
        console.log(res.ok,res.name,res.password)
        if (res.ok === true) {
            //setCurrentUser({userName:res.name,password:res.password})
            navigate('/Todos')
    
        } else {
            alert('invaled Login')
        }

        console.log(event.target.elements.username.value)
    }

    

    return (
<>
      <form className="login-form" onSubmit={loginHandler}>
        <h1>Log in</h1>
        <section className="login-form__username">
        {" "}
          <label htmlFor="username">Username</label>
          <input  id="username" name="username" type="text"  ></input>
        </section>
        <section className="login-form__password">
          <label htmlFor="password">Password</label>
          <input  id="password" name="password" type="password"></input>
        </section>
        <section className="login-form__actions">
          <button type="submit">Log In</button>
          <a onClick={()=>navigate('/SignUp')}>Sign Up</a>
        </section>
      </form>
    </>
  );
}