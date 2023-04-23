import React from "react"

export default function Meme() {

    // Inititiate initial state of meme
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImageURL: "https://i.imgflip.com/30b1gx.jpg" 
    })
    
    const [allMemes, setAllMemes] = React.useState([])
    
    // Retrieve meme images with API
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    
    // Get random meme image url
    function getImage() {
        const random = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[random].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImageURL: url
        }))
        
    }
    
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Input top text"
                    className="form-input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Input bottom text"
                    className="form-input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form-button"
                    onClick={getImage}
                >
                    generate new meme image
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImageURL} className="meme-image" />
                <h2 className="meme-text-top">{meme.topText}</h2>
                <h2 className="meme-text-bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}