// src/components/Hero.tsx
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section
      id="hero"
      className="w-screen h-[calc(100vh-4rem)]  flex flex-col-reverse lg:flex-row items-center
                 px-4 sm:px-6 lg:px-8 bg-white"
    >
      {/* Left: Texto */}
      <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-[#2B1A56]">
          ¡TalentoTe ayudamos<br/>
          a encontrar<br/>
          el mejor trabajo!
        </h1>

        <p className="max-w-md mx-auto lg:mx-0 text-base sm:text-lg text-[#2B1A56]/80">
          ¡Talento sin barreras, oportunidades para todos!
        </p>

        <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/login"
            className="px-6 py-3 bg-[#2B1A56] text-white rounded-lg hover:bg-[#231243] transition"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 border-2 border-[#2B1A56] text-[#2B1A56] rounded-lg hover:bg-[#2B1A56] hover:text-white transition"
          >
            Registrarse
          </Link>
        </div>
      </div>

      {/* Right: Blobs decorativos + Imagen */}
      <div className="w-full lg:w-1/2 relative mb-8 lg:mb-0 flex justify-center">
        <div className="absolute top-0 left-0 w-56 h-56 bg-[#D3EFEF]
                        rounded-l-full rounded-br-full hidden sm:block" />
        <div className="absolute bottom-0 right-6 w-72 h-56 bg-[#37B8A2]
                        rounded-full mix-blend-multiply hidden md:block" />

        <div
          className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
          style={{ clipPath: "url('/blob-mask.svg')" }}
        >
          <div className="absolute inset-0 border-2 sm:border-4 border-dashed
                          border-[#2B1A56]/60 rounded-full" />
          <img
            src="/team-photo.jpg"
            alt="Two colleagues in meeting"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;