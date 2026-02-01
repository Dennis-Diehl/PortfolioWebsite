interface ContactProps {
  // Zukünftige Props, z.B. für Kontakt-Informationen
}

export default function Contact({}: ContactProps): React.JSX.Element {
  return (
    <main className="px-4 pt-28 pb-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
          Contact Me
        </h1>
        <p className="mb-6 text-lg text-gray-300 md:text-xl">
          Get in touch — I'd love to hear from you!
        </p>
        <p className="text-gray-400">
          TODO: Implement contact form.
        </p>
      </div>
    </main>
  )
}
