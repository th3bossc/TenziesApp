import './Die.css'

interface propsI {
    count: number,
}



export default function Won(props : propsI) {
    
    const { count } = props
    const highScore : number = parseInt(localStorage.getItem('highScore') || "0")
    
    if (count < highScore || highScore === 0)
        localStorage.setItem('highScore', count.toString())

    return (
        <>
            <h1 className="title">You scored { count } points </h1>
            <h3 className='text'>High score : { highScore } </h3>
        </>
    )
}