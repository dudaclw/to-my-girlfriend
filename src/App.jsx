import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  // Estados para os corações
  const [hearts, setHearts] = useState([])
  const [currentMessage, setCurrentMessage] = useState(0)
  
  // Personalização
  const girlfriendName = "samii"
  const yourName = "euu"
  
  // Mensagens românticas
  const messages = [
    `Ti amuuuu, ${girlfriendName}!`,
    "O amor é assim, Íris. — Dona Símia sorriu para mim. — Devastador, enlouquecedor, enriquecedor, arrebatador, ardente, intrigante, divertido, compreensivo, imprevisível e, às vezes, quem sabe, até mágico e surreal como cenas de novela...",
    "O amor pode ser traduzido em várias palavras que a gente pula no dicionário, mas que têm significados intensos e incríveis. A gente é nada e o amor é tudo. Tudo. Menos óbvio.",
    "Talvez eu prefira as coisas dez vezes mais bonitas. E que só ficam assim por sua causa, quando você tá perto..",
    "Quero minhas trufinhas na terça-feira."
  ]

  // Estados para o player de música
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const audioRef = useRef(null)

  // Lista de músicas (adicione seus arquivos na pasta public/songs)
  const songs = [
    { title: "Winter Bear", url: "./src/songs/winter-bear.mp3" },
    { title: "Birds Of a Feather", url: "./src/songs/birds.mp3" },
    { title: "I Wanna Be Yours", url: "./src/songs/wanna-be.mp3" },
    { title: "Sunsetz", url: "./src/songs/sunset.mp3" },
    // Adicione mais músicas aqui
  ]

  // Efeito para mudar mensagens automaticamente
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length)
    }, 5000)
    
    return () => clearInterval(messageInterval)
  }, [])

  // Criar corações ao clicar
  const createHeart = (e) => {
    const newHeart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 30 + 20,
      color: `hsl(${Math.random() * 60 + 330}, 100%, 65%)`
    }
    
    setHearts((prev) => [...prev.slice(-20), newHeart])
    
    setTimeout(() => {
      setHearts((prev) => prev.filter(h => h.id !== newHeart.id))
    }, 2000)
  }

  // Controles do player de música
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const playNextSong = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length)
  }

  const playPrevSong = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length)
  }

  // Efeito para carregar música quando muda
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentSong].url
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentSong])

  return (
    <div className="app" onClick={createHeart}>
      {/* Conteúdo principal */}
      <div className="content">
        <h1> Para {girlfriendName}, com amor ❤️</h1>
        
        <div className="message-container">
          <p className="romantic-message">{messages[currentMessage]}</p>
        </div>
        
        <div className="signature">
          <p>Feito pelo seu amorzinho,</p>
          <p className="name">{yourName}</p>
        </div>
      </div>
      
      {/* Mini Player de Música */}
      <div className="music-player">
        <div className="player-controls">
          <button className="player-btn" onClick={playPrevSong}>⏮</button>
          <button className="player-btn play-btn" onClick={togglePlayPause}>
            {isPlaying ? '⏸' : '⏵'}
          </button>
          <button className="player-btn" onClick={playNextSong}>⏭</button>
        </div>
        <div className="song-info">
          {songs[currentSong].title}
        </div>
      </div>

      {/* Elemento de áudio (invisível) */}
      <audio 
        ref={audioRef} 
        loop 
        onEnded={playNextSong}
      />
      
      {/* Efeitos de corações */}
      {hearts.map(heart => (
        <Heart key={heart.id} {...heart} />
      ))}
      
      {/* Efeito de partículas */}
      <ParticleBackground />
    </div>
  )
}

// Componente de coração
const Heart = ({ x, y, size, color }) => (
  <div 
    className="heart" 
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      backgroundColor: color
    }}
  />
)

// Componente de fundo com partículas
const ParticleBackground = () => {
  const [particles] = useState(() => 
    Array.from({ length: 30 }, () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 1,
      speed: Math.random() * 2 + 0.5
    }))
  )

  return (
    <div className="particles">
      {particles.map(p => (
        <div 
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${10 / p.speed}s`
          }}
        />
      ))}
    </div>
  )
}

export default App