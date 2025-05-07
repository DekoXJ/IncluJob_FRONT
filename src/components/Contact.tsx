const Contact = () => {
    return (
        <section className="py-16 bg-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold">Contáctanos</h3>
            <p className="mt-2 text-indigo-200">Porfavor, introduce tu correo electrónico.</p>
        </div>
        <form className="max-w-md mx-auto px-6 flex flex-col sm:flex-row sm:space-x-4">
            <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-md text-gray-800 focus:outline-none"
            />
            <button className="mt-4 sm:mt-0 px-6 py-3 bg-white text-indigo-800 font-semibold rounded-md shadow hover:bg-gray-100">
            Enviar
            </button>
        </form>
        </section>
    )
}

export default Contact
