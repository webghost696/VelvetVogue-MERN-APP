export default function ShopCart({isOpen, onClose, children}){
    if(!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button style={{fontSize : "1rem"}} className="btn btn-danger" onClick={onClose}>X  Close</button>
                {children}
            </div>
        </div>
    )
}