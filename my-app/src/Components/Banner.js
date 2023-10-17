
function Banner(message, msgType) {

    if(msgType === "error"){
        return(
            <div className="banner-err">
                <p>{message}</p>
            </div>
        )
    }
    else if(msgType === "success"){
        return(
            <div className="banner-success">
                <p>{message}</p>
            </div>
        )
    }
};

export default Banner;