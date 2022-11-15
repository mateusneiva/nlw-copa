import { useState, FormEvent } from 'react'
import Image from 'next/image'

import { API } from '../services/API'

import appPreviewImage from '../assets/app-nlw-copa-preview.png'
import logoImage from '../assets/logo.svg'
import avatarsImage from '../assets/users-avatar-example.png'
import iconCheckImage from '../assets/icon-check.svg'

interface IHomeProps {
  usersCount: number
  pollsCount: number
  guessesCount: number
}

export default function Home(props: IHomeProps) {
  const [pollTitle, setPollTitle] = useState('')

  async function handleCreatePoll(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await API.post('polls/create', {
        title: pollTitle,
      })

      const { code } = response.data

      await navigator.clipboard.writeText(code)

      alert('Bolão criado com sucesso, o código foi copiado para a área de transferência!')

      setPollTitle('')
    } catch (err) {
      console.log(err)
      alert('Falha ao criar o bolão, tente novamente.')
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImage} alt="NLW Logo Image" />
        <h1 className="mt-14 text-white text-4xl font-bold leading-tight">Crie seu próprio bolão da copa e compartilhe com seus amigos!</h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={avatarsImage} width={120} alt="" />

          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.usersCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={handleCreatePoll} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded text-gray-100 bg-gray-800 border border-gray-600 text-sm focus:outline outline-[2px] outline-ignite-500"
            type="text"
            required
            placeholder="Qual o nome do seu bolão?"
            onChange={(event) => setPollTitle(event.target.value)}
            value={pollTitle}
          />
          <button className="px-6 py-4 rounded bg-yellow-500 text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700" type="submit">
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">Após criar seu bolão, você recebera um código único que poderá ser utilizado para convidar outras pessoas 🚀</p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImage} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.pollsCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className=" flex items-center pl-8 gap-6">
            <Image src={iconCheckImage} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessesCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image src={appPreviewImage} alt="Mobile App Preview" quality={100} />
    </div>
  )
}

export const getStaticProps = async () => {
  const [usersCountResponse, pollsCountResponse, guessesCountResponse] = await Promise.all([API.get('users/count'), API.get('polls/count'), API.get('guesses/count')])

  return {
    props: {
      usersCount: usersCountResponse.data.count,
      pollsCount: pollsCountResponse.data.count,
      guessesCount: guessesCountResponse.data.count,
    },
    revalidate: 600,
  }
}
