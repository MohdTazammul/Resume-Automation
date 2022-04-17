import "../styles/Button.css"
const Button = ({click}) =>{
    return (
       <>
        <div id="mainBtn">
            <a onClick={click} className="myBtn" download><span>Download</span><span>PDF</span></a>

        </div>
       </>
    )
}

export default Button;