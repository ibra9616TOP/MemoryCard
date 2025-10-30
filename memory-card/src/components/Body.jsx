import { useEffect, useMemo, useState } from "react"
import gif from "../assets/giphy.gif"

export default function Body(){

    function mezclarArray(arr) {
        const array = [...arr]; // Para no modificar el array original
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
    
    const [isSelected, setIsSelected] = useState(false)
    const [cardsClicked, setCardsClicked] = useState([])
    const [listGifs, setListGifs] = useState([])
    
    useEffect(() => {
        fetch('https://api.giphy.com/v1/gifs/search?api_key=nIgecTR3yoWxMq0zcJM3gjO6yOoxnoEs&q=gatos&limit=13&offset=0&rating=g&lang=en&bundle=messaging_non_clips')
        .then(response => {
            if (response.ok){
            return response.json();
            }
        })
        .then(result => {
            const newArray = result.data.map(gif => ({
            id: gif.id,
            url: gif.images.original.webp,
            nombre: gif.title
            }));
            return newArray;
        })
        .then(
            result => setListGifs(result)
        )
    }, [])

    const handleClick = (gifId) => {

        if (cardsClicked.includes(gifId)) {
            setCardsClicked([])
            const listaRandom = mezclarArray(listGifs);
            setListGifs(listaRandom);
        } else {
            setCardsClicked(prev => [...prev, gifId])
            const listaRandom = mezclarArray(listGifs);
            setListGifs(listaRandom);
        }

      };

    return (
        <>
        <p className="bg-[#8AB661] place-self-center justify-center w-full">
            {'Puntuaje: ' + (cardsClicked ? cardsClicked.length : '0')}
        </p>
        <div className="min-h-full bg-[#8AB661] flex flex-wrap p-6 gap-12">
            {
                listGifs.map(gif => {
                    return (
                        <div onClick={() => handleClick(gif.id)} key={gif.id} className="bg-[#6eaa46] h-84 w-64 border-2 border-green-600 rounded-2xl shadow-2xl transition duration-300 hover:shadow-amber-200 hover:scale-105 p-4">
                            <img src={gif.url} alt="Gif de gato" className="h-[90%]"/>
                            <h2 className="self-center place-self-center">{gif.title}</h2>
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}