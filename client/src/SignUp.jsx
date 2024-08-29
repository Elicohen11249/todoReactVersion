import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import SignupSchema from "./SignupSchema.js";
import { useCallback, useState } from "react";




export default function SignUp({ setCurrentUser }) {
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const [previewDataUrl, setPreviewDataUrl] = useState()
    
/*
    const onDrop = useCallback(acceptedFiles => {
        let file = acceptedFiles?.[0]
        setFile(file)

        let fileReader = new FileReader()
        if (file) {
            fileReader.readAsDataURL(file)
        }

        fileReader.onloadend = function () {
            //console.log(fileReader.result)
            setPreviewDataUrl(fileReader.result)
        }

    }, [])
*/

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: signUpHandler,
        validationSchema: SignupSchema
    })


/*
    async function uploadFile() {
        let formData = new FormData()
        formData.append('profile', file)

        const res = await fetch('http://localhost:7000/users/upload-profile', {
            method: 'POST',
            body: formData
        })
        let result = await res.json()
        console.log(result)
    }

*/
    async function signUpHandler(values) {  
       
        console.log(values)
        const result = await fetch('http://localhost:7000/users/create', {
            method: 'POST',
            mode: 'cors',
            //credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: values.username,
                password: values.password
            })
        })
        if(result){  
        formik.values.username = ''
        formik.values.password = ''
        navigate('/login')
        }
    }

    return (
        <>
            <form className="login-form" onSubmit={formik.handleSubmit}>
                <h1>Sign up</h1>
                <section className={"login-form__username " + (formik.touched.username ? (formik.errors.username ? 'invalid' : '') : '')}>
                    <div>
                        {" "}
                        <label htmlFor="username">Username</label>
                        <input
                            value={formik.values.username}
                            id="username"
                            name="username"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <p>{formik.touched.username ? formik.errors.username : " "}</p>
                    </div>
                </section>

                <section className={"login-form__password " + (formik.touched.password ? (formik.errors.password ? 'invalid' : '') : ' ')}>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            value={formik.values.password}
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <p>{formik.touched.password ? formik.errors.password : " "}</p>
                    </div>
                </section>
                <section className="login-form__actions">
                    <button type="submit" className={formik.errors ? '' : 'disabled'}>Sign Up</button>
                    <a onClick={() => navigate('/')}>Log In</a>
                </section>
            </form>
        </>
    );
}

/**
 * 
 * import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import SignupSchema from "./SignupSchema.js";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";




export default function SignUp({ setCurrentUser }) {
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const [previewDataUrl, setPreviewDataUrl] = useState()
    

    const onDrop = useCallback(acceptedFiles => {
        let file = acceptedFiles?.[0]
        setFile(file)

        let fileReader = new FileReader()
        if (file) {
            fileReader.readAsDataURL(file)
        }

        fileReader.onloadend = function () {
            //console.log(fileReader.result)
            setPreviewDataUrl(fileReader.result)
        }

    }, [])

    const { getRootProps, getInputProps, isDragActive,acceptedFiles,fileRejections} = useDropzone({
         onDrop,
         accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
           }
    })



    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: signUpHandler,
        validationSchema: SignupSchema
    })



    async function uploadFile() {
        let formData = new FormData()
        formData.append('profile', file)

        const res = await fetch('http://localhost:7000/users/upload-profile', {
            method: 'POST',
            body: formData
        })
        let result = await res.json()
        console.log(result)
    }


    async function signUpHandler(values) {  
       
        console.log(values)
        const result = await fetch('http://localhost:7000/users/create', {
            method: 'POST',
            mode: 'cors',
            //credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: values.username,
                password: values.password
            })
        })
        formik.values.username = ''
        formik.values.password = ''
        console.log(values.username,values.password)
    }

    return (
        <>
            <form className="login-form" onSubmit={formik.handleSubmit}>
                <h1>Sign up</h1>
                <section className={"login-form__username " + (formik.touched.username ? (formik.errors.username ? 'invalid' : '') : '')}>
                    <div>
                        {" "}
                        <label htmlFor="username">Username</label>
                        <input
                            value={formik.values.username}
                            id="username"
                            name="username"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <p>{formik.touched.username ? formik.errors.username : " "}</p>
                    </div>
                </section>

                <section className={"login-form__password " + (formik.touched.password ? (formik.errors.password ? 'invalid' : '') : ' ')}>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            value={formik.values.password}
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <p>{formik.touched.password ? formik.errors.password : " "}</p>
                    </div>
                </section>
                <section>
                    <label>Profile Picture</label>
                    <div className={"upload-section "+(isDragActive?"is-dragged":"")} {...getRootProps()}>
                        <input  {...getInputProps()} />
                       {file?
                       <img src={previewDataUrl} width='100px' height='100px'/>
                        : <p>{isDragActive? "Drop the file here" : "Drag or drop the file here or click to select"}</p>}
                    </div>
                    {file ? <button onClick={uploadFile} >upload</button> : ""}
                  
                </section>
                <section className="login-form__actions">
                    <button type="submit" className={formik.errors ? '' : 'disabled'}>Sign Up</button>
                    <a onClick={() => navigate('/')}>Log In</a>
                </section>
            </form>
        </>
    );
}



 * 
 */





