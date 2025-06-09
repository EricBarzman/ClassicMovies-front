import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { ITopic, topicsList } from "../../constants/topics";


function ContactUs() {

  // Topics
  const [topics, setTopics] = useState<ITopic[]>([]);

  useEffect(() => {
    window.scroll(0, 0);
    document.title = `Contact | Classic Movies`;
    setTopics(topicsList);

  }, [])

  // Form
  const defaultFormData = {
    email: '',
    topic: '',
    content: '',
  };

  const [formData, setFormData] = useState(defaultFormData);

  function handleInputChange(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  // Submit form
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      console.log(formData);

      // A implémenter : envoi du message au serveur
      toast.success('Votre message a bien été envoyé !');

    } catch (error) {
      toast.error("Une erreur s'est produite. Veuillez réessayer.")
    } finally {
      setFormData(defaultFormData)
    }
  }

  return (
    <main className="bg-white text-black">
      <div className="p-10 mx-auto w-2/3">

        <h2 className="text-3xl font-bold text-center">Nous contacter</h2>

        <div className="mt-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">

              <label className="mt-4 mb-4 font-bold">De quoi voulez vous parler ?</label>
              <select
                onChange={handleInputChange}
                value={formData.topic}
                className="p-4 w-1/2 rounded-lg border-1 border-gray-200"
                name="topic"
              >
                <option value="" disabled>--Choisir une option--</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.label}>{topic.label_text}</option>
                ))}
              </select>

              <label className="mt-8 mb-5">Quel est votre mail ?</label>
              <input
                className="rounder-lg w-1/2 px-4 py-2 border-1 border-gray-200"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Votre email..."
              />

              <label className="mt-8 mb-5">Que voulez-vous nous dire ?</label>
              <textarea
                className="rounder-lg px-4 py-2 w-2/3"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Votre message..."
              />
            </div>

            <button
              type="submit"
              className="mt-8 rounded-lg bg-gray-500 px-6 py-3 hover:bg-gray-400 hover:cursor-pointer"
            >
              Envoyer
            </button>
          </form>
        </div>

      </div>
    </main>
  )
}

export default ContactUs