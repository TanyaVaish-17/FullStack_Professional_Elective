export default function Header({cartCount})
{
    return(
        <>
        <div className="header">
        <img src="https://tse2.mm.bing.net/th/id/OIP.YkjjdCqD5DogbVR-OffTuwHaHa?pid=Api&h=220&P=0" alt="logo"></img>
        <h2> React Demo App</h2><br></br>
        </div>;
        <div>
        <p>Cart Item Count:{cartCount}</p>
        </div>
        </>
)}