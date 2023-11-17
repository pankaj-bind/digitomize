import { Link, useOutletContext } from 'react-router-dom';
import UserCard from './components/UserCard';
import { AiFillGithub, AiFillLock } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { BsFillArrowUpRightCircleFill, BsGraphUpArrow } from 'react-icons/bs';
import { Helmet } from "react-helmet";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import WarningIcon from '@mui/icons-material/Warning';
import CustomLinkCard from './components/CustomLinkCard';

function NewUserProfile() {
    const { personal_data } = useOutletContext();
    const contentDescription = `${personal_data?.bio?.length > 30
        ? personal_data.bio.substring(0, 30) + "..."
        : personal_data.bio}`;
    const pageTitle = `${personal_data.name} | digitomize`;
    console.log(personal_data)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const getDriveFileId = (link) => {
        const fileIdMatch = link?.match(/\/d\/(.+?)\//);
        return fileIdMatch ? fileIdMatch[1] : null;
    };
    const generateEmbedUrl = () => {
        const fileId = getDriveFileId(personal_data.resume);
        if (fileId) {
            return `https://drive.google.com/uc?id=${fileId}`;
        }
        return null;
    };
    const resumeEmbedUrl = generateEmbedUrl();
    return (
        <>
            <Helmet>
                <title>{personal_data.name} | digitomize</title>
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={contentDescription} />
                <meta name="description" content={contentDescription} />
            </Helmet>
            <div className="flex mt-8 flex-col md:flex-row w-11/12 mx-auto pb-8">
                {/* First Column with 450px width */}
                <div className="flex md:w-1/2" >
                    <UserCard username={personal_data.username} name={personal_data.name} picture={personal_data.picture} bio={personal_data.bio} phoneNumber={personal_data.phoneNumber} role={personal_data.role} skills={personal_data.skills} />
                </div>

                {/* Second Column with two rows */}
                <div className="flex flex-col w-full md:w-1/2 px-4 pt-4 md:pt-0">
                    {/* First Row */}
                    <div className="flex flex-col md:flex-row pb-2 px-2 gap-6">

                        <CustomLinkCard to="resume" bgColor="#FF526A" icon={<ImProfile />} title="See my resume" textColor="text-black" />

                        <CustomLinkCard to="ratings" bgColor="#050127" icon={<BsGraphUpArrow />} title="contest ratings &#10024;" textColor="text-[#ffc552de]" />

                    </div>

                    {/* Second Row */}
                    <div className="flex flex-col md:flex-row pt-4 px-2 gap-6">

                        {/* -----------GITHUB CODE WITHOUT LOCK----------- */}
                        {/* <Link to='github' className="w-full md:w-1/2 ">
                            <div className="border-[#d1e5f47d] border-2 transition ease-in-out delay-150 motion-reduce:transition-none motion-reduce:hover:transform-none shadow-2xl rounded-3xl bg-[#926bf2]  hover:scale-[1.02] w-full h-[250px] p-8">
                                <div className='w-full h-full flex items-end'>
                                    <div className='w-full'>
                                        <AiFillGithub size='20%' />
                                        <div className='flex justify-between items-center w-full'>
                                            <p className='pt-4 tracking-tight text-4xl text-white font-medium'>
                                                Github projects</p>
                                            <BsFillArrowUpRightCircleFill size='12%' className='ml-2' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link> */}


                        {/* -----------GITHUB CODE WITH LOCK----------- */}
                        <div className='w-full flex justify-center'>

                            <Link to='#' className=" md:w-1/2 cursor-not-allowed">
                                {/* Fourth Card */}
                                <div className="relative overflow-hidden rounded-3xl border-2 bg-[#926bf2] hover:scale-[1.02] w-full h-[250px]">
                                    {/* Lock Icon with Blurry Background */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="absolute inset-0 bg-black opacity-50 backdrop-filter backdrop-blur-md"></div>
                                        <div className="relative z-10 flex flex-col items-center justify-center text-white">
                                            <AiFillLock size='20%' />
                                            <p className="mt-2">Coming Soon</p>
                                        </div>
                                    </div>
                                    <div className='border border-[#d1e5f4] h-full'>
                                        <div className='w-full h-full flex items-end p-8'>
                                            <div className='w-full'>
                                                <AiFillGithub size='20%' />
                                                <div className='flex justify-between items-center w-full'>
                                                    <p className='pt-4 tracking-tight text-4xl text-white font-medium'>
                                                        Github projects</p>
                                                    <BsFillArrowUpRightCircleFill className='phone:w-1/6 phone:h-1/6 ml-2 w-2/4 h-2/4' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default NewUserProfile