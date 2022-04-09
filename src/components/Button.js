
const Button = ({click}) =>{
    return (
       <>
        <div>
            <a onClick={click} className="myBtn" download><span>Download</span><span>PDF</span></a>
            {/* <a download><span>Download</span><span>WORD</span></a>
            <a download><span>Download</span><span>XSL</span></a> */}
        </div>
       </>
    )
}

export default Button;