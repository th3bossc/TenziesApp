import './Die.css';

interface DieProps {
    id : string,
    num: number,
    selected: boolean,
    handler: (id: string) => void
}


export default function Die(props : DieProps) { 
  const diceImages = [
    'dice-one',
    'dice-two',
    'dice-three',
    'dice-four',
    'dice-five',
    'dice-six',
  ]


    return (
        <div 
            className={ props.selected ? "die selected" : "die"}
            onClick={ () => props.handler(props.id) }
        >
            {/* <span className="dot">{ props.num }</span> */}
            <i className={`fa-solid fa-${diceImages[props.num - 1]} dot`}></i>
        </div>
    );
}