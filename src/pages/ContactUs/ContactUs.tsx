import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const topicsList = [
  { id: 1, label: "huhu", label_text: "sdjfklsjfklj" },
  { id: 2, label: "sdfkjh", label_text: "zeururiozu" }
]

interface ITopic {
  id: string;
  label: string;
  label_text: string;
}

function ContactUs() {

  // Topics
  const [topics, setTopics] = useState<ITopic[]>([]);

  useEffect(() => {
    document.title = `Contact us | Retrocine`;
    setTopics(topicsList);
    // axios
    //   .get('http://localhost:8000/api/customer-service/get-topics/')
    //   .then(response => setTopics(response.data))
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
      
      // await axios
      //   .post('http://localhost:8000/api/customer-service/send-issue/', formData)
      //   .then(response => console.log(response.data))
      toast.success('Message successfully sent.');

    } catch (error) {
      toast.error('Something went wrong. Try again.')
    } finally {
      setFormData(defaultFormData)
    }
  }

  return (
    <main className="bg-white text-black">
      <div className="p-10 mx-auto w-2/3">

        <h2 className="text-3xl font-bold text-center">Contact us</h2>

        <div className="mt-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">

              <label className="mt-4 mb-4 font-bold">What do you want to talk to us about?</label>
              <select
                onChange={handleInputChange}
                value={formData.topic}
                className="p-4 w-1/2 rounded-lg border-1 border-gray-200"
                name="topic"
              >
                <option value="" disabled>--Choose an option--</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.label}>{topic.label_text}</option>
                ))}
              </select>

              <label className="mt-8 mb-5">What is your email?</label>
              <input
                className="rounder-lg w-1/2 px-4 py-2 border-1 border-gray-200"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your email..."
              />

              <label className="mt-8 mb-5">What do want to tell us?</label>
              <textarea
                className="rounder-lg px-4 py-2 w-2/3"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Add your message here..."
              />
            </div>

            <button
              type="submit"
              className="mt-8 rounded-lg bg-gray-500 px-6 py-3 hover:bg-gray-400 hover:cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>

      </div>
    </main>
  )
}

export default ContactUs