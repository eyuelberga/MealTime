export interface IconProps {
    className?: string
}

export const PlusCircleIcon = ({ className = "w-3.5 h-3.5" }: IconProps) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="currentColor"
        viewBox="0 0 16 16"
    >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
    </svg>);

export const EditIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>);

export const CalendarIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
    </svg>);

export const UserIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>);



export const RecipeIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg
        className={className}
        viewBox="0 0 48 48"
        id="a"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
    >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
        <g id="SVGRepo_iconCarrier">
            <g>
                {" "}
                <path
                    fill="none"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M24,24.4682H5.5c0,9.2155,11.597,17.1393,11.597,17.1393h6.903"
                />{" "}
                <path
                    fill="none"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.8843,26.5736c0,6.7924,7.6278,11.8041,7.6278,11.8041"
                />{" "}
                <path
                    fill="none"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M24,24.4682h18.5c0,9.2155-11.597,17.1393-11.597,17.1393h-6.903"
                />{" "}
                <path
                    fill="none"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.0942,24.4682c-1.3461-5.0392,7.6541-8.5034,15.7305-9.5733l.7892-1.4542,3.184,3.87-1.7473,.2847c-.8542,2.8087-5.1347,6.8728-5.1347,6.8728"
                />{" "}
                <path
                    fill="none"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.5093,24.4682c.2883-2.5946,3.2968-5.5138,14.7724-9.0189"
                />{" "}
                <path
                    fill="none"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M30.5784,15.8092c-4.3403,2.1744-9.4,4.6725-12.9464,8.659"
                />{" "}
                <path
                    fill="none"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M31.4253,16.8367c-4.5094,6.1259-7.4253,7.6315-7.4253,7.6315"
                />{" "}
                <path
                    fill="none"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.5047,24.4682c2.7196-1.5897,9.4897-8.1542,9.4897-8.1542"
                />{" "}
                <path
                    fill="none"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M33.0768,16.4532l8.1513-6.6057c.5628-.4561,.6493-1.282,.1932-1.8447h0c-.4561-.5628-1.282-.6493-1.8447-.1932l-8.1513,6.6057"
                />{" "}
            </g>{" "}
            <line
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round" x1="29.8248" y1="14.8949" x2="32.0506" y2="17.5954" />{" "}
        </g>
    </svg>
);

export const ShoppingIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>);

export const LinkIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>);


export const StatsIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
    </svg>);




export const TrashIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>);

export const SearchIcon = ({ className = "w-5 h-5 text-gray-500" }: IconProps) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>);



export const CloseIcon =
    ({ className = "w-6 h-6" }: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>

    );

export const OpenIcon =
    ({ className = "w-6 h-6" }: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>

    );



export const LogoIcon =
    ({ className = "w-6 h-6" }: IconProps) => (
        <svg id="Layer_1" fill="currentColor" stroke="currentColor" className={className} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 122.88 105.09">
            <title>dining</title>
            <path d="M67.46,15.54a1.75,1.75,0,0,0-.6.14,1.91,1.91,0,0,0-.53.34l-.21.28a40.58,40.58,0,0,1,8.06,4.55,76.77,76.77,0,0,1,6.12,4.64l-1.52.86c-1.6-1.32-3.56-2.79-5.53-4.14-3.38-2.32-6.72-4.28-8.14-4.53L55.72,30.54A1.84,1.84,0,0,0,55.3,32a2.65,2.65,0,0,0,1.1,1.43l7.48,5.27c-.36.42-.72.84-1.07,1.28-2.47-1.75-4.93-3.51-7.4-5.24a4.23,4.23,0,0,1-1.72-2.39,3.39,3.39,0,0,1,.69-2.71L65,15l.13-.15a4,4,0,0,1,1-.67,3.52,3.52,0,0,1,1.17-.28,9.28,9.28,0,0,1,3.88,1.2,44,44,0,0,1,5.56,3.33l.26.18A29.07,29.07,0,0,1,83.18,24c-.49.23-1,.48-1.47.72a30.31,30.31,0,0,0-5.6-4.81l-.25-.18a42.06,42.06,0,0,0-5.33-3.19,8,8,0,0,0-3.07-1Zm47.75,87.18L98,79C85.16,80.1,73.79,57.65,83,51.33c11.24-7.68,28.58,14.26,20.75,23.49l18,23.47c3.69,4.82-2.59,9.91-6.55,4.43ZM28.88,71c3.57.67,6.52-.16,10.67-4.66L50.67,55.22c1.54-1.58-1.1-4.58-3-3l-9.13,8.91A1.79,1.79,0,1,1,36,58.62l9.44-9.23c1.63-1.7-.88-4.56-2.75-2.76-2.6,2.59-6.85,6.64-9.44,9.23A1.56,1.56,0,1,1,31.1,53.7l9.38-9.17A2.14,2.14,0,0,0,39.2,41c-1.64-.37-2.72,1.12-3.84,2.17l-11,10.29c-3,3.15-4.73,6.48-3.39,10a8.33,8.33,0,0,0,1.09,1.85L1.21,84.5A3.84,3.84,0,0,0,1.1,90l.33.33a4.32,4.32,0,0,0,6.17-.13l19-20.41A6.61,6.61,0,0,0,28.88,71ZM58.19,58.91a9.26,9.26,0,1,1-12.48,13L56.54,61.08a7.85,7.85,0,0,0,.8-.93,8.82,8.82,0,0,0,.85-1.24ZM37,29.26a1.34,1.34,0,0,1-2.43-1.12,24.26,24.26,0,0,1,6.94-8.91,19.55,19.55,0,0,1,9.76-4.15,1.33,1.33,0,0,1,.3,2.65,16.77,16.77,0,0,0-8.42,3.59A21.59,21.59,0,0,0,37,29.26ZM61.5,0a44.6,44.6,0,0,1,44.63,44.63,45.37,45.37,0,0,1-.34,5.5A31.31,31.31,0,0,0,101.18,46c0-.47,0-.94,0-1.41a39.7,39.7,0,1,0-79.4,0l-3.08,2.87c-.1.1-.21.2-.31.31v0c-.45.47-.88,1-1.3,1.43-.15-1.5-.23-3-.23-4.55A44.6,44.6,0,0,1,61.5,0ZM84.4,82.94a43.64,43.64,0,0,1-5.84,2.93,44.59,44.59,0,0,1-45.14-6.56,16.13,16.13,0,0,0,3.66-1,19.05,19.05,0,0,0,2-.92,39.83,39.83,0,0,0,37.66,4c1.29-.54,2.56-1.15,3.78-1.81.3.31.61.61.92.91a28.6,28.6,0,0,0,3,2.51Zm-.28-54.86a2,2,0,0,0-.64,0,2.11,2.11,0,0,0-.62.19l-.28.22a42.33,42.33,0,0,1,6.78,6.75,74.35,74.35,0,0,1,5.57,7.45,21.73,21.73,0,0,0-2.54-.77c-1.23-1.74-2.76-3.71-4.34-5.58-2.73-3.24-5.51-6.11-6.85-6.75L68.31,39.81a1.89,1.89,0,0,0-.81,1.29,2.72,2.72,0,0,0,.71,1.73l5.48,6.67a16.45,16.45,0,0,0-.84,1.68c-2-2.44-4-4.89-6-7.32a4.31,4.31,0,0,1-1-2.86,3.47,3.47,0,0,1,1.42-2.51L81.86,26.87l.17-.11a4.28,4.28,0,0,1,1.2-.38,3.51,3.51,0,0,1,1.25,0A9.47,9.47,0,0,1,88,28.68a45.18,45.18,0,0,1,4.62,4.84l.2.25c1.89,2.35,5.64,7,5.09,10.24l-.62-.32c-.33-.16-.67-.32-1-.47,0-2.5-3.15-6.37-4.77-8.38l-.2-.25A44.48,44.48,0,0,0,86.89,30a8.23,8.23,0,0,0-2.77-1.87ZM88,39.54a.86.86,0,0,0-1.21-.1.84.84,0,0,0-.1,1.2A.86.86,0,1,0,88,39.54ZM85.83,37a.86.86,0,0,1-.11,1.21.85.85,0,0,1-1.2-.11.86.86,0,0,1,.1-1.21.87.87,0,0,1,1.21.11Zm-2.37-2.42a.84.84,0,0,1-.1,1.2.86.86,0,1,1-1.1-1.31.85.85,0,0,1,1.2.11Zm-2.7-2.14a.86.86,0,0,1-.1,1.21.86.86,0,1,1,.1-1.21ZM74,25.23a.83.83,0,1,0,.21,1.15A.83.83,0,0,0,74,25.23Zm2.56,2a.84.84,0,0,0-1.16.22.87.87,0,0,0,0,.94c.46-.31.93-.61,1.4-.91a.94.94,0,0,0-.24-.25Zm-5.25-3.89a.83.83,0,0,1,.21,1.15.83.83,0,0,1-1.37-.93.84.84,0,0,1,1.16-.22Zm-2.83-1.65a.83.83,0,0,1-.94,1.37.84.84,0,0,1-.22-1.16.83.83,0,0,1,1.16-.21Zm-3.07-1.3a.84.84,0,0,1,.21,1.16.83.83,0,0,1-1.15.21.82.82,0,0,1-.22-1.15.84.84,0,0,1,1.16-.22Z" /></svg>

    );



