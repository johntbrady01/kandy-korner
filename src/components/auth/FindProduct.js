
export const FindProducts = ({setterFunction}) => {

    return(
        <div>
            <header>What product are you looking for?</header>
            <input 
             onChange={
                (changeEvent)=> {
                    setterFunction(changeEvent.target.value)
                }}
            
            type="text" placeholder="Enter search terms" />
      </div>
    )
}