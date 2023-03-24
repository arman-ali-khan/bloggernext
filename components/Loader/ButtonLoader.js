

const ButtonLoader = ({h,w}) => {
    return (
        <div className={`border-2 border-dashed h-${h} w-${w} rounded-full animate-spin`}></div>
    );
};

export default ButtonLoader;