/*
export default function SignUp({ setCurrentUser }) {
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const [url, setUrl] = useState(null)
    const [previewDataUrl, setPreviewDataUrl] = useState()

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: signUpHandler,
        validationSchema: SignupSchema
    })

    function fileLoaded({ target }) {
        let file = target.files[0]
        setFile(file)
        //console.log(file)
        let fileReader = new FileReader()
        if (file) {
            fileReader.readAsDataURL(file)
        }

        fileReader.onloadend = function () {
            //console.log(fileReader.result)
            setPreviewDataUrl(fileReader.result)
        }

    }

    async function uploadFile() {
        let formData = new FormData()
        formData.append('profile', file)

        const res = await fetch('http://localhost:7000/users/upload-profile', {
            method: 'POST',
            body: formData
        })
        let result = await res.json()
        console.log(result)
        setUrl(result.url)
    }


    async function signUpHandler(values, event) {
        event.preventDefault()
        if (formik.errors) return;
        const result = await fetch('http://localhost:7000/users/create', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: values.username,
                password: values.password
            })
        })
        formik.values.username = ''
        formik.values.password = ''
        //console.log('signing up', userName, password)
    }
    //console.log(formik.values.username)

    return (
        <>
            <form className="login-form" onSubmit={formik.handleSubmit}>
                <h1>Sign up</h1>
                <section className={"login-form__username " + (formik.touched.username ? (formik.errors.username ? 'invalid' : '') : '')}>
                    <div>
                        {" "}
                        <label htmlFor="username">Username</label>
                        <input
                            value={formik.values.username}
                            id="username"
                            name="username"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <p>{formik.touched.username ? formik.errors.username : " "}</p>
                    </div>
                </section>

                <section className={"login-form__password " + (formik.touched.password ? (formik.errors.password ? 'invalid' : '') : ' ')}>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            value={formik.values.password}
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <p>{formik.touched.password ? formik.errors.password : " "}</p>
                    </div>
                </section>
                <section><label>Profile Picture</label>
                    <input type="file" onChange={fileLoaded} accept="image/png" />
                    {file ? <button onClick={uploadFile} >upload</button> : ""}
                    {previewDataUrl ? <img src={previewDataUrl} width='100px' height='100px' /> : ""}
                    {url ? <img src={url} style={{ width: '100px', height: '100px' }} /> : ""}
                </section>
                <section className="login-form__actions">
                    <button type="submit" className={formik.errors ? '' : 'disabled'}>Sign Up</button>
                    <a onClick={() => navigate('/')}>Log In</a>
                </section>
            </form>
        </>
    );
}

*/


/**import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import {useFormik} from "formik"

export default function SignUp({ setCurrentUser }) {
    const navigate = useNavigate()

    const formik =  useFormik({
        initialValues:{ 
        username:'',
        password:'',
        },
        onSubmit:signUpHandler
    })



    let isUserNameValid = formik.values.username.length >= 5;
    let isPasswordValid = formik.values.password.length >= 8;

    let isFormValid = isUserNameValid && isPasswordValid;

    async function signUpHandler(values) {
        //event.preventDefault()
        if (!isFormValid) return;
        const result = await fetch('http://localhost:7000/users/create', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: values.username,
                password: values.password
            })
        })
           formik.values.username = ''
           formik.values.password = ''
        //console.log('signing up', userName, password)
    }
    //console.log(formik.values.username)

    return (
        <>
            <form className="login-form" onSubmit={formik.handleSubmit}>
                <section className={"login-form__username " + (isUserNameValid? '': 'invalid')}>
                    {" "}
                    <label htmlFor="username">Username</label>
                    <input value={formik.values.username} id="username" name="username" type="text" onChange={formik.handleChange}></input>
                </section>
                <section className={"login-form__password " + (isPasswordValid? '': 'invalid')}>
                    <label htmlFor="password">Password</label>
                    <input value={formik.values.password} id="password" name="password" type="password" onChange={formik.handleChange}></input>
                </section>
                <section className="login-form__actions">
                    <button type="submit" className={isFormValid ? '' : 'disabled'}>Sign Up</button>


                    <a onClick={() => navigate('/')}>Log In</a>
                </section>
            </form>
        </>
    );
} */