import { useContext, useCallback, useState } from "react";
import AuthContext from "./auth";
import { useDropzone } from "react-dropzone";


export default function Task({ task, updateTask, deleteTask }) {
console.log("in teask conpon..", task)
    const [file, setFile] = useState(null)
    const [previewDataUrl, setPreviewDataUrl] = useState()
    //const [u,setU]=useState(null)
 
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


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        }
    })


    //const user = useContext(AuthContext)
    //const userName = user.userName;

    async function taskCompleted() {
        const id = task.id

        await fetch(`http://134.122.15.236:7000/tasks/${id}`, {
            method: 'PATCH',
            mode: 'cors',
            credentials: 'include'
        })

        updateTask(task.id)
    }


    async function taskDeleted() {
        let confirming = confirm("Are you sure you want to delete it?");

        if (confirming == true) {
            const id = task.id

            await fetch(`http://134.122.15.236:7000/tasks/${id}`, {
                method: 'DELETE',
                mode: 'cors',
                credentials: 'include'
            })
        } else return;

        deleteTask()
    }

    async function uploadFile() {
        let formData = new FormData()
        formData.append('taskImage', file)

        const res = await fetch(`http://134.122.15.236:7000/tasks/add-image/${task.id}`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: formData
        })
        let result = await res.json()
        if (result.success) {
            deleteTask()
        }
        console.log(result)
        
    }


    return (
        <div className="task">
            <p>{task.title} </p>
            <div>
                {task.done ? <></> :
                    <button onClick={() => taskCompleted()}>
                        <svg
                            width="19"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect x="0.0487061" width="30" height="30" rx="5" fill="none" />
                            <path
                                d="M23.7851 10.6739L12.7851 21.6739C12.7213 21.7378 12.6455 21.7885 12.562 21.8231C12.4785 21.8577 12.3891 21.8755 12.2987 21.8755C12.2084 21.8755 12.1189 21.8577 12.0355 21.8231C11.952 21.7885 11.8762 21.7378 11.8123 21.6739L6.99982 16.8614C6.87081 16.7324 6.79834 16.5574 6.79834 16.375C6.79834 16.1926 6.87081 16.0176 6.99982 15.8886C7.12882 15.7596 7.30378 15.6871 7.48622 15.6871C7.66866 15.6871 7.84363 15.7596 7.97263 15.8886L12.2987 20.2155L22.8123 9.70109C22.9413 9.57209 23.1163 9.49962 23.2987 9.49962C23.4812 9.49962 23.6561 9.57209 23.7851 9.70109C23.9141 9.8301 23.9866 10.0051 23.9866 10.1875C23.9866 10.3699 23.9141 10.5449 23.7851 10.6739Z"
                                fill="black"
                            />
                        </svg>
                    </button>}
                <button onClick={() => taskDeleted()}>
                    <svg
                        width="19"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect x="0.0487061" width="30" height="30" rx="5" fill="none" />
                        <path
                            d="M22.6112 8.125H7.48621C7.30387 8.125 7.129 8.19743 7.00007 8.32636C6.87114 8.4553 6.79871 8.63016 6.79871 8.8125C6.79871 8.99484 6.87114 9.1697 7.00007 9.29864C7.129 9.42757 7.30387 9.5 7.48621 9.5H8.17371V21.875C8.17371 22.2397 8.31857 22.5894 8.57643 22.8473C8.8343 23.1051 9.18403 23.25 9.54871 23.25H20.5487C20.9134 23.25 21.2631 23.1051 21.521 22.8473C21.7788 22.5894 21.9237 22.2397 21.9237 21.875V9.5H22.6112C22.7935 9.5 22.9684 9.42757 23.0973 9.29864C23.2263 9.1697 23.2987 8.99484 23.2987 8.8125C23.2987 8.63016 23.2263 8.4553 23.0973 8.32636C22.9684 8.19743 22.7935 8.125 22.6112 8.125ZM20.5487 21.875H9.54871V9.5H20.5487V21.875ZM10.9237 6.0625C10.9237 5.88016 10.9961 5.7053 11.1251 5.57636C11.254 5.44743 11.4289 5.375 11.6112 5.375H18.4862C18.6685 5.375 18.8434 5.44743 18.9723 5.57636C19.1013 5.7053 19.1737 5.88016 19.1737 6.0625C19.1737 6.24484 19.1013 6.4197 18.9723 6.54864C18.8434 6.67757 18.6685 6.75 18.4862 6.75H11.6112C11.4289 6.75 11.254 6.67757 11.1251 6.54864C10.9961 6.4197 10.9237 6.24484 10.9237 6.0625Z"
                            fill="black"
                        />
                    </svg>
                </button>
            </div>

            <div {...getRootProps()}>
                <input  {...getInputProps()} />
                {task.path ? <img src={task.path} width='100px' height='60px' /> :
                    (previewDataUrl ? <img src={previewDataUrl} width='100px' height='50px' /> :
                        <p>{isDragActive ? "Drop the file here" : "Drag or drop the file here"}</p>)}
            </div>
            {previewDataUrl && !task.path ? <button onClick={uploadFile} >upload</button> : ""}
        </div>

    )
}