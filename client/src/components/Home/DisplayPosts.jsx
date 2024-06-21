import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon } from "react-share";
import { ToastContainer } from 'react-toastify';
import LikePostButton from "../UI/LikePostButton";
import SavePostButton from "../UI/SavePostButton";
import DateOfPost from "../UI/Date";

const DisplayPost = (Props) => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [PostData, setPostData] = useState([]);
    const [Message, setMessage] = useState("");

    const getUserPost = async () => {
        await axios.get(`http://localhost:3001/getallpost`)
            .then(result => {
                // setPostData(result.data.data)
                setPostData(result.data.data);
                console.log(result.data.data);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setPostData(Props.posts);
        setMessage(Props.message);
        getUserPost();
        console.log(PostData);
    },[]);

    return (
        <>
            {
                PostData.length === 0 ? <p className="text-white">{Message}</p>
                    : PostData.map((p) => (
                        <div key={p.id} className='flex max-[1000px]:flex-wrap w-full text-white rounded-2xl bg-[#191c24] mt-5 '> {/*bg-slate-900*/}
                            <div className="m-5">
                                <img src="" alt="user" className='w-32 h-32 rounded-2xl justify-start mx-auto shadow-md shadow-gray-700' />
                                <ul className="flex mt-10">
                                    <SavePostButton pid={p._id} saved={(v)=>{ v && getUserPost() }}/>
                                    <LikePostButton id={p._id} length={p.likes.length} liked={(v)=>{v && getUserPost()}}/>
                                    <span className="mx-2 mb-1">
                                        <FacebookShareButton
                                            quote={p.title}
                                            hashtag="#React"
                                            url="https://www.facebook.com/"
                                            title="Send message on Facebook"
                                        >
                                        <FacebookIcon size={32} round={true}></FacebookIcon>
                                        </FacebookShareButton>
                                    </span>

                                    <span className=" mx-2 mb-1">
                                        <WhatsappShareButton
                                            title={p.title}
                                            separator={p.title}
                                            url="https://web.whatsapp.com/"
                                        >
                                            <WhatsappIcon size={32} round={true}></WhatsappIcon>
                                        </WhatsappShareButton>
                                    </span>
                                </ul>
                            </div>
                            <div className="p-8 text-gray-500">
                                <h1 className="flex">
                                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                    <h3 className="mx-5 text-gray-200 text-xl">{p.name}</h3>
                                    <DateOfPost postDate={p.postDate} />
                                </h1>
                                <h1 className='text-left text-gray-200 text-2xl font-bold justify-center hover:font-extrabold hover:underline underline-offset-8 cursor-pointer' onClick={() => { navigate(`/post/${id}/${p._id}`) }}>{p.title}</h1>
                                <p>Catagory : {p.catagory}</p>
                                <p className=''>{p.shortDesc}</p>
                                <p className=''>{p.desc}</p>
                            </div>
                        </div>
                    ))
            }
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Bounce
            />
        </>
    )
}

export default DisplayPost;