export const CollectionIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg
        className={className}
        version="1.1"
        fill="currentColor"
        stroke="currentColor"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
    >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
        <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
                {" "}
                <g>
                    {" "}
                    <path d="M148.489,171.778l-0.001,44.629c0,8.027-2.286,14.557-6.613,18.883c-1.089,1.089-2.319,2.047-3.676,2.873v-66.384h-30.417 v66.382c-1.356-0.826-2.584-1.784-3.673-2.872c-4.326-4.326-6.613-10.855-6.612-18.883v-44.625H67.079v44.624 c-0.001,16.271,5.367,30.239,15.522,40.393c6.824,6.823,15.374,11.472,25.18,13.797v133.594h30.417V270.595 c9.809-2.324,18.361-6.975,25.184-13.796c10.155-10.154,15.523-24.121,15.523-40.392l0.001-44.627L148.489,171.778z" />{" "}
                </g>{" "}
            </g>{" "}
            <g>
                {" "}
                <g>
                    {" "}
                    <path d="M389.007,166.709c-26.393,0.001-47.865,21.474-47.865,47.864v35.684c0.001,21.076,13.7,39.001,32.658,45.372v108.558 h30.417V295.631c18.957-6.372,32.656-24.297,32.655-45.372l0.001-35.69C436.869,188.181,415.397,166.71,389.007,166.709z M406.456,250.259c0,9.62-7.826,17.446-17.446,17.447c-9.622-0.001-17.449-7.827-17.449-17.447v-35.684 c0-9.62,7.827-17.446,17.447-17.447c9.62,0.001,17.447,7.828,17.449,17.445L406.456,250.259z" />{" "}
                </g>{" "}
            </g>{" "}
            <g>
                {" "}
                <g>
                    {" "}
                    <path d="M473.751,31.888L297.38,74.602C278.98,78.816,265.422,85.969,256,96.444c-9.423-10.475-22.979-17.627-41.38-21.841 L38.249,31.888L0,96.779v340.454l227.979,42.619l1.385,0.26h53.272L512,437.234V96.779L473.751,31.888z M215.564,446.588 L30.417,411.975V119.242l185.147,34.613V446.588z M232.182,126.017L39.324,89.964l13.679-23.206l154.555,37.43l0.196,0.047 c19.015,4.341,27.524,11.668,30.969,21.783H232.182z M266.016,449.694h-20.035V156.435h20.035V449.694z M279.817,126.018h-6.54 c3.444-10.116,11.954-17.443,30.969-21.784l154.75-37.477l13.679,23.206L279.817,126.018z M481.583,411.975l-185.148,34.613 V153.855l185.148-34.613V411.975z" />{" "}
                </g>{" "}
            </g>{" "}
        </g>
    </svg>

);


export const HomeIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>);

export const ChevronRightIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>);

export const ChevronLeftIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>);
export const PlusIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>);


