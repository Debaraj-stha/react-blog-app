
import { useContactForm } from '../../Provider/ContactFormProvider';
import Input from '../Input';



const ContactForm = () => {
  const { handleSubmit, errors, state, dispatch, validateEmail, validateName } = useContactForm()

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <div className='my-2'>
        <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
        <Input
          placeholder="Name"
          value={state.name}
          onChange={validateName}
          extraClass='mb-0'
        />
        {errors && (
          <p className="text-red-500 text-sm mt-1">{errors.nameError}</p>
        )}
      </div>


      <div className='my-2'>
        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <Input
          type="email"
          placeholder="Email"
          value={state.email}
          onChange={validateEmail}

        />
        {errors.emailError && (
          <p className="text-red-500 text-sm mt-1">{errors.emailError}</p>
        )}

      </div>
      <div className='my-2'>
        <label className="block mb-2 text-sm font-medium text-gray-700">Message</label>
        <textarea
          value={state.message}
          onChange={(e) => dispatch({ type: 'SET_MESSAGE', payload: e.target.value })}
          className="w-full mb-4 text-black border rounded border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your message"
        />
        {errors && (
          <p className="text-red-500 text-sm mt-1">{errors.messageError}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
