import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const UserPostSkeleton = () =>{
    return(<>
        <div className='grid lg:grid-cols-2 justify-center gap-4'>
        <div className=" flex flex-wrap gap-4">
                    <div className="profileImage">
                            <div className="relative w-32 h-32 ml-9 rounded-full dark:bg-gray-600">
                                <Skeleton circle baseColor='#36454F' className='rounded h-32 w-32'/>
                            </div>
                    </div>
                    <div className="profileData mx-4">
                        <Skeleton className="text-4xl font-semibold my-5 w-96" baseColor='#36454F'></Skeleton>
                        <Skeleton className="text-xl my-5 w-60" baseColor='#36454F'></Skeleton>
                        <Skeleton className="py-2 px-4 rounded-full w-32" baseColor='#36454F'></Skeleton>
                    </div>
        </div>
        <div className=" flex flex-wrap gap-4">
                    <div className="profileImage">
                            <div className="relative w-32 h-32 ml-9 rounded-full dark:bg-gray-600">
                                <Skeleton circle baseColor='#36454F' className='rounded h-32 w-32'/>
                            </div>
                    </div>
                    <div className="profileData mx-4">
                        <Skeleton className="text-4xl font-semibold my-5 w-96" baseColor='#36454F'></Skeleton>
                        <Skeleton className="text-xl my-5 w-60" baseColor='#36454F'></Skeleton>
                        <Skeleton className="py-2 px-4 rounded-full w-32" baseColor='#36454F'></Skeleton>
                    </div>
        </div>
        <div className=" flex flex-wrap gap-4">
                    <div className="profileImage">
                            <div className="relative w-32 h-32 ml-9 rounded-full dark:bg-gray-600">
                                <Skeleton circle baseColor='#36454F' className='rounded h-32 w-32'/>
                            </div>
                    </div>
                    <div className="profileData mx-4">
                        <Skeleton className="text-4xl font-semibold my-5 w-96" baseColor='#36454F'></Skeleton>
                        <Skeleton className="text-xl my-5 w-60" baseColor='#36454F'></Skeleton>
                        <Skeleton className="py-2 px-4 rounded-full w-32" baseColor='#36454F'></Skeleton>
                    </div>
        </div>
        <div className=" flex flex-wrap gap-4">
                    <div className="profileImage">
                            <div className="relative w-32 h-32 ml-9 rounded-full dark:bg-gray-600">
                                <Skeleton circle baseColor='#36454F' className='rounded h-32 w-32'/>
                            </div>
                    </div>
                    <div className="profileData mx-4">
                        <Skeleton className="text-4xl font-semibold my-5 w-96" baseColor='#36454F'></Skeleton>
                        <Skeleton className="text-xl my-5 w-60" baseColor='#36454F'></Skeleton>
                        <Skeleton className="py-2 px-4 rounded-full w-32" baseColor='#36454F'></Skeleton>
                    </div>
        </div>
        </div>
    </>)
};

export default UserPostSkeleton